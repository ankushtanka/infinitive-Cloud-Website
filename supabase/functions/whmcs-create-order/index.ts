import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const WHMCS_API_URL = Deno.env.get("WHMCS_API_URL")!;
const WHMCS_API_IDENTIFIER = Deno.env.get("WHMCS_API_IDENTIFIER")!;
const WHMCS_API_SECRET = Deno.env.get("WHMCS_API_SECRET")!;

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

    // Validate required fields
    if (!firstName || !lastName || !email || !productId) {
      return new Response(JSON.stringify({ error: 'Missing required fields: firstName, lastName, email, productId' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Step 1: Add or get client in WHMCS
    const clientParams = new URLSearchParams({
      action: 'AddClient',
      identifier: WHMCS_API_IDENTIFIER,
      secret: WHMCS_API_SECRET,
      responsetype: 'json',
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
      password2: crypto.randomUUID().slice(0, 16), // Generate random password
    });

    console.log('Creating WHMCS client for:', email);

    const clientRes = await fetch(WHMCS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: clientParams.toString(),
    });

    const clientData = await clientRes.json();
    console.log('WHMCS AddClient response:', JSON.stringify(clientData).substring(0, 500));

    let clientId: number;

    if (clientData.result === 'success') {
      clientId = clientData.clientid;
    } else if (clientData.message?.includes('duplicate')) {
      // Client already exists, get their ID
      const getClientParams = new URLSearchParams({
        action: 'GetClientsDetails',
        identifier: WHMCS_API_IDENTIFIER,
        secret: WHMCS_API_SECRET,
        responsetype: 'json',
        email: email,
      });

      const existingClientRes = await fetch(WHMCS_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: getClientParams.toString(),
      });

      const existingClientData = await existingClientRes.json();
      console.log('WHMCS GetClientsDetails response:', JSON.stringify(existingClientData).substring(0, 300));

      if (existingClientData.result === 'success') {
        clientId = existingClientData.id || existingClientData.userid || existingClientData.client?.id;
      } else {
        return new Response(JSON.stringify({ error: 'Failed to find existing client', details: existingClientData }), {
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
    const orderParams = new URLSearchParams({
      action: 'AddOrder',
      identifier: WHMCS_API_IDENTIFIER,
      secret: WHMCS_API_SECRET,
      responsetype: 'json',
      clientid: clientId.toString(),
      'pid[0]': productId.toString(),
      'billingcycle[0]': billingCycle || 'monthly',
      paymentmethod: paymentMethod || 'razorpay',
    });

    console.log('Creating WHMCS order for client:', clientId, 'product:', productId);

    const orderRes = await fetch(WHMCS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: orderParams.toString(),
    });

    const orderData = await orderRes.json();
    console.log('WHMCS AddOrder response:', JSON.stringify(orderData).substring(0, 500));

    if (orderData.result !== 'success') {
      return new Response(JSON.stringify({ error: 'Failed to create order in WHMCS', details: orderData }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Step 3: If Razorpay payment was successful, accept the order and add payment
    if (razorpayPaymentId && orderData.invoiceid) {
      // Add payment to the invoice
      const paymentParams = new URLSearchParams({
        action: 'AddInvoicePayment',
        identifier: WHMCS_API_IDENTIFIER,
        secret: WHMCS_API_SECRET,
        responsetype: 'json',
        invoiceid: orderData.invoiceid.toString(),
        transid: razorpayPaymentId,
        gateway: 'razorpay',
      });

      const paymentRes = await fetch(WHMCS_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: paymentParams.toString(),
      });

      const paymentData = await paymentRes.json();
      console.log('WHMCS AddInvoicePayment response:', JSON.stringify(paymentData).substring(0, 300));

      // Accept the order to trigger provisioning
      const acceptParams = new URLSearchParams({
        action: 'AcceptOrder',
        identifier: WHMCS_API_IDENTIFIER,
        secret: WHMCS_API_SECRET,
        responsetype: 'json',
        orderid: orderData.orderid.toString(),
      });

      const acceptRes = await fetch(WHMCS_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: acceptParams.toString(),
      });

      const acceptData = await acceptRes.json();
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
