import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const MIDDLEWARE_URL = 'https://client.infinitivecloud.com/middleware/domainMiddleware.php';
const SEARCH_CACHE_TTL = 5 * 60 * 1000;

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

const searchCache = new Map<string, { timestamp: number; payload: { results: DomainResult[] } }>();

function parseBulkResponse(data: any): DomainResult[] {
  if (data?.result !== 'success' || !Array.isArray(data.domains)) return [];

  return data.domains.map((d: any) => {
    const parts = d.domain.split('.');
    const sld = parts[0];
    const tld = parts.slice(1).join('.');

    return {
      domain: d.domain,
      tld: `.${tld}`,
      sld,
      available: d.available === true,
      status: d.available ? 'available' : 'unavailable',
      price: d.pricing?.register || null,
      renewPrice: d.pricing?.renew || null,
      currency: '₹',
    };
  });
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { domain } = await req.json() as { domain?: string };

    if (!domain || typeof domain !== 'string') {
      return new Response(JSON.stringify({ error: 'Domain name is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const cleanDomain = domain.trim().toLowerCase().replace(/\s+/g, '');
    // Extract just the name part (before any TLD)
    const domainMatch = cleanDomain.match(/^([a-zA-Z0-9-]+)(\.[a-zA-Z0-9-.]+)?$/);
    const baseName = domainMatch ? domainMatch[1] : cleanDomain;

    // Check cache
    const cached = searchCache.get(baseName);
    if (cached && Date.now() - cached.timestamp < SEARCH_CACHE_TTL) {
      return new Response(JSON.stringify(cached.payload), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Single bulk_search call - returns all TLDs with availability + pricing
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    const url = `${MIDDLEWARE_URL}?action=bulk_search&name=${encodeURIComponent(baseName)}`;

    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json', 'User-Agent': 'InfinitiveCloud-EdgeFunction/1.0' },
      signal: controller.signal,
    });
    clearTimeout(timer);

    const data = await res.json();
    const results = parseBulkResponse(data);

    const payload = { results };
    searchCache.set(baseName, { timestamp: Date.now(), payload });

    console.log(`bulk_search:${baseName}: ${results.length} results (${results.filter(r => r.available).length} available)`);

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
