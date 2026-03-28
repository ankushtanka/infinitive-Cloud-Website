import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const MIDDLEWARE_URL = 'https://client.infinitivecloud.com/middleware/domainMiddleware.php';
const ALL_TLDS = ['com', 'net', 'org', 'in', 'co.in', 'online', 'tech', 'website', 'site', 'xyz', 'store', 'io', 'info', 'co', 'me', 'app', 'cloud', 'ai', 'dev', 'shop', 'live', 'pro', 'biz', 'digital', 'space'];
const PRIMARY_CONCURRENCY = 12;
const SUGGESTION_CONCURRENCY = 4;
const REQUEST_TIMEOUT = 4000;
const PRICING_CACHE_TTL = 60 * 60 * 1000;
const SEARCH_CACHE_TTL = 5 * 60 * 1000;

type DomainCheckResult = {
  domain: string;
  tld: string;
  sld: string;
  available: boolean;
  status: string;
};

type DomainResult = DomainCheckResult & {
  price: string | null;
  renewPrice: string | null;
  currency: string;
};

let pricingCache: Record<string, any> | null = null;
let pricingCacheTime = 0;
const searchCache = new Map<string, { timestamp: number; payload: { results: DomainResult[]; suggestions: DomainResult[] } }>();

function generateVariations(baseName: string): string[] {
  const clean = baseName.replace(/[^a-z0-9]/g, '');
  if (!clean) return [];

  const prefixes = ['get', 'my'];
  const suffixes = ['app', 'hub'];
  const variations: string[] = [];

  for (const prefix of prefixes) {
    if (!clean.startsWith(prefix)) variations.push(`${prefix}${clean}`);
  }

  for (const suffix of suffixes) {
    if (!clean.endsWith(suffix)) variations.push(`${clean}${suffix}`);
  }

  return [...new Set(variations)].slice(0, 2);
}

async function fetchJson(url: string, timeout = REQUEST_TIMEOUT) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

async function checkDomain(domain: string): Promise<DomainCheckResult | null> {
  try {
    const data = await fetchJson(`${MIDDLEWARE_URL}?action=domain_search&domain=${encodeURIComponent(domain)}`);
    const parts = domain.split('.');
    const sld = parts[0];
    const tld = parts.slice(1).join('.');
    const isAvailable = data.status === 'available' || (data.result === 'success' && data.status === 'available');

    return {
      domain,
      tld: `.${tld}`,
      sld,
      available: isAvailable,
      status: data.status || 'unknown',
    };
  } catch {
    return null;
  }
}

async function runWithConcurrency<T, R>(items: T[], concurrency: number, worker: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let nextIndex = 0;

  const runners = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (nextIndex < items.length) {
      const currentIndex = nextIndex++;
      results[currentIndex] = await worker(items[currentIndex]);
    }
  });

  await Promise.all(runners);
  return results;
}

async function getPricing(): Promise<Record<string, any>> {
  const now = Date.now();
  if (pricingCache && now - pricingCacheTime < PRICING_CACHE_TTL) {
    return pricingCache;
  }

  try {
    const data = await fetchJson(`${MIDDLEWARE_URL}?action=GetTLDPricing`, 5000);
    const pricing: Record<string, any> = {};

    if (data.pricing && typeof data.pricing === 'object') {
      for (const [tld, info] of Object.entries(data.pricing as Record<string, any>)) {
        pricing[tld] = info;
      }
    }

    pricingCache = pricing;
    pricingCacheTime = now;
    return pricing;
  } catch {
    return pricingCache || {};
  }
}

function attachPricing(result: DomainCheckResult, pricing: Record<string, any>): DomainResult {
  const tldKey = result.tld.substring(1);
  const tldPricing = pricing[`.${tldKey}`] || pricing[tldKey] || null;
  let registerPrice = null;
  let renewPrice = null;

  if (tldPricing) {
    if (tldPricing.register?.['1']) registerPrice = tldPricing.register['1'];
    if (tldPricing.renew?.['1']) renewPrice = tldPricing.renew['1'];
  }

  return {
    ...result,
    price: registerPrice,
    renewPrice,
    currency: '₹',
  };
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
    const cached = searchCache.get(cleanDomain);
    if (cached && Date.now() - cached.timestamp < SEARCH_CACHE_TTL) {
      return new Response(JSON.stringify(cached.payload), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const domainMatch = cleanDomain.match(/^([a-zA-Z0-9-]+)(\.[a-zA-Z0-9-.]+)?$/);
    const baseName = domainMatch ? domainMatch[1] : cleanDomain;
    const specificTld = domainMatch?.[2] || null;

    const tlds = specificTld
      ? [specificTld.startsWith('.') ? specificTld.substring(1) : specificTld]
      : ALL_TLDS;

    const primaryDomains = tlds.map((tld) => `${baseName}.${tld}`);
    const variationNames = specificTld ? [] : generateVariations(baseName);
    const suggestionDomains = variationNames.flatMap((name) => [`${name}.com`, `${name}.in`]).slice(0, 4);

    const [pricing, primaryChecks, suggestionChecks] = await Promise.all([
      getPricing(),
      runWithConcurrency(primaryDomains, PRIMARY_CONCURRENCY, checkDomain),
      suggestionDomains.length > 0
        ? runWithConcurrency(suggestionDomains, SUGGESTION_CONCURRENCY, checkDomain)
        : Promise.resolve([] as (DomainCheckResult | null)[]),
    ]);

    const results = primaryChecks.filter(Boolean).map((result) => attachPricing(result as DomainCheckResult, pricing));
    const suggestions = suggestionChecks
      .filter(Boolean)
      .filter((result) => (result as DomainCheckResult).available)
      .map((result) => attachPricing(result as DomainCheckResult, pricing));

    const payload = { results, suggestions };
    searchCache.set(cleanDomain, { timestamp: Date.now(), payload });

    console.log(`"${baseName}": ${results.length}/${primaryDomains.length} results, ${suggestions.length} suggestions`);

    return new Response(JSON.stringify(payload), {
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
