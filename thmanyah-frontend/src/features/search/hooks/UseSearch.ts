import { useEffect, useRef, useState } from "react";
import type { SearchResponse } from "@/types/search";
import { searchApi } from "@/app/api/search";

export function useSearch(initialQ: string) {
  const [q, setQ] = useState(initialQ ?? "");
  const [data, setData] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const controllerRef = useRef<AbortController | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const term = q.trim();

    if (debounceRef.current) clearTimeout(debounceRef.current);
    controllerRef.current?.abort();

    if (!term) {
      setData(null);
      setLoading(false);
      setErr(null);
      return;
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    debounceRef.current = setTimeout(async () => {
      try {
        setErr(null);
        setLoading(true);
        const res = await searchApi(term, { limit: 20, signal: controller.signal });
        setData(res);
      } catch (e: unknown) {
        if ((e as Error)?.name !== "AbortError") {
          setErr(e instanceof Error ? e.message : "Unexpected error");
        }
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [q]);

  return { q, setQ, data, loading, err };
}
