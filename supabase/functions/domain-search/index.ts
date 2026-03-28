import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const MIDDLEWARE_URL = 'https://client.infinitivecloud.com/middleware/domainMiddleware.php';

const PRIMARY_TLDS = ['com', 'in', 'co.in', 'net', 'org', 'online', 'site', 'xyz', 'store', 'tech', 'io', 'dev'];
const EXTENDED_TLDS = ['info', 'biz', 'co', 'me', 'app', 'cloud', 'digital', 'website', 'space', 'pro', 'live', 'shop', 'ai'];

function generateVariations(baseName: string): string[] {
  const variations: string[] = [];
  const clean = baseName.replace(/[^a-z0-9]/g, '');
  if (!clean) return variations;
  const prefixes = ['get', 'my', 'the', 'go'];
  const suffixes = ['app', 'hq', 'hub', 'now', 'online', 'web'];
  for (const prefix of prefixes) {
    if (!clean.startsWith(prefix)) variations.push(`${prefix}${clean}`);
  }
  for (const suffix of suffixes) {
    if (!clean.endsWith(suffix)) variations.push(`${clean}${suffix}`);
  }
  return variations.slice(0, 6);
}

async function checkDomainWithTimeout(domain: string, timeoutMs = 8000): Promise<{ domain: string; tld: string; sld: string; available: boolean; status: string } | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const url = `${MIDDLEWARE_URL}?action=domain_search&domain=${encodeURIComponent(domain)}`;
    const response = await fetch(url, { signal: controller.signal });
    const rawText = await response.text();

    let data;
    try {
      data = JSON.parse(rawText);
    } catch {
      console.log(`Parse error for ${domain}: ${rawText.substring(0, 200)}`);
      return null;
    }

    const parts = domain.split('.');
    const sld = parts[0];
    const tld = parts.slice(1).join('.');
    const isAvailable = data.status === 'available' || (data.result === 'success' && data.status === 'available');

    return { domain, tld: `.${tld}`, sld, available: isAvailable, status: data.status || data.result || 'unknown' };
  } catch (err) {
    console.log(`Timeout/error checking ${domain}: ${err.message}`);
    return null;
  } finally {
    clearTimeout(timer);
  }
}

// Check domains in batches to avoid overwhelming the middleware
async function checkDomainsInBatches(domains: string[], batchSize = 5): Promise<(any | null)[]> {
  const results: (any | null)[] = [];
  for (let i = 0; i < domains.length; i += batchSize) {
    const batch = domains.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(d => checkDomainWithTimeout(d)));
    results.push(...batchResults);
  }
  return results;
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

    const primaryTlds = specificTld
      ? [specificTld.startsWith('.') ? specificTld.substring(1) : specificTld]
      : [...PRIMARY_TLDS, ...EXTENDED_TLDS];

    const primaryDomains = primaryTlds.map(tld => `${baseName}.${tld}`);

    // Generate suggested name variations
    const variations = specificTld ? [] : generateVariations(baseName);
    const suggestionDomains = variations.flatMap(v => [`${v}.com`, `${v}.in`, `${v}.net`]);

    console.log(`Checking ${primaryDomains.length} primary domains and ${suggestionDomains.length} suggestions for "${baseName}"`);

    // Fetch pricing in parallel with domain checks
    const pricingPromise = fetch(`${MIDDLEWARE_URL}?action=GetTLDPricing`)
      .then(r => r.json())
      .catch(() => ({ pricing: {} }));

    // Check primary domains in batches of 5
    const [primaryCheckResults, pricingData] = await Promise.all([
      checkDomainsInBatches(primaryDomains, 5),
      pricingPromise,
    ]);

    // Check suggestions in batches of 5 (after primary to not slow them down)
    const suggestionCheckResults = suggestionDomains.length > 0
      ? await checkDomainsInBatches(suggestionDomains, 5)
      : [];

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

    const primaryResults = primaryCheckResults
      .filter(Boolean)
      .map(attachPricing);

    const suggestionResults = suggestionCheckResults
      .filter(Boolean)
      .filter((r: any) => r.available)
      .map(attachPricing);

    console.log(`Results: ${primaryResults.length} primary (${primaryResults.filter((r:any) => r.available).length} available), ${suggestionResults.length} suggestions`);

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
