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

// Module-level cache — single fetch per session
let cachedPrices: Record<string, DomainPriceEntry> | null = null;
let fetchStarted = false;

async function loadPrices(): Promise<Record<string, DomainPriceEntry>> {
  if (cachedPrices) return cachedPrices;

  // Wait 4 seconds so page load + any user search happens first
  await new Promise((r) => setTimeout(r, 4000));

  try {
    const res = await fetch(MIDDLEWARE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "bulk_search", name: "pricing" }),
    });
    const data = await res.json();
    const map: Record<string, DomainPriceEntry> = {};
    if (data?.result === "success" && Array.isArray(data.domains)) {
      for (const d of data.domains) {
        if (!d.tld) continue;
        const tld = `.${d.tld}`;
        map[tld] = {
          register: parsePrice(d.pricing?.register),
          renew: parsePrice(d.pricing?.renew),
        };
      }
    }
    cachedPrices = map;
    return map;
  } catch {
    cachedPrices = {};
    return {};
  }
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

    // Subscribe to be notified when prices load
    const update = () => {
      setPrices(cachedPrices ?? {});
      setLoading(false);
    };
    listeners.add(update);

    // Only one fetch ever — whichever component mounts first triggers it
    if (!fetchStarted) {
      fetchStarted = true;
      loadPrices().then(() => notifyAll());
    }

    return () => { listeners.delete(update); };
  }, []);

  return { prices, loading };
}
