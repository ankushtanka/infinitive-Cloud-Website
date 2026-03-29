import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const MIDDLEWARE_URL = 'https://client.infinitivecloud.com/middleware/domainMiddleware.php';

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

async function callMiddleware(params: Record<string, string>, retries = 2): Promise<any> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 30000);
    try {
      const res = await fetch(MIDDLEWARE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'application/json, text/plain, */*',
          'Accept-Language': 'en-US,en;q=0.9',
          'Referer': 'https://client.infinitivecloud.com/',
          'Origin': 'https://client.infinitivecloud.com',
        },
        body: new URLSearchParams(params).toString(),
        signal: controller.signal,
      });
      const text = await res.text();
      console.log(`Middleware response for ${params.action}: status=${res.status}, len=${text.length}`);
      try {
        return JSON.parse(text);
      } catch {
        console.error(`Non-JSON for ${params.action} (attempt ${attempt + 1}):`, text.substring(0, 300));
        if (attempt < retries) { await sleep(3000 * (attempt + 1)); continue; }
        return null;
      }
    } catch (err) {
      console.error(`Fetch error for ${params.action} (attempt ${attempt + 1}):`, err.message);
      if (attempt < retries) { await sleep(3000 * (attempt + 1)); continue; }
      return null;
    } finally {
      clearTimeout(timer);
    }
  }
  return null;
}

