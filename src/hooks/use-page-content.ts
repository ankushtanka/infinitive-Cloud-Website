import { useEffect, useState } from "react";
import { apiFetchContent } from "@/lib/api";

export function usePageContent(pageKey: string) {
  const [content, setContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetchContent(pageKey)
      .then(setContent)
      .finally(() => setLoading(false));
  }, [pageKey]);

  /** Returns the admin-managed value for `key`, or `fallback` if not set. */
  const c = (key: string, fallback: string = "") => content[key] || fallback;

  return { content, loading, c };
}
