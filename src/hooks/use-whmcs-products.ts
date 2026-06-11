import { useState, useEffect, useCallback, useRef } from "react";
import { fetchProducts as fetchWhmcsProducts } from "@/lib/whmcs";

export interface WhmcsProduct {
  pid: number;
  name: string;
  description: string;
  features: string[];
  /** Flat pricing map: { monthly, annually, biennially, triennially } */
  pricing: Record<string, string>;
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
const cache: Map<string, { products: WhmcsProduct[]; timestamp: number }> = new Map();
const CACHE_TTL = 60 * 1000; // 1 minute client-side TTL

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

  const [products, setProducts] = useState<WhmcsProduct[]>(cached?.products || []);
  const [loading, setLoading] = useState(!cached && productIds.length > 0);
  const [error, setError] = useState<string | null>(null);
  const fetchingRef = useRef(false);

  const loadProducts = useCallback(async (skipCache = false) => {
    if (!productIds.length || fetchingRef.current) return;
    fetchingRef.current = true;

    try {
      if (!skipCache) setLoading(true);
      setError(null);

      const result = await fetchWhmcsProducts();

      if (result.result === 'error') {
        throw new Error(result.message || 'Failed to load products');
      }

      const filtered = productIds.length > 0
        ? result.products.filter(p => productIds.includes(p.pid))
        : result.products;

      const parsed = parseProducts(filtered);

      cache.set(cacheKey, { products: parsed, timestamp: Date.now() });
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
      setProducts(cachedData.products);
      setLoading(false);

      if (now - cachedData.timestamp > CACHE_TTL) {
        loadProducts(true);
      }
    } else {
      loadProducts();
    }
  }, [cacheKey, loadProducts]);

  // Auto-refresh on window focus (stale-while-revalidate)
  useEffect(() => {
    if (!productIds.length) return;

    const handleFocus = () => {
      const cachedData = cache.get(cacheKey);
      if (!cachedData || Date.now() - cachedData.timestamp > CACHE_TTL) {
        loadProducts(true);
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [cacheKey, loadProducts]);

  // Listen for cache invalidation from other components
  useEffect(() => {
    const listener = () => {
      const cachedData = cache.get(cacheKey);
      if (cachedData) {
        setProducts(cachedData.products);
      } else if (productIds.length) {
        loadProducts();
      }
    };
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  }, [cacheKey, loadProducts]);

  return { products, loading, error, refresh: () => loadProducts(false) };
}
