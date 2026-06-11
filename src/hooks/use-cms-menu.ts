import { useEffect, useState } from "react";
import { CMSMenu } from "@/lib/api";

const BASE = (import.meta.env.VITE_API_URL as string) || "http://localhost:3001";

const cache: Record<string, CMSMenu | null> = {};

export function useCmsMenu(location: "header" | "footer" | "mega") {
  const [menu, setMenu] = useState<CMSMenu | null>(cache[location] ?? null);

  useEffect(() => {
    if (cache[location] !== undefined) {
      setMenu(cache[location]);
      return;
    }
    fetch(`${BASE}/api/menus/location/${location}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data: CMSMenu | null) => {
        cache[location] = data;
        setMenu(data);
      })
      .catch(() => {
        cache[location] = null;
      });
  }, [location]);

  return menu;
}
