import { useState } from "react";
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
};

export const tldTags: Record<string, string> = {
  ".com": "Most Popular",
  ".in": "India #1",
  ".online": "Best Value",
  ".xyz": "Cheapest",
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
  const [searched, setSearched] = useState(false);

  const search = async (domainInput: string) => {
    if (!domainInput.trim()) return;
    setLoading(true);
    setSearched(true);
    setResults([]);

    try {
      const { data, error } = await supabase.functions.invoke("domain-search", {
        body: { domain: domainInput.trim() },
      });
      if (error) throw error;
      setResults(data?.results || []);
    } catch (err) {
      console.error("Domain search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSearched(false);
    setResults([]);
  };

  return { loading, results, searched, search, reset };
}
