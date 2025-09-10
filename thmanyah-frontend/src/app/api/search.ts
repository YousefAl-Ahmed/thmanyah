import type { SearchResponse } from "@/types/search";

type SearchOpts = {
  limit?: number;
  offset?: number;
  signal?: AbortSignal;
};

export async function searchApi(term: string, opts: SearchOpts = {}): Promise<SearchResponse> {
  const { limit = 20, offset = 0, signal } = opts;
  const base = process.env.NEXT_PUBLIC_API_BASE ?? "";
  const url = `${base}/api/search?term=${encodeURIComponent(term)}&limit=${limit}&offset=${offset}`;

  const res = await fetch(url, { signal });
  if (!res.ok) {
    // unify errors so callers don’t parse response shapes
    const msg = `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return res.json() as Promise<SearchResponse>;
}
