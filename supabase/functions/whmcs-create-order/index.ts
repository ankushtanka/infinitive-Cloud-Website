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
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

async function getStoredPaymentResult(paymentId: string) {
  const supabase = getAdminClient();
  const { data } = await supabase
    .from('whmcs_order_syncs')
    .select('status,response')
    .eq('payment_id', paymentId)
    .maybeSingle();
  if (data?.status === 'completed' && data.response) return data.response;
  return null;
}

async function reservePaymentLock(paymentId: string, gatewayOrderId?: string) {
  const supabase = getAdminClient();
  const { error } = await supabase
    .from('whmcs_order_syncs')
    .insert({ payment_id: paymentId, gateway_order_id: gatewayOrderId ?? null, status: 'processing' });
  return !error;
}

async function finalizePaymentLock(paymentId: string, payload: {
  status: string; response: any;
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

// GET helper for middleware
async function middlewareGet(params: Record<string, string>, timeout = 15000): Promise<any> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const qs = new URLSearchParams(params).toString();
    const res = await fetch(`${MIDDLEWARE_URL}?${qs}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json', 'User-Agent': 'InfinitiveCloud-EdgeFunction/1.0' },
      signal: controller.signal,
    });
    const text = await res.text();
    console.log(`Middleware GET ${params.action}: status=${res.status}, len=${text.length}`);
    try { return JSON.parse(text); } catch {
      console.error(`Non-JSON GET ${params.action}:`, text.substring(0, 400));
      return null;
    }
  } catch (err) {
    console.error(`Fetch error GET ${params.action}:`, err.message);
    return null;
  } finally {
    clearTimeout(timer);
  }
}

// POST helper for middleware (JSON body)
async function middlewarePost(body: Record<string, any>, timeout = 30000): Promise<any> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(MIDDLEWARE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'InfinitiveCloud-EdgeFunction/1.0',
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    const text = await res.text();
    console.log(`Middleware POST ${body.action}: status=${res.status}, len=${text.length}`);
    try { return JSON.parse(text); } catch {
      console.error(`Non-JSON POST ${body.action}:`, text.substring(0, 400));
      return null;
    }
  } catch (err) {
    console.error(`Fetch error POST ${body.action}:`, err.message);
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

    // Handle validate_login for existing customers (GET)
    if (body.action === 'ValidateLogin') {
      const loginResult = await middlewareGet({
        action: 'validate_login',
        email: body.email || '',
        password: body.password || '',
      });

      if (loginResult && loginResult.result === 'success' && loginResult.userid) {
        // Get client details
        const clientDetails = await middlewareGet({
          action: 'get_client',
          clientid: String(loginResult.userid),
        });

        const client = clientDetails?.client || clientDetails || {};

        return new Response(JSON.stringify({
          clientId: loginResult.userid,
          firstName: client.firstname || '',
          lastName: client.lastname || '',
          email: client.email || body.email,
          phone: client.phonenumber || '',
          companyName: client.companyname || '',
          address1: client.address1 || '',
          address2: client.address2 || '',
          city: client.city || '',
          state: client.state || '',
          postcode: client.postcode || '',
          country: client.country || 'IN',
          domains: loginResult.domains || client.domains || [],
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ error: loginResult?.message || 'Invalid email or password.' }), {
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
      cartItems,
      productId, domain, itemType, itemName,
    } = body;

    if (!firstName || !lastName || !email) {
      return new Response(JSON.stringify({ error: 'Missing required fields: firstName, lastName, email' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Build items list
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

    // Idempotency check for Razorpay payments
    if (razorpayPaymentId) {
      const cachedPayment = processedPayments.get(razorpayPaymentId);
      if (cachedPayment) {
        return new Response(JSON.stringify(cachedPayment.response), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      const storedPayment = await getStoredPaymentResult(razorpayPaymentId);
      if (storedPayment) {
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
        return new Response(JSON.stringify({ error: 'This payment is already being processed.' }), {
          status: 409,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // Use complete_order — single POST that creates client + order in one call
    // Pick the first domain item for the order, or generate a subdomain for hosting-only
    const domainItem = orderItems.find(i => i.type === 'domain');
    const hostingItem = orderItems.find(i => i.type !== 'domain');
    const orderDomain = domainItem?.name || domain || `${firstName.toLowerCase().replace(/[^a-z]/g, '')}${Date.now()}.infinitivecloud.com`;

    const completeOrderBody: Record<string, any> = {
      action: 'complete_order',
      firstname: firstName,
      lastname: lastName,
      email,
      password2: password || crypto.randomUUID().slice(0, 16),
      address1: address1 || '',
      address2: address2 || '',
      city: city || '',
      state: state || '',
      postcode: postcode || '',
      country: country || 'IN',
      phonenumber: phone || '',
      domain: orderDomain,
      paymentmethod: paymentMethod || 'razorpay',
    };

    // Add domain registration params
    if (domainItem) {
      completeOrderBody.regperiod = parseDomainRegPeriod(domainItem.period);
    }

    // Add hosting/product params
    if (hostingItem) {
      completeOrderBody.pid = hostingItem.id;
      completeOrderBody.billingcycle = parseBillingCycle(hostingItem.period, billingCycle || 'monthly');
    }

    console.log('complete_order params:', JSON.stringify(completeOrderBody));
    const orderData = await middlewarePost(completeOrderBody);
    console.log('complete_order response:', JSON.stringify(orderData).substring(0, 500));

    if (!orderData || orderData.result !== 'success') {
      const userMessage = orderData?.message || 'Failed to create order';
      if (razorpayPaymentId) {
        await finalizePaymentLock(razorpayPaymentId, {
          status: 'failed',
          response: { error: userMessage, details: orderData },
        });
      }
      return new Response(JSON.stringify({ error: userMessage, details: orderData }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const successResponse = {
      success: true,
      orderId: orderData.orderid,
      invoiceId: orderData.invoiceid,
      clientId: orderData.clientid,
      productIds: orderData.productids || orderData.serviceids || orderData.domainids,
      message: orderData.message || 'Order created successfully',
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
    } catch { /* ignore */ }
    return new Response(JSON.stringify({ error: 'Failed to process order', message: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
