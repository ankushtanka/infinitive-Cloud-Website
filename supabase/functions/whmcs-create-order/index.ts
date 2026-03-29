import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const MIDDLEWARE_URL = 'https://client.infinitivecloud.com/middleware/domainMiddleware.php';
const processedPayments = new Map<string, { timestamp: number; response: any }>();
const PROCESSED_PAYMENT_TTL = 10 * 60 * 1000;

function getAdminClient() {
  const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

function cleanProcessedPayments() {
  const now = Date.now();
  for (const [key, value] of processedPayments.entries()) {
    if (now - value.timestamp > PROCESSED_PAYMENT_TTL) {
      processedPayments.delete(key);
    }
  }
}

function parseBillingCycle(period?: string, fallback = 'monthly') {
  const normalized = (period || fallback || '').toLowerCase();
  if (normalized.includes('year') || normalized.includes('annual')) return 'annually';
  if (normalized.includes('quarter')) return 'quarterly';
  if (normalized.includes('semi')) return 'semiannually';
  if (normalized.includes('bienn')) return 'biennially';
  if (normalized.includes('trienn')) return 'triennially';
  return 'monthly';
}

function parseDomainRegPeriod(period?: string) {
  const matched = `${period || ''}`.match(/\d+/);
  const parsed = matched ? Number(matched[0]) : 1;
  return Number.isFinite(parsed) && parsed > 0 ? String(parsed) : '1';
}

function getOrderSummary(orderItems: Array<{ name: string; type: string; price: number; period?: string }>) {
  return orderItems
    .map((item, index) => `${index + 1}. ${item.type}: ${item.name}${item.period ? ` (${item.period})` : ''} - ${item.price}`)
    .join(' | ');
}

async function getStoredPaymentResult(paymentId: string) {
  const supabase = getAdminClient();
  const { data } = await supabase
    .from('whmcs_order_syncs')
    .select('status,response')
    .eq('payment_id', paymentId)
    .maybeSingle();

  if (data?.status === 'completed' && data.response) {
    return data.response;
  }

  return null;
}

async function reservePaymentLock(paymentId: string, gatewayOrderId?: string) {
  const supabase = getAdminClient();
  const { error } = await supabase
    .from('whmcs_order_syncs')
    .insert({
      payment_id: paymentId,
      gateway_order_id: gatewayOrderId ?? null,
      status: 'processing',
    });

  return !error;
}

async function finalizePaymentLock(paymentId: string, payload: {
  status: string;
  response: any;
  whmcsOrderId?: string | number | null;
  whmcsInvoiceId?: string | number | null;
}) {
  const supabase = getAdminClient();
  await supabase
    .from('whmcs_order_syncs')
    .update({
      status: payload.status,
      response: payload.response,
      whmcs_order_id: payload.whmcsOrderId ? String(payload.whmcsOrderId) : null,
      whmcs_invoice_id: payload.whmcsInvoiceId ? String(payload.whmcsInvoiceId) : null,
    })
    .eq('payment_id', paymentId);
}

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

  let requestBody: any = null;

  try {
    cleanProcessedPayments();
    const body = await req.json();
    requestBody = body;

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

    if (razorpayPaymentId) {
      const cachedPayment = processedPayments.get(razorpayPaymentId);
      if (cachedPayment) {
        console.log(`Duplicate payment callback detected for ${razorpayPaymentId}, returning cached result`);
        return new Response(JSON.stringify(cachedPayment.response), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const storedPayment = await getStoredPaymentResult(razorpayPaymentId);
      if (storedPayment) {
        console.log(`Duplicate payment callback resolved from database for ${razorpayPaymentId}`);
        processedPayments.set(razorpayPaymentId, { timestamp: Date.now(), response: storedPayment });
        return new Response(JSON.stringify(storedPayment), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const lockReserved = await reservePaymentLock(razorpayPaymentId, razorpayOrderId);
      if (!lockReserved) {
        const lockedPayment = await getStoredPaymentResult(razorpayPaymentId);
        if (lockedPayment) {
          processedPayments.set(razorpayPaymentId, { timestamp: Date.now(), response: lockedPayment });
          return new Response(JSON.stringify(lockedPayment), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        return new Response(JSON.stringify({ error: 'This payment is already being processed. Please wait a moment and refresh.' }), {
          status: 409,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
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
      noinvoice: '0',
      noinvoiceemail: '0',
      notes: `Checkout order${razorpayPaymentId ? ` | Payment ID: ${razorpayPaymentId}` : ''}${razorpayOrderId ? ` | Gateway Order ID: ${razorpayOrderId}` : ''} | Items: ${getOrderSummary(orderItems)}`,
    };


    // Separate domain and product arrays for WHMCS AddOrder
    const domainNames: string[] = [];
    const domainTypes: string[] = [];
    const domainRegPeriods: string[] = [];
    const productIds: string[] = [];
    const productDomains: string[] = [];
    const productBillingCycles: string[] = [];
    const productPriceOverrides: string[] = [];

    for (const item of orderItems) {
      if (item.type === 'domain') {
        domainNames.push(item.name);
        domainTypes.push('register');
        domainRegPeriods.push(parseDomainRegPeriod(item.period));
      } else {
        const hostDomain = domain || `${firstName.toLowerCase().replace(/[^a-z]/g, '')}${clientId}.infinitivecloud.com`;
        productIds.push(String(item.id));
        productDomains.push(hostDomain);
        productBillingCycles.push(parseBillingCycle(item.period, billingCycle || 'monthly'));
        if (item.price && item.price > 0) {
          productPriceOverrides.push(String(item.price));
        }
      }
    }

    // Add domains as comma-separated or indexed params
    for (let i = 0; i < domainNames.length; i++) {
      orderParams[`domain[${i}]`] = domainNames[i];
      orderParams[`domaintype[${i}]`] = domainTypes[i];
      orderParams[`regperiod[${i}]`] = domainRegPeriods[i];
    }

    // Add products
    for (let i = 0; i < productIds.length; i++) {
      orderParams[`pid[${i}]`] = productIds[i];
      orderParams[`domain[${i + domainNames.length}]`] = productDomains[i];
      orderParams[`billingcycle[${i}]`] = productBillingCycles[i];
      if (productPriceOverrides[i]) {
        orderParams[`priceoverride[${i}]`] = productPriceOverrides[i];
      }
    }

    console.log('AddOrder params:', JSON.stringify(orderParams));

    // Use NO-RETRY for AddOrder to prevent duplicate orders
    let orderData = await callMiddlewareNoRetry(orderParams);
    console.log('AddOrder response:', JSON.stringify(orderData).substring(0, 500));

    if (!orderData || orderData.result !== 'success') {
      // If domain TLD error, try alternative reg periods (only once each, no retry)
      if (domainNames.length > 0 && orderData?.message?.includes('Invalid TLD')) {
        for (const period of ['2', '3', '5']) {
          for (let i = 0; i < domainNames.length; i++) {
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
    let paymentData = null;
    let acceptData = null;
    if (razorpayPaymentId && orderData.invoiceid) {
      const paymentAmount = totalAmount ? String(totalAmount) : '0';

      paymentData = await callMiddleware({
        action: 'AddInvoicePayment',
        invoiceid: String(orderData.invoiceid),
        transid: razorpayPaymentId,
        gateway: 'razorpay',
        date: new Date().toISOString().slice(0, 19).replace('T', ' '),
        noemail: 'true',
      });
      console.log('AddInvoicePayment response:', JSON.stringify(paymentData).substring(0, 300));

      // Accept the order to activate the service
      acceptData = await callMiddleware({
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

    const successResponse = {
      success: true,
      orderId: orderData.orderid,
      invoiceId: orderData.invoiceid,
      clientId,
      productIds: orderData.productids || orderData.serviceids || orderData.domainids,
      paymentRecorded: paymentData?.result === 'success',
      orderAccepted: acceptData?.result === 'success',
    };

    if (razorpayPaymentId) {
      processedPayments.set(razorpayPaymentId, { timestamp: Date.now(), response: successResponse });
      await finalizePaymentLock(razorpayPaymentId, {
        status: 'completed',
        response: successResponse,
        whmcsOrderId: orderData.orderid,
        whmcsInvoiceId: orderData.invoiceid,
      });
    }

    return new Response(JSON.stringify(successResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('WHMCS create order error:', error);
    try {
      if (requestBody?.razorpayPaymentId) {
        await finalizePaymentLock(requestBody.razorpayPaymentId, {
          status: 'failed',
          response: { error: 'Failed to process order', message: error.message },
        });
      }
    } catch {
      // ignore lock finalization issues
    }
    return new Response(JSON.stringify({ error: 'Failed to process order', message: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
