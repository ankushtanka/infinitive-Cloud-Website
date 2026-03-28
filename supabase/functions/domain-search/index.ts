import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const MIDDLEWARE_URL = 'https://client.infinitivecloud.com/middleware/domainMiddleware.php';

// Core TLDs to check — kept to ~15 for speed
const ALL_TLDS = ['com', 'in', 'co.in', 'net', 'org', 'online', 'site', 'xyz', 'store', 'tech', 'io', 'info', 'co', 'me', 'app', 'cloud', 'website', 'ai', 'dev', 'shop', 'live', 'pro', 'biz', 'digital', 'space'];

function generateVariations(baseName: string): string[] {
  const clean = baseName.replace(/[^a-z0-9]/g, '');
  if (!clean) return [];
  const prefixes = ['get', 'my', 'the', 'go'];
  const suffixes = ['app', 'hq', 'hub', 'now', 'web'];
  const variations: string[] = [];
  for (const p of prefixes) {
    if (!clean.startsWith(p)) variations.push(`${p}${clean}`);
  }
  for (const s of suffixes) {
    if (!clean.endsWith(s)) variations.push(`${clean}${s}`);
  }
  return variations.slice(0, 4);
}

async function checkDomain(domain: string): Promise<{ domain: string; tld: string; sld: string; available: boolean; status: string } | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 6000);
  try {
    const url = `${MIDDLEWARE_URL}?action=domain_search&domain=${encodeURIComponent(domain)}`;
    const response = await fetch(url, { signal: controller.signal });
    const rawText = await response.text();
    const data = JSON.parse(rawText);
    const parts = domain.split('.');
    const sld = parts[0];
    const tld = parts.slice(1).join('.');
    const isAvailable = data.status === 'available' || (data.result === 'success' && data.status === 'available');
    return { domain, tld: `.${tld}`, sld, available: isAvailable, status: data.status || 'unknown' };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { domain } = await req.json();
    if (!domain || typeof domain !== 'string') {
      return new Response(JSON.stringify({ error: 'Domain name is required' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const cleanDomain = domain.trim().toLowerCase().replace(/\s+/g, '');
    const domainMatch = cleanDomain.match(/^([a-zA-Z0-9-]+)(\.[a-zA-Z0-9-.]+)?$/);
    const baseName = domainMatch ? domainMatch[1] : cleanDomain;
    const specificTld = domainMatch && domainMatch[2] ? domainMatch[2] : null;

    const tlds = specificTld
      ? [specificTld.startsWith('.') ? specificTld.substring(1) : specificTld]
      : ALL_TLDS;

    const primaryDomains = tlds.map(tld => `${baseName}.${tld}`);
    const variations = specificTld ? [] : generateVariations(baseName);
    const suggestionDomains = variations.flatMap(v => [`${v}.com`, `${v}.in`]);

    // All checks + pricing in parallel — the middleware handles concurrency
    const allDomains = [...primaryDomains, ...suggestionDomains];
    const [allResults, pricingData] = await Promise.all([
      Promise.all(allDomains.map(d => checkDomain(d))),
      fetch(`${MIDDLEWARE_URL}?action=GetTLDPricing`).then(r => r.json()).catch(() => ({ pricing: {} })),
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

    const primaryCount = primaryDomains.length;
    const primaryResults = allResults.slice(0, primaryCount).filter(Boolean).map(attachPricing);
    const suggestionResults = allResults.slice(primaryCount).filter(Boolean).filter((r: any) => r.available).map(attachPricing);

    console.log(`"${baseName}": ${primaryResults.length}/${primaryDomains.length} results, ${suggestionResults.length} suggestions`);

    return new Response(JSON.stringify({ results: primaryResults, suggestions: suggestionResults }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Domain search error:', error);
    return new Response(JSON.stringify({ error: 'Failed to search domains' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
