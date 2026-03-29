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

export function useWhmcsProducts(productIds: number[]): UseWhmcsProductsResult {
  const [products, setProducts] = useState<WhmcsProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productIds.length) {
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
  }, [productIds.join(',')]);

  return { products, loading, error };
}
