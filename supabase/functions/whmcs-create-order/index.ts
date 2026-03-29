import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const MIDDLEWARE_URL = 'https://client.infinitivecloud.com/middleware/domainMiddleware.php';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      companyName,
      address1,
      address2,
      city,
      state,
      postcode,
      country,
      productId,
      billingCycle,
      paymentMethod,
      razorpayPaymentId,
      razorpayOrderId,
    } = body;

    if (!firstName || !lastName || !email || !productId) {
      return new Response(JSON.stringify({ error: 'Missing required fields: firstName, lastName, email, productId' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Step 1: Add or get client in WHMCS via middleware
    const addClientUrl = `${MIDDLEWARE_URL}?action=AddClient&firstname=${encodeURIComponent(firstName)}&lastname=${encodeURIComponent(lastName)}&email=${encodeURIComponent(email)}&phonenumber=${encodeURIComponent(phone || '')}&companyname=${encodeURIComponent(companyName || '')}&address1=${encodeURIComponent(address1 || '')}&address2=${encodeURIComponent(address2 || '')}&city=${encodeURIComponent(city || '')}&state=${encodeURIComponent(state || '')}&postcode=${encodeURIComponent(postcode || '')}&country=${encodeURIComponent(country || 'IN')}&password2=${encodeURIComponent(crypto.randomUUID().slice(0, 16))}`;

    console.log('Creating WHMCS client for:', email);

    const clientRes = await fetch(addClientUrl);
    const clientText = await clientRes.text();
    let clientData: any;
    try {
      clientData = JSON.parse(clientText);
    } catch {
      console.error('Non-JSON client response:', clientText.substring(0, 300));
      return new Response(JSON.stringify({ error: 'Invalid response from WHMCS when creating client' }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('WHMCS AddClient response:', JSON.stringify(clientData).substring(0, 500));

    let clientId: number;

    if (clientData.result === 'success') {
      clientId = clientData.clientid;
    } else if (clientData.message?.toLowerCase().includes('duplicate') || clientData.message?.toLowerCase().includes('already exists')) {
      // Client exists, get their ID
      const getClientUrl = `${MIDDLEWARE_URL}?action=GetClientsDetails&email=${encodeURIComponent(email)}`;
      const existingRes = await fetch(getClientUrl);
      const existingText = await existingRes.text();
      let existingData: any;
      try {
        existingData = JSON.parse(existingText);
      } catch {
        console.error('Non-JSON GetClientsDetails response:', existingText.substring(0, 300));
        return new Response(JSON.stringify({ error: 'Failed to look up existing client' }), {
          status: 502,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      console.log('WHMCS GetClientsDetails response:', JSON.stringify(existingData).substring(0, 300));

      if (existingData.result === 'success') {
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
    // Generate a username from first+last name (max 8 chars, lowercase, alphanumeric)
    const rawUsername = (firstName.slice(0, 4) + lastName.slice(0, 4)).toLowerCase().replace(/[^a-z0-9]/g, '');
    const username = rawUsername + Math.floor(Math.random() * 100);
    const hostDomain = body.domain || `${rawUsername}.infinitivecloud.com`;

    const addOrderUrl = `${MIDDLEWARE_URL}?action=AddOrder&clientid=${clientId}&pid[0]=${productId}&billingcycle[0]=${encodeURIComponent(billingCycle || 'monthly')}&paymentmethod=${encodeURIComponent(paymentMethod || 'razorpay')}&domain[0]=${encodeURIComponent(hostDomain)}&customfields[0][username]=${encodeURIComponent(username)}`;

    console.log('Creating WHMCS order for client:', clientId, 'product:', productId);

    const orderRes = await fetch(addOrderUrl);
    const orderText = await orderRes.text();
    let orderData: any;
    try {
      orderData = JSON.parse(orderText);
    } catch {
      console.error('Non-JSON AddOrder response:', orderText.substring(0, 300));
      return new Response(JSON.stringify({ error: 'Invalid response from WHMCS when creating order' }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('WHMCS AddOrder response:', JSON.stringify(orderData).substring(0, 500));

    if (orderData.result !== 'success') {
      return new Response(JSON.stringify({ error: 'Failed to create order', details: orderData }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Step 3: If Razorpay payment was successful, add payment and accept order
    if (razorpayPaymentId && orderData.invoiceid) {
      const paymentUrl = `${MIDDLEWARE_URL}?action=AddInvoicePayment&invoiceid=${orderData.invoiceid}&transid=${encodeURIComponent(razorpayPaymentId)}&gateway=razorpay`;
      const paymentRes = await fetch(paymentUrl);
      const paymentText = await paymentRes.text();
      console.log('WHMCS AddInvoicePayment response:', paymentText.substring(0, 300));

      // Accept the order to trigger provisioning
      const acceptUrl = `${MIDDLEWARE_URL}?action=AcceptOrder&orderid=${orderData.orderid}`;
      const acceptRes = await fetch(acceptUrl);
      const acceptText = await acceptRes.text();
      console.log('WHMCS AcceptOrder response:', acceptText.substring(0, 300));
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
