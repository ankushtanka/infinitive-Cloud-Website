import { useRef, useState } from "react";
import { bulkDomainSearch, type WhmcsDomainResult } from "@/lib/whmcs";

export interface DomainResult {
  domain: string;
  tld: string;
  sld: string;
  available: boolean;
  status: string;
  price: string | null;
  renewPrice: string | null;
  currency: string;
}

export const tldColors: Record<string, string> = {
  ".com": "from-primary to-accent",
  ".in": "from-emerald-500 to-teal-500",
  ".co.in": "from-slate-500 to-slate-600",
  ".net": "from-blue-500 to-indigo-500",
  ".org": "from-violet-500 to-purple-500",
  ".online": "from-orange-500 to-amber-500",
  ".site": "from-pink-500 to-rose-500",
  ".xyz": "from-cyan-500 to-sky-500",
  ".store": "from-rose-500 to-red-500",
  ".tech": "from-teal-500 to-cyan-500",
  ".io": "from-indigo-500 to-blue-500",
  ".dev": "from-green-500 to-emerald-500",
  ".info": "from-amber-500 to-yellow-500",
  ".biz": "from-fuchsia-500 to-pink-500",
  ".co": "from-sky-500 to-blue-500",
  ".me": "from-purple-500 to-violet-500",
  ".app": "from-red-500 to-orange-500",
  ".cloud": "from-blue-400 to-cyan-400",
  ".digital": "from-indigo-400 to-violet-400",
  ".website": "from-teal-400 to-green-400",
  ".space": "from-violet-400 to-purple-400",
  ".pro": "from-amber-400 to-orange-400",
  ".live": "from-red-400 to-pink-400",
  ".shop": "from-emerald-400 to-teal-400",
  ".ai": "from-cyan-400 to-blue-400",
};

export const tldTags: Record<string, string> = {
  ".com": "Most Popular",
  ".in": "India #1",
  ".online": "Best Value",
  ".xyz": "Cheapest",
  ".ai": "Trending",
  ".io": "Startups",
};

export function formatDomainPrice(price: string | null, currency: string) {
  if (!price) return null;
  const num = parseFloat(price);
  if (isNaN(num)) return null;
  return `${currency}${Math.round(num).toLocaleString("en-IN")}`;
}

function mapResult(d: WhmcsDomainResult): DomainResult {
  const parts = d.domain.split('.');
  const sld = parts[0];
  const tld = `.${d.tld || parts.slice(1).join('.')}`;
  return {
    domain: d.domain,
    tld,
    sld,
    available: d.available === true,
    status: d.available ? 'available' : 'unavailable',
    price: d.pricing?.register || null,
    renewPrice: d.pricing?.renew || null,
    currency: '₹',
  };
}

// Client-side cache: avoids re-fetching same domain within 5 minutes
const searchCache = new Map<string, { ts: number; results: DomainResult[] }>();
const CACHE_TTL = 5 * 60 * 1000;

export function useDomainSearch() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<DomainResult[]>([]);
  const [searched, setSearched] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const search = async (domainInput: string) => {
    const query = domainInput.trim();
    if (!query) return;

    const match = query.match(/^([a-zA-Z0-9-]+)(\.[a-zA-Z0-9-.]+)?$/);
    const baseName = (match ? match[1] : query.replace(/[^a-zA-Z0-9-]/g, '')).toLowerCase();
    if (!baseName) return;

    // Cancel any in-flight request
    abortRef.current?.abort();

    // Check cache first — instant results
    const cached = searchCache.get(baseName);
    if (cached && Date.now() - cached.ts < CACHE_TTL) {
      setResults(cached.results);
      setSearched(true);
      setLoading(false);
      return;
    }

    setLoading(true);
    setSearched(true);
    setResults([]);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const data = await bulkDomainSearch(baseName);

      if (controller.signal.aborted) return;

      if (data.result === 'success' && Array.isArray(data.domains)) {
        const mapped = data.domains.map(mapResult);
        setResults(mapped);
        searchCache.set(baseName, { ts: Date.now(), results: mapped });
      } else {
        console.error("Domain search error:", data.message || data);
      }
    } catch (err: any) {
      if (err?.name === 'AbortError') return;
      console.error("Domain search failed:", err);
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  };

  const reset = () => {
    abortRef.current?.abort();
    setLoading(false);
    setSearched(false);
    setResults([]);
  };

  return { loading, results, suggestions: [] as DomainResult[], searched, search, reset };
}
