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
    const timer = setTimeout(() => controller.abort(), 20000);
    try {
      const res = await fetch(MIDDLEWARE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (compatible; InfinitiveCloud/1.0)',
          'Accept': 'application/json, text/plain, */*',
          'Accept-Language': 'en-US,en;q=0.9',
        },
        body: new URLSearchParams(params).toString(),
        signal: controller.signal,
      });
      const text = await res.text();
      try {
        return JSON.parse(text);
      } catch {
        console.error(`Non-JSON response for ${params.action} (attempt ${attempt + 1}):`, text.substring(0, 300));
        if (text.includes('recaptcha') || text.includes('Bot Verification')) {
          if (attempt < retries) {
            console.log(`Bot detection hit for ${params.action}, waiting before retry...`);
            await sleep(2000 * (attempt + 1));
            continue;
          }
        }
        return null;
      }
    } catch (err) {
      console.error(`Fetch error for ${params.action} (attempt ${attempt + 1}):`, err.message);
      if (attempt < retries) { await sleep(1500); continue; }
      return null;
    } finally {
      clearTimeout(timer);
    }
  }
  return null;
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
        // Get client details
        const clientDetails = await callMiddleware({
          action: 'GetClientsDetails',
          clientid: String(loginResult.userid),
        });
        return new Response(JSON.stringify({
          clientId: loginResult.userid,
          firstName: clientDetails?.firstname || '',
          lastName: clientDetails?.lastname || '',
          email: clientDetails?.email || body.email,
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
      productId, billingCycle, paymentMethod, password,
      razorpayPaymentId, razorpayOrderId,
      totalAmount, domain, itemType, itemName,
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
      password2: password || crypto.randomUUID().slice(0, 16),
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
        // Update client details with latest info
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

    // Brief pause to avoid bot detection between API calls
    await sleep(1000);

    // Step 2: Create the order in WHMCS
    const isDomainOrder = itemType === 'domain';
    const hostDomain = domain || `${firstName.toLowerCase().replace(/[^a-z]/g, '')}${clientId}.infinitivecloud.com`;

    // Build order notes with item details
    const orderNotes = [
      `Item: ${itemName || (isDomainOrder ? hostDomain : 'Hosting Plan')}`,
      `Type: ${isDomainOrder ? 'Domain Registration' : 'Hosting'}`,
      `Billing: ${billingCycle || 'monthly'}`,
      razorpayPaymentId ? `Razorpay Payment ID: ${razorpayPaymentId}` : '',
      razorpayOrderId ? `Razorpay Order ID: ${razorpayOrderId}` : '',
      totalAmount ? `Amount Paid: ₹${totalAmount}` : '',
    ].filter(Boolean).join(' | ');

    const orderParams: Record<string, string> = {
      action: 'AddOrder',
      clientid: String(clientId),
      paymentmethod: paymentMethod || 'razorpay',
      notes: orderNotes,
    };

    if (isDomainOrder) {
      // Domain registration order
      orderParams['domains[0]'] = hostDomain;
      orderParams['domaintype[0]'] = 'register';
      orderParams['regperiod[0]'] = body.regperiod ? String(body.regperiod) : '1';
    } else {
      // Hosting product order
      orderParams['pid[0]'] = String(productId);
      orderParams['domain[0]'] = hostDomain;
      orderParams['billingcycle[0]'] = billingCycle || 'monthly';
    }

    let orderData = await callMiddleware(orderParams);
    console.log('WHMCS AddOrder response:', JSON.stringify(orderData).substring(0, 500));

    // If domain registration failed due to invalid TLD/period, retry with common periods
    if (isDomainOrder && orderData?.result === 'error' && orderData?.message?.includes('Invalid TLD')) {
      const fallbackPeriods = ['2', '3', '5'];
      for (const period of fallbackPeriods) {
        console.log(`Retrying domain order with regperiod=${period}`);
        orderParams['regperiod[0]'] = period;
        orderData = await callMiddleware(orderParams);
        console.log(`WHMCS AddOrder (period=${period}) response:`, JSON.stringify(orderData).substring(0, 300));
        if (orderData?.result === 'success') break;
      }
    }

    if (!orderData || orderData.result !== 'success') {
      const userMessage = isDomainOrder && orderData?.message?.includes('Invalid TLD')
        ? `The domain extension for "${hostDomain}" is not available for registration through our system. Please try a different extension like .com, .in, or .net.`
        : 'Failed to create order';
      return new Response(JSON.stringify({ error: userMessage, details: orderData }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Step 3: If Razorpay payment was successful, add payment and accept order
    if (razorpayPaymentId && orderData.invoiceid) {
      // Calculate amount in WHMCS currency (INR)
      const paymentAmount = totalAmount ? String(totalAmount) : String(body.grandTotal || 0);
      
      const paymentData = await callMiddleware({
        action: 'AddInvoicePayment',
        invoiceid: String(orderData.invoiceid),
        transid: razorpayPaymentId,
        gateway: 'razorpay',
        amount: paymentAmount,
        date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
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
