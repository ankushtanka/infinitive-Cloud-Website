import { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

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

export function useDomainSearch() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<DomainResult[]>([]);
  const [suggestions, setSuggestions] = useState<DomainResult[]>([]);
  const [searched, setSearched] = useState(false);
  const activeSearchIdRef = useRef(0);

  const search = async (domainInput: string) => {
    const query = domainInput.trim();
    if (!query) return;

    const searchId = Date.now();
    activeSearchIdRef.current = searchId;
    setLoading(true);
    setSearched(true);
    setResults([]);
    setSuggestions([]);

    // Fire both phases in parallel — show whichever arrives first
    const initialPromise = supabase.functions.invoke("domain-search", {
      body: { domain: query, phase: "initial" },
    });
    const fullPromise = supabase.functions.invoke("domain-search", {
      body: { domain: query, phase: "full" },
    });

    try {
      // Show initial results as soon as they arrive
      const initialResponse = await initialPromise;
      if (activeSearchIdRef.current !== searchId) return;
      if (!initialResponse.error) {
        setResults(initialResponse.data?.results || []);
        setSuggestions(initialResponse.data?.suggestions || []);
      }

      // Then replace with full results when ready
      const fullResponse = await fullPromise;
      if (activeSearchIdRef.current !== searchId) return;
      if (!fullResponse.error) {
        setResults(fullResponse.data?.results || []);
        setSuggestions(fullResponse.data?.suggestions || []);
      }
    } catch (err) {
      console.error("Domain search failed:", err);
    } finally {
      if (activeSearchIdRef.current === searchId) {
        setLoading(false);
      }
    }
  };

  const reset = () => {
    activeSearchIdRef.current = Date.now();
    setLoading(false);
    setSearched(false);
    setResults([]);
    setSuggestions([]);
  };

  return { loading, results, suggestions, searched, search, reset };
}
