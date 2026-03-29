import { useState, useEffect, useCallback, useRef } from "react";
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
  refresh: () => void;
}

// Global in-memory cache shared across all hook instances
const cache: Map<string, { products: WhmcsProduct[]; timestamp: number; version?: number }> = new Map();
const CACHE_TTL = 60 * 1000; // 1 minute client-side TTL
const STALE_TTL = 5 * 60 * 1000; // Serve stale data for up to 5 minutes while revalidating

function parseProducts(rawProducts: any[]): WhmcsProduct[] {
  return rawProducts.map((p: any) => ({
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
}

// Listeners for cache updates (cross-component sync)
const listeners: Set<() => void> = new Set();
function notifyListeners() {
  listeners.forEach(fn => fn());
}

// Invalidate cache globally
export function invalidateWhmcsCache() {
  cache.clear();
  notifyListeners();
}

export function useWhmcsProducts(productIds: number[]): UseWhmcsProductsResult {
  const cacheKey = [...productIds].sort().join(',');
  const cached = cache.get(cacheKey);
  const isFresh = cached && (Date.now() - cached.timestamp < CACHE_TTL);

  const [products, setProducts] = useState<WhmcsProduct[]>(cached?.products || []);
  const [loading, setLoading] = useState(!cached && productIds.length > 0);
  const [error, setError] = useState<string | null>(null);
  const fetchingRef = useRef(false);

  const fetchProducts = useCallback(async (skipCache = false) => {
    if (!productIds.length || fetchingRef.current) return;
    fetchingRef.current = true;

    try {
      if (!skipCache) setLoading(true);
      setError(null);

      const { data, error: fnError } = await supabase.functions.invoke('whmcs-products', {
        body: { productIds, skipCache },
      });

      if (fnError) throw new Error(fnError.message);

      const rawProducts = data?.products || [];
      const parsed = parseProducts(rawProducts);

      cache.set(cacheKey, { products: parsed, timestamp: Date.now(), version: data?.version });
      setProducts(parsed);
      notifyListeners();
    } catch (err: any) {
      setError(err.message || 'Failed to load products');
      console.error('WHMCS products error:', err);
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  }, [cacheKey, productIds]);

  // Initial fetch or serve from cache
  useEffect(() => {
    if (!productIds.length) {
      setLoading(false);
      return;
    }

    const cachedData = cache.get(cacheKey);
    const now = Date.now();

    if (cachedData) {
      // Always serve cached data immediately
      setProducts(cachedData.products);
      setLoading(false);

      // If stale, revalidate in background
      if (now - cachedData.timestamp > CACHE_TTL) {
        fetchProducts(true); // skipCache = true for background refresh
      }
    } else {
      fetchProducts();
    }
  }, [cacheKey]);

  // Auto-refresh on window focus (stale-while-revalidate)
  useEffect(() => {
    if (!productIds.length) return;

    const handleFocus = () => {
      const cachedData = cache.get(cacheKey);
      if (!cachedData || Date.now() - cachedData.timestamp > CACHE_TTL) {
        fetchProducts(true);
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [cacheKey, fetchProducts]);

  // Listen for cache invalidation from other components
  useEffect(() => {
    const listener = () => {
      const cachedData = cache.get(cacheKey);
      if (cachedData) {
        setProducts(cachedData.products);
      } else if (productIds.length) {
        fetchProducts();
      }
    };
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  }, [cacheKey, fetchProducts]);

  return { products, loading, error, refresh: () => fetchProducts(false) };
}
