import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const MIDDLEWARE_URL = 'https://client.infinitivecloud.com/middleware/middleware.php';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { domain } = await req.json();
    if (!domain || typeof domain !== 'string') {
      return new Response(JSON.stringify({ error: 'Domain name is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const cleanDomain = domain.trim().toLowerCase().replace(/\s+/g, '');
    const domainMatch = cleanDomain.match(/^([a-zA-Z0-9-]+)(\.[a-zA-Z0-9-.]+)?$/);
    const baseName = domainMatch ? domainMatch[1] : cleanDomain;
    const specificTld = domainMatch && domainMatch[2] ? domainMatch[2] : null;

    const tldsToCheck = specificTld
      ? [specificTld.startsWith('.') ? specificTld.substring(1) : specificTld]
      : ['com', 'in', 'co.in', 'net', 'org', 'online', 'site', 'xyz', 'store', 'tech', 'io', 'dev'];

    // Check each TLD via the middleware
    const results = await Promise.allSettled(
      tldsToCheck.map(async (tld) => {
        const fullDomain = `${baseName}.${tld}`;

        const response = await fetch(MIDDLEWARE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'domain_search', domain: fullDomain }),
        });

        const rawText = await response.text();
        console.log(`Middleware response for ${fullDomain}:`, rawText.substring(0, 500));

        let data;
        try {
          data = JSON.parse(rawText);
        } catch {
          console.error(`Non-JSON response for ${fullDomain}:`, rawText.substring(0, 300));
          return { domain: fullDomain, tld: `.${tld}`, sld: baseName, available: false, status: 'parse_error' };
        }

        const isAvailable = data.status === 'available' ||
          (data.result === 'success' && data.status === 'available');

        return {
          domain: fullDomain,
          tld: `.${tld}`,
          sld: baseName,
          available: isAvailable,
          status: data.status || data.result || 'unknown',
        };
      })
    );

    // Fetch TLD pricing via middleware pass-through
    let pricing: Record<string, any> = {};
    try {
      const pricingResponse = await fetch(MIDDLEWARE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'GetTLDPricing' }),
      });

      const pricingData = await pricingResponse.json();
      console.log('GetTLDPricing keys:', JSON.stringify(Object.keys(pricingData)));
      console.log('GetTLDPricing sample:', JSON.stringify(pricingData).substring(0, 2000));

      if (pricingData.pricing) {
        for (const category of Object.values(pricingData.pricing) as any[]) {
          if (typeof category === 'object') {
            for (const [tld, priceInfo] of Object.entries(category as Record<string, any>)) {
              pricing[tld] = priceInfo;
            }
          }
        }
      }
    } catch (e) {
      console.error('Failed to fetch TLD pricing:', e);
    }

    const domainResults = results.map((result) => {
      if (result.status === 'fulfilled') {
        const r = result.value;
        const tldKey = r.tld.substring(1);
        const tldPricing = pricing[`.${tldKey}`] || pricing[tldKey] || null;

        let registerPrice = null;
        let renewPrice = null;
        let currency = '₹';

        if (tldPricing) {
          if (tldPricing.register && tldPricing.register['1']) {
            registerPrice = tldPricing.register['1'];
          }
          if (tldPricing.renew && tldPricing.renew['1']) {
            renewPrice = tldPricing.renew['1'];
          }
          if (tldPricing.currency_prefix) {
            currency = tldPricing.currency_prefix;
          }
        }

        return { ...r, price: registerPrice, renewPrice, currency };
      }
      return null;
    }).filter(Boolean);

    return new Response(JSON.stringify({ results: domainResults }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Domain search error:', error);
    return new Response(JSON.stringify({ error: 'Failed to search domains' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