// DO NOT retry AddOrder — retries cause duplicate orders
async function callMiddlewareNoRetry(params: Record<string, string>): Promise<any> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30000);
  try {
    const res = await fetch(MIDDLEWARE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Referer': 'https://client.infinitivecloud.com/',
        'Origin': 'https://client.infinitivecloud.com',
      },
      body: new URLSearchParams(params).toString(),
      signal: controller.signal,
    });
    const text = await res.text();
    console.log(`Middleware response for ${params.action}: status=${res.status}, len=${text.length}`);
    try { return JSON.parse(text); } catch { return null; }
  } catch (err) {
    console.error(`Fetch error for ${params.action}:`, err.message);
    return null;
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

    // Handle ValidateLogin for existing customers
    if (body.action === 'ValidateLogin') {
      const loginResult = await callMiddleware({
        action: 'ValidateLogin',
        email: body.email || '',
        password2: body.password || '',
      });

      if (loginResult && loginResult.result === 'success' && loginResult.userid) {
        const clientDetails = await callMiddleware({
          action: 'GetClientsDetails',
          clientid: String(loginResult.userid),
        });

        const domainsResult = await callMiddleware({
          action: 'GetClientsDomains',
          clientid: String(loginResult.userid),
          limitnum: '100',
        });

        const domainsList = domainsResult?.domains?.domain || [];
        const domainsArray = Array.isArray(domainsList) ? domainsList : (domainsList ? [domainsList] : []);

        return new Response(JSON.stringify({
          clientId: loginResult.userid,
          firstName: clientDetails?.firstname || '',
          lastName: clientDetails?.lastname || '',
          email: clientDetails?.email || body.email,
          phone: clientDetails?.phonenumber || '',
          companyName: clientDetails?.companyname || '',
          address1: clientDetails?.address1 || '',
          address2: clientDetails?.address2 || '',
          city: clientDetails?.city || '',
          state: clientDetails?.state || '',
          postcode: clientDetails?.postcode || '',
          country: clientDetails?.country || 'IN',
          domains: domainsArray,
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ error: 'Invalid email or password.' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const {
      firstName, lastName, email, phone, companyName,
      address1, address2, city, state, postcode, country,
      billingCycle, paymentMethod, password,
      razorpayPaymentId, razorpayOrderId,
      totalAmount,
      // items array: [{id, name, type, price, period}]
      cartItems,
      // Legacy single-item fields (backward compat)
      productId, domain, itemType, itemName,
    } = body;

    if (!firstName || !lastName || !email) {
      return new Response(JSON.stringify({ error: 'Missing required fields: firstName, lastName, email' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Build items list from cartItems or legacy single-item params
    interface OrderItem {
      id: string | number;
      name: string;
      type: string;
      price: number;
      period?: string;
    }
    
    let orderItems: OrderItem[] = [];
    if (cartItems && Array.isArray(cartItems) && cartItems.length > 0) {
      orderItems = cartItems;
    } else if (productId) {
      orderItems = [{ id: productId, name: itemName || 'Service', type: itemType || 'hosting', price: totalAmount || 0 }];
    }

    if (orderItems.length === 0) {
      return new Response(JSON.stringify({ error: 'No items in order' }), {
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
      password2: password || crypto.randomUUID().slice(0, 16),
    });

    console.log('AddClient response:', JSON.stringify(clientData).substring(0, 500));

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
      const existingData = await callMiddleware({
        action: 'GetClientsDetails',
        email: email,
      });

      if (existingData?.result === 'success') {
        clientId = existingData.id || existingData.userid || existingData.client?.id;
        await callMiddleware({
          action: 'UpdateClient',
          clientid: String(clientId),
          firstname: firstName,
          lastname: lastName,
          phonenumber: phone || '',
          companyname: companyName || '',
          address1: address1 || '',
          address2: address2 || '',
          city: city || '',
          state: state || '',
          postcode: postcode || '',
          country: country || 'IN',
        });
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

    await sleep(1000);

    // Step 2: Build the AddOrder call with ALL items in a single order
    const orderParams: Record<string, string> = {
      action: 'AddOrder',
      clientid: String(clientId),
      paymentmethod: paymentMethod || 'razorpay',
    };

    let domainIndex = 0;
    let productIndex = 0;

    for (const item of orderItems) {
      if (item.type === 'domain') {
        // Domain registration
        orderParams[`domains[${domainIndex}]`] = item.name;
        orderParams[`domaintype[${domainIndex}]`] = 'register';
        orderParams[`regperiod[${domainIndex}]`] = '1';
        // Set domain price override so WHMCS records the correct amount
        if (item.price && item.price > 0) {
          orderParams[`domainpriceoverride[${domainIndex}]`] = String(item.price);
        }
        domainIndex++;
      } else {
        // Hosting/service product
        const hostDomain = domain || `${firstName.toLowerCase().replace(/[^a-z]/g, '')}${clientId}.infinitivecloud.com`;
        orderParams[`pid[${productIndex}]`] = String(item.id);
        orderParams[`domain[${productIndex}]`] = hostDomain;
        orderParams[`billingcycle[${productIndex}]`] = billingCycle || 'monthly';
        // Set price override so WHMCS records the correct amount
        if (item.price && item.price > 0) {
          orderParams[`priceoverride[${productIndex}]`] = String(item.price);
        }
        productIndex++;
      }
    }

    console.log('AddOrder params:', JSON.stringify(orderParams));

    // Use NO-RETRY for AddOrder to prevent duplicate orders
    let orderData = await callMiddlewareNoRetry(orderParams);
    console.log('AddOrder response:', JSON.stringify(orderData).substring(0, 500));

    if (!orderData || orderData.result !== 'success') {
      // If domain TLD error, try alternative reg periods (only once each, no retry)
      if (domainIndex > 0 && orderData?.message?.includes('Invalid TLD')) {
        for (const period of ['2', '3', '5']) {
          for (let i = 0; i < domainIndex; i++) {
            orderParams[`regperiod[${i}]`] = period;
          }
          orderData = await callMiddlewareNoRetry(orderParams);
          console.log(`AddOrder (period=${period}) response:`, JSON.stringify(orderData).substring(0, 300));
          if (orderData?.result === 'success') break;
        }
      }
    }

    if (!orderData || orderData.result !== 'success') {
      const userMessage = orderData?.message?.includes('Invalid TLD')
        ? `The domain extension is not available for registration. Please try .com, .in, or .net.`
        : 'Failed to create order';
      return new Response(JSON.stringify({ error: userMessage, details: orderData }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Step 3: If Razorpay payment was successful, add payment to the invoice and accept order
    if (razorpayPaymentId && orderData.invoiceid) {
      const paymentAmount = totalAmount ? String(totalAmount) : '0';

      const paymentData = await callMiddleware({
        action: 'AddInvoicePayment',
        invoiceid: String(orderData.invoiceid),
        transid: razorpayPaymentId,
        gateway: 'razorpay',
        amount: paymentAmount,
        date: new Date().toISOString().split('T')[0],
      });
      console.log('AddInvoicePayment response:', JSON.stringify(paymentData).substring(0, 300));

      // Accept the order to activate the service
      const acceptData = await callMiddleware({
        action: 'AcceptOrder',
        orderid: String(orderData.orderid),
      });
      console.log('AcceptOrder response:', JSON.stringify(acceptData).substring(0, 300));
    } else if (razorpayPaymentId && !orderData.invoiceid) {
      // No invoice was generated — still accept and log
      console.log('No invoice ID returned from AddOrder, accepting order anyway');
      await callMiddleware({
        action: 'AcceptOrder',
        orderid: String(orderData.orderid),
      });
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
