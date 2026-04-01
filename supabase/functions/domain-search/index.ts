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
const SEARCH_CACHE_TTL = 5 * 60 * 1000;
const DOMAIN_CHECK_CACHE_TTL = 5 * 60 * 1000;

type SearchPhase = 'initial' | 'full';

type DomainResult = {
  domain: string;
  tld: string;
  sld: string;
  available: boolean;
  status: string;
  price: string | null;
  renewPrice: string | null;
  currency: string;
};

type SearchPayload = {
  results: DomainResult[];
  suggestions: DomainResult[];
};

const searchCache = new Map<string, { timestamp: number; payload: SearchPayload }>();
const domainCheckCache = new Map<string, { timestamp: number; result: DomainResult | null }>();
const inflightDomainChecks = new Map<string, Promise<DomainResult | null>>();

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

// Use GET request for domain_search as per new middleware API
async function checkDomain(fullDomain: string): Promise<DomainResult | null> {
  const now = Date.now();
  const cached = domainCheckCache.get(fullDomain);
  if (cached && now - cached.timestamp < DOMAIN_CHECK_CACHE_TTL) {
    return cached.result;
  }

  const inflight = inflightDomainChecks.get(fullDomain);
  if (inflight) return inflight;

  const request = (async () => {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

      const url = `${MIDDLEWARE_URL}?action=domain_search&domain=${encodeURIComponent(fullDomain)}`;
      const res = await fetch(url, {
        method: 'GET',
        headers: { 'Accept': 'application/json', 'User-Agent': 'InfinitiveCloud-EdgeFunction/1.0' },
        signal: controller.signal,
      });
      clearTimeout(timer);

      const data = await res.json();
      // New middleware format: { result: 'success', domain, available: true/false, pricing: { register, renew, years } }
      const parts = fullDomain.split('.');
      const sld = parts[0];
      const tld = parts.slice(1).join('.');

      const isAvailable = data.available === true;
      const registerPrice = data.pricing?.register || null;
      const renewPrice = data.pricing?.renew || null;

      const result: DomainResult = {
        domain: fullDomain,
        tld: `.${tld}`,
        sld,
        available: isAvailable,
        status: isAvailable ? 'available' : 'unavailable',
        price: registerPrice,
        renewPrice: renewPrice,
        currency: '₹',
      };

      domainCheckCache.set(fullDomain, { timestamp: Date.now(), result });
      return result;
    } catch {
      return null;
    } finally {
      inflightDomainChecks.delete(fullDomain);
    }
  })();

  inflightDomainChecks.set(fullDomain, request);
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

    const [primaryChecks, suggestionChecks] = await Promise.all([
      runWithConcurrency(primaryDomains, concurrency, checkDomain, phaseTimeout),
      suggestionDomains.length > 0
        ? runWithConcurrency(suggestionDomains, 4, checkDomain, phaseTimeout)
        : Promise.resolve([] as (DomainResult | null)[]),
    ]);

    const results = primaryChecks.filter(Boolean) as DomainResult[];
    const suggestions = (suggestionChecks.filter(Boolean) as DomainResult[]).filter((r) => r.available);

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
