import { useEffect, useState } from "react";
import { MIDDLEWARE_URL } from "@/lib/whmcs";

export interface DomainPriceEntry {
  register: number | null;
  renew: number | null;
}

const parsePrice = (val: unknown): number | null => {
  if (!val) return null;
  if (typeof val === "object") {
    const first = Object.values(val as Record<string, string>)[0];
    return parsePrice(first);
  }
  const n = parseFloat(String(val));
  return Number.isFinite(n) && n > 0 ? Math.round(n) : null;
};

// Module-level cache
let cachedPrices: Record<string, DomainPriceEntry> | null = null;
// Single in-flight promise — prevents duplicate fetches across component mounts
let fetchPromise: Promise<Record<string, DomainPriceEntry>> | null = null;

async function loadPrices(): Promise<Record<string, DomainPriceEntry>> {
  if (cachedPrices) return cachedPrices;

  const map: Record<string, DomainPriceEntry> = {};

  // Primary: get_tld_pricing — WHMCS GetTLDPricing, returns all TLDs at once
  try {
    const res = await fetch(MIDDLEWARE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "get_tld_pricing" }),
    });
    const data = await res.json();

    // WHMCS format: { result: "success", pricing: { "com": { register: {"1":"879"}, renew: {"1":"879"} } } }
    if (data?.result === "success" && data?.pricing && typeof data.pricing === "object") {
      for (const [tld, pricing] of Object.entries(data.pricing as Record<string, any>)) {
        const reg = parsePrice((pricing as any)?.register);
        const ren = parsePrice((pricing as any)?.renew);
        if (reg !== null || ren !== null) {
          map[`.${tld}`] = { register: reg, renew: ren };
        }
      }
    }

    // Also handle flat format: { result: "success", domains: [...] }
    if (data?.result === "success" && Array.isArray(data.domains)) {
      for (const d of data.domains) {
        if (!d.tld) continue;
        map[`.${d.tld}`] = {
          register: parsePrice(d.pricing?.register),
          renew: parsePrice(d.pricing?.renew),
        };
      }
    }
  } catch { /* fall through */ }

  // Fallback: bulk_search with a dummy name — extracts pricing from domain availability response
  if (Object.keys(map).length === 0) {
    try {
      const res = await fetch(MIDDLEWARE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "bulk_search", name: "example" }),
      });
      const data = await res.json();
      if (data?.result === "success" && Array.isArray(data.domains)) {
        for (const d of data.domains) {
          if (!d.tld) continue;
          map[`.${d.tld}`] = {
            register: parsePrice(d.pricing?.register),
            renew: parsePrice(d.pricing?.renew),
          };
        }
      }
    } catch { /* ignore */ }
  }

  if (Object.keys(map).length > 0) {
    cachedPrices = map;
  } else {
    // Don't cache empty results — allow retry on next component mount
    fetchPromise = null;
  }
  return map;
}

const listeners = new Set<() => void>();

function notifyAll() {
  listeners.forEach((fn) => fn());
}

export function useDomainPricing(_tlds?: string[]) {
  const [prices, setPrices] = useState<Record<string, DomainPriceEntry>>(cachedPrices ?? {});
  const [loading, setLoading] = useState(!cachedPrices);

  useEffect(() => {
    if (cachedPrices) {
      setPrices(cachedPrices);
      setLoading(false);
      return;
    }

    const update = () => {
      setPrices(cachedPrices ?? {});
      setLoading(false);
    };
    listeners.add(update);

    if (!fetchPromise) {
      fetchPromise = loadPrices().then(() => {
        notifyAll();
        return cachedPrices ?? {};
      });
    }

    return () => { listeners.delete(update); };
  }, []);

  return { prices, loading };
}
