import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const MIDDLEWARE_URL = 'https://client.infinitivecloud.com/middleware/domainMiddleware.php';
const ALL_TLDS = ['com', 'net', 'org', 'in', 'co.in', 'online', 'tech', 'website', 'site', 'xyz', 'store', 'io', 'info', 'co', 'me', 'app', 'cloud', 'ai', 'dev', 'shop', 'live', 'pro', 'biz', 'digital', 'space'];
const FEATURED_TLDS = ['com', 'in', 'net', 'org', 'co.in', 'online'];
const REQUEST_TIMEOUT = 8000;
const PHASE_TIMEOUT_INITIAL = 8000;
const PHASE_TIMEOUT_FULL = 15000;
const PRICING_CACHE_TTL = 60 * 60 * 1000;
const SEARCH_CACHE_TTL = 5 * 60 * 1000;
const DOMAIN_CHECK_CACHE_TTL = 5 * 60 * 1000;

type SearchPhase = 'initial' | 'full';

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

type SearchPayload = {
  results: DomainResult[];
  suggestions: DomainResult[];
};

let pricingCache: Record<string, any> | null = null;
let pricingCacheTime = 0;
const searchCache = new Map<string, { timestamp: number; payload: SearchPayload }>();
const domainCheckCache = new Map<string, { timestamp: number; result: DomainCheckResult | null }>();
const inflightDomainChecks = new Map<string, Promise<DomainCheckResult | null>>();

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

async function fetchJson(params: Record<string, string>, timeout = REQUEST_TIMEOUT) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(MIDDLEWARE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': 'InfinitiveCloud-EdgeFunction/1.0' },
      body: new URLSearchParams(params).toString(),
      signal: controller.signal,
    });
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

async function checkDomain(domain: string): Promise<DomainCheckResult | null> {
  const now = Date.now();
  const cached = domainCheckCache.get(domain);

  if (cached && now - cached.timestamp < DOMAIN_CHECK_CACHE_TTL) {
    return cached.result;
  }

  const inflight = inflightDomainChecks.get(domain);
  if (inflight) return inflight;

  const request = (async () => {
    try {
      const data = await fetchJson({ action: 'domain_search', domain });
      const parts = domain.split('.');
      const sld = parts[0];
      const tld = parts.slice(1).join('.');
      // New middleware format: { result: 'success', domain, available: true/false, pricing: {...} }
      const isAvailable = data.available === true || data.status === 'available' || (data.result === 'success' && data.available === true);

      const result = {
        domain,
        tld: `.${tld}`,
        sld,
        available: isAvailable,
        status: isAvailable ? 'available' : (data.status || 'unavailable'),
      };

      domainCheckCache.set(domain, { timestamp: Date.now(), result });
      return result;
    } catch {
      return null;
    } finally {
      inflightDomainChecks.delete(domain);
    }
  })();

  inflightDomainChecks.set(domain, request);
  return request;
}

async function runWithConcurrency<T, R>(items: T[], concurrency: number, worker: (item: T) => Promise<R>, timeoutMs?: number): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let nextIndex = 0;
  let timedOut = false;

  const deadline = timeoutMs ? Date.now() + timeoutMs : 0;

  const runners = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (!timedOut) {
      const currentIndex = nextIndex++;
      if (currentIndex >= items.length) break;
      if (deadline && Date.now() > deadline) { timedOut = true; break; }
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
    const data = await fetchJson({ action: 'GetTLDPricing' }, 5000);
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
    const { domain, phase = 'full' } = await req.json() as { domain?: string; phase?: SearchPhase };

    if (!domain || typeof domain !== 'string') {
      return new Response(JSON.stringify({ error: 'Domain name is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const cleanDomain = domain.trim().toLowerCase().replace(/\s+/g, '');
    const normalizedPhase: SearchPhase = phase === 'initial' ? 'initial' : 'full';
    const cacheKey = `${normalizedPhase}:${cleanDomain}`;
    const cached = searchCache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < SEARCH_CACHE_TTL) {
      return new Response(JSON.stringify(cached.payload), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const domainMatch = cleanDomain.match(/^([a-zA-Z0-9-]+)(\.[a-zA-Z0-9-.]+)?$/);
    const baseName = domainMatch ? domainMatch[1] : cleanDomain;

    const tlds = normalizedPhase === 'initial' ? FEATURED_TLDS : ALL_TLDS;
    const primaryDomains = tlds.map((tld) => `${baseName}.${tld}`);

    const variationNames = normalizedPhase === 'initial' ? [] : generateVariations(baseName);
    const suggestionDomains = variationNames.flatMap((name) => ['com', 'in'].map((tld) => `${name}.${tld}`));

    const phaseTimeout = normalizedPhase === 'initial' ? PHASE_TIMEOUT_INITIAL : PHASE_TIMEOUT_FULL;
    const concurrency = normalizedPhase === 'initial' ? FEATURED_TLDS.length : 12;

    const [pricing, primaryChecks, suggestionChecks] = await Promise.all([
      getPricing(),
      runWithConcurrency(primaryDomains, concurrency, checkDomain, phaseTimeout),
      suggestionDomains.length > 0
        ? runWithConcurrency(suggestionDomains, 4, checkDomain, phaseTimeout)
        : Promise.resolve([] as (DomainCheckResult | null)[]),
    ]);

    const results = primaryChecks
      .filter(Boolean)
      .map((result) => attachPricing(result as DomainCheckResult, pricing));

    const suggestions = suggestionChecks
      .filter(Boolean)
      .filter((result) => (result as DomainCheckResult).available)
      .map((result) => attachPricing(result as DomainCheckResult, pricing));

    const payload = { results, suggestions };
    searchCache.set(cacheKey, { timestamp: Date.now(), payload });

    console.log(`${normalizedPhase}:${baseName}: ${results.length}/${primaryDomains.length} results, ${suggestions.length} suggestions`);

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
