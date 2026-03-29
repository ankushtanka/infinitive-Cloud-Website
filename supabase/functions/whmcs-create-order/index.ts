import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const MIDDLEWARE_URL = 'https://client.infinitivecloud.com/middleware/domainMiddleware.php';

async function callMiddleware(params: Record<string, string>): Promise<any> {
  const url = `${MIDDLEWARE_URL}?${new URLSearchParams(params).toString()}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch(url, { signal: controller.signal });
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      console.error('Non-JSON middleware response for action', params.action, ':', text.substring(0, 500));
      return null;
    }
  } finally {
    clearTimeout(timer);
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();

    const {
      firstName, lastName, email, phone, companyName,
      address1, address2, city, state, postcode, country,
      productId, billingCycle, paymentMethod,
      razorpayPaymentId, razorpayOrderId,
    } = body;

    if (!firstName || !lastName || !email || !productId) {
      return new Response(JSON.stringify({ error: 'Missing required fields: firstName, lastName, email, productId' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Step 1: Add or get client in WHMCS
    console.log('Creating WHMCS client for:', email);

    const clientData = await callMiddleware({
      action: 'AddClient',
      firstname: firstName,
      lastname: lastName,
      email: email,
      phonenumber: phone || '',
      companyname: companyName || '',
      address1: address1 || '',
      address2: address2 || '',
      city: city || '',
      state: state || '',
      postcode: postcode || '',
      country: country || 'IN',
      password2: crypto.randomUUID().slice(0, 16),
    });

    console.log('WHMCS AddClient response:', JSON.stringify(clientData).substring(0, 500));

    if (!clientData) {
      return new Response(JSON.stringify({ error: 'WHMCS returned an invalid response when creating client. Please try again.' }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let clientId: number;

    if (clientData.result === 'success') {
      clientId = clientData.clientid;
    } else if (clientData.message?.toLowerCase().includes('duplicate') || clientData.message?.toLowerCase().includes('already exists')) {
      // Client exists, get their ID
      const existingData = await callMiddleware({
        action: 'GetClientsDetails',
        email: email,
      });

      console.log('WHMCS GetClientsDetails response:', JSON.stringify(existingData).substring(0, 300));

      if (existingData?.result === 'success') {
        clientId = existingData.id || existingData.userid || existingData.client?.id;
      } else {
        return new Response(JSON.stringify({ error: 'Failed to find existing client', details: existingData }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    } else {
      return new Response(JSON.stringify({ error: 'Failed to create client', details: clientData }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Step 2: Create the order in WHMCS
    const isDomainOrder = body.itemType === 'domain';
    const hostDomain = body.domain || `${firstName.toLowerCase().replace(/[^a-z]/g, '')}${clientId}.infinitivecloud.com`;

    const orderParams: Record<string, string> = {
      action: 'AddOrder',
      clientid: String(clientId),
      paymentmethod: paymentMethod || 'razorpay',
    };

    if (isDomainOrder) {
      // Domain registration order
      orderParams['domains[0]'] = hostDomain;
      orderParams['domaintype[0]'] = 'register';
      orderParams['regperiod[0]'] = '1';
    } else {
      // Hosting product order
      orderParams['pid[0]'] = String(productId);
      orderParams['domain[0]'] = hostDomain;
      orderParams['billingcycle[0]'] = billingCycle || 'monthly';
    }

    const orderData = await callMiddleware(orderParams);

    console.log('WHMCS AddOrder response:', JSON.stringify(orderData).substring(0, 500));

    if (!orderData || orderData.result !== 'success') {
      return new Response(JSON.stringify({ error: 'Failed to create order', details: orderData }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Step 3: If Razorpay payment was successful, add payment and accept order
    if (razorpayPaymentId && orderData.invoiceid) {
      const paymentData = await callMiddleware({
        action: 'AddInvoicePayment',
        invoiceid: String(orderData.invoiceid),
        transid: razorpayPaymentId,
        gateway: 'razorpay',
      });
      console.log('WHMCS AddInvoicePayment response:', JSON.stringify(paymentData).substring(0, 300));

      const acceptData = await callMiddleware({
        action: 'AcceptOrder',
        orderid: String(orderData.orderid),
      });
      console.log('WHMCS AcceptOrder response:', JSON.stringify(acceptData).substring(0, 300));
    }

    return new Response(JSON.stringify({
      success: true,
      orderId: orderData.orderid,
      invoiceId: orderData.invoiceid,
      clientId,
      productIds: orderData.productids,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('WHMCS create order error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process order', message: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
