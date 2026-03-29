import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const MIDDLEWARE_URL = 'https://client.infinitivecloud.com/middleware/domainMiddleware.php';

// Cache products for 60 seconds (short TTL for near-instant sync)
let productsCache: Record<string, any> | null = null;
let productsCacheTime = 0;
const PRODUCTS_CACHE_TTL = 60 * 1000;
let cacheVersion = 0;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();

    // Handle cache invalidation request
    if (body.action === 'invalidate') {
      productsCache = null;
      productsCacheTime = 0;
      cacheVersion++;
      return new Response(JSON.stringify({ success: true, message: 'Cache invalidated', version: cacheVersion }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { productIds, skipCache } = body as { productIds?: number[]; skipCache?: boolean };

    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return new Response(JSON.stringify({ error: 'productIds array is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate product IDs are numbers
    if (!productIds.every(id => typeof id === 'number' && Number.isInteger(id) && id > 0)) {
      return new Response(JSON.stringify({ error: 'All productIds must be positive integers' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const now = Date.now();
    const cacheKey = productIds.sort().join(',');

    // Check cache (skip if explicitly requested)
    if (!skipCache && productsCache && now - productsCacheTime < PRODUCTS_CACHE_TTL && productsCache._key === cacheKey) {
      return new Response(JSON.stringify({ ...productsCache.data, cached: true, version: cacheVersion }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Fetch products from middleware using new standardized get_products action
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10000);

    let data: any;
    try {
      const response = await fetch(MIDDLEWARE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ action: 'get_products' }).toString(),
        signal: controller.signal,
      });
      const text = await response.text();
      try {
        data = JSON.parse(text);
      } catch {
        console.error('Middleware returned non-JSON response:', text.substring(0, 300));
        return new Response(JSON.stringify({ error: 'Middleware returned an invalid response. Please try again.' }), {
          status: 502,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    } finally {
      clearTimeout(timer);
    }

    console.log('get_products response:', JSON.stringify(data).substring(0, 500));

    if (data?.result !== 'success') {
      return new Response(JSON.stringify({ error: data?.message || 'Failed to fetch products' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // New format: { result: 'success', products: [...] }
    const allProducts = data?.products || [];
    const productList = Array.isArray(allProducts) ? allProducts : [allProducts];
    
    // Filter by requested productIds
    const filteredProducts = productList.filter((p: any) => productIds.includes(Number(p.pid)));

    const parsed = filteredProducts.map((p: any) => ({
      pid: p.pid,
      name: p.name,
      description: p.description || '',
      pricing: p.pricing || {},
      features: p.configoptions || [],
      type: p.type || 'hostingaccount',
      paytype: p.paytype || 'recurring',
    }));

    const responseData = { products: parsed, version: cacheVersion };

    // Cache
    productsCache = { _key: cacheKey, data: { products: parsed } };
    productsCacheTime = now;

    return new Response(JSON.stringify(responseData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('WHMCS products fetch error:', error);
    // Return stale cache on error if available
    if (productsCache) {
      return new Response(JSON.stringify({ ...productsCache.data, stale: true, version: cacheVersion }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ error: 'Failed to fetch products' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
