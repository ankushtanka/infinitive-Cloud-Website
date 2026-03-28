import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const MIDDLEWARE_URL = 'https://client.infinitivecloud.com/middleware/domainMiddleware.php';

// Primary TLDs to always check
const PRIMARY_TLDS = ['com', 'in', 'co.in', 'net', 'org', 'online', 'site', 'xyz', 'store', 'tech', 'io', 'dev'];

// Extended TLDs for more suggestions
const EXTENDED_TLDS = ['info', 'biz', 'co', 'me', 'app', 'cloud', 'digital', 'website', 'space', 'pro', 'live', 'shop', 'ai'];

// Generate name variations for suggestions
function generateVariations(baseName: string): string[] {
  const variations: string[] = [];
  const clean = baseName.replace(/[^a-z0-9]/g, '');
  if (!clean) return variations;

  // Add common prefixes/suffixes
  const prefixes = ['get', 'my', 'the', 'go'];
  const suffixes = ['app', 'hq', 'hub', 'now', 'online', 'web', 'io', 'dev'];

  for (const prefix of prefixes) {
    if (!clean.startsWith(prefix)) {
      variations.push(`${prefix}${clean}`);
    }
  }
  for (const suffix of suffixes) {
    if (!clean.endsWith(suffix)) {
      variations.push(`${clean}${suffix}`);
    }
  }

  // Limit to 6 variations
  return variations.slice(0, 6);
}

async function checkDomain(domain: string): Promise<{ domain: string; tld: string; sld: string; available: boolean; status: string }> {
  const url = `${MIDDLEWARE_URL}?action=domain_search&domain=${encodeURIComponent(domain)}`;
  const response = await fetch(url);
  const rawText = await response.text();

  let data;
  try {
    data = JSON.parse(rawText);
  } catch {
    const parts = domain.split('.');
    const sld = parts[0];
    const tld = parts.slice(1).join('.');
    return { domain, tld: `.${tld}`, sld, available: false, status: 'parse_error' };
  }

  const parts = domain.split('.');
  const sld = parts[0];
  const tld = parts.slice(1).join('.');
  const isAvailable = data.status === 'available' || (data.result === 'success' && data.status === 'available');

  return { domain, tld: `.${tld}`, sld, available: isAvailable, status: data.status || data.result || 'unknown' };
}

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

    // Determine which TLDs to check for the primary name
    const primaryTlds = specificTld
      ? [specificTld.startsWith('.') ? specificTld.substring(1) : specificTld]
      : [...PRIMARY_TLDS, ...EXTENDED_TLDS];

    // Build all domains to check: primary name + all TLDs
    const primaryDomains = primaryTlds.map(tld => `${baseName}.${tld}`);

    // Generate suggested name variations (only check .com and .in for each)
    const variations = specificTld ? [] : generateVariations(baseName);
    const suggestionDomains = variations.flatMap(v => [`${v}.com`, `${v}.in`, `${v}.net`]);

    // Fetch pricing in parallel with domain checks
    const pricingPromise = fetch(`${MIDDLEWARE_URL}?action=GetTLDPricing`)
      .then(r => r.json())
      .catch(() => ({ pricing: {} }));

    // Check all domains in parallel (primary + suggestions)
    const allDomains = [...primaryDomains, ...suggestionDomains];
    const [allResults, pricingData] = await Promise.all([
      Promise.allSettled(allDomains.map(d => checkDomain(d))),
      pricingPromise,
    ]);

    // Parse pricing
    const pricing: Record<string, any> = {};
    if (pricingData.pricing && typeof pricingData.pricing === 'object') {
      for (const [tld, priceInfo] of Object.entries(pricingData.pricing as Record<string, any>)) {
        pricing[tld] = priceInfo;
      }
    }

    function attachPricing(r: any) {
      const tldKey = r.tld.substring(1);
      const tldPricing = pricing[`.${tldKey}`] || pricing[tldKey] || null;
      let registerPrice = null;
      let renewPrice = null;
      const currency = '₹';
      if (tldPricing) {
        if (tldPricing.register?.['1']) registerPrice = tldPricing.register['1'];
        if (tldPricing.renew?.['1']) renewPrice = tldPricing.renew['1'];
      }
      return { ...r, price: registerPrice, renewPrice, currency };
    }

    // Split results back into primary and suggestions
    const primaryCount = primaryDomains.length;
    const primaryResults = allResults.slice(0, primaryCount)
      .map(r => r.status === 'fulfilled' ? attachPricing(r.value) : null)
      .filter(Boolean);

    const suggestionResults = allResults.slice(primaryCount)
      .map(r => r.status === 'fulfilled' ? attachPricing(r.value) : null)
      .filter(Boolean)
      .filter((r: any) => r.available); // Only show available suggestions

    return new Response(JSON.stringify({
      results: primaryResults,
      suggestions: suggestionResults,
    }), {
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
