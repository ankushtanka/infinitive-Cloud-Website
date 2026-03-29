import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface WhmcsProduct {
  pid: number;
  name: string;
  description: string;
  features: string[];
  pricing: Record<string, {
    monthly: string;
    annually: string;
    prefix: string;
    suffix: string;
    msetupfee: string;
    asetupfee: string;
  }>;
  type: string;
  paytype: string;
}

interface UseWhmcsProductsResult {
  products: WhmcsProduct[];
  loading: boolean;
  error: string | null;
}

// In-memory cache with 5-minute TTL
const cache: Map<string, { products: WhmcsProduct[]; timestamp: number }> = new Map();
const CACHE_TTL = 5 * 60 * 1000;

export function useWhmcsProducts(productIds: number[]): UseWhmcsProductsResult {
  const cacheKey = productIds.sort().join(',');
  const cached = cache.get(cacheKey);
  const isFresh = cached && (Date.now() - cached.timestamp < CACHE_TTL);

  const [products, setProducts] = useState<WhmcsProduct[]>(isFresh ? cached.products : []);
  const [loading, setLoading] = useState(!isFresh && productIds.length > 0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productIds.length) {
      setLoading(false);
      return;
    }

    // Return cached data instantly
    const cachedData = cache.get(cacheKey);
    if (cachedData && (Date.now() - cachedData.timestamp < CACHE_TTL)) {
      setProducts(cachedData.products);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fnError } = await supabase.functions.invoke('whmcs-products', {
          body: { productIds },
        });

        if (cancelled) return;
        if (fnError) throw new Error(fnError.message);

        const rawProducts = data?.products || [];
        const parsed: WhmcsProduct[] = rawProducts.map((p: any) => ({
          pid: p.pid,
          name: p.name,
          description: p.description || '',
          features: (p.description || '')
            .replace(/&amp;/g, '&')
            .split('\n')
            .map((f: string) => f.trim())
            .filter(Boolean),
          pricing: p.pricing || {},
          type: p.type,
          paytype: p.paytype,
        }));

        cache.set(cacheKey, { products: parsed, timestamp: Date.now() });
        setProducts(parsed);
      } catch (err: any) {
        if (!cancelled) {
          setError(err.message || 'Failed to load products');
          console.error('WHMCS products error:', err);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProducts();
    return () => { cancelled = true; };
  }, [cacheKey]);

  return { products, loading, error };
}
