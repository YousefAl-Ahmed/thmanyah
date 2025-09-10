// src/app/page.tsx
import SearchScreen from '@/features/search/SearchScreen';
// src/app/page.tsx
import type { Metadata } from "next";
/** Page-level metadata (uses the template from layout if you set one) */
export const metadata: Metadata = {
  title: "Search",
};

type PageProps = {
  searchParams?: {
    q?: string | string[];
  };
};

/**
 * Server component (default).
 * - Derives `initialQ` from URL (?q=...) but defaults to "" (no UI change).
 * - Safe guarding against array values from repeated query params.
 */
export default function HomePage({ searchParams }: PageProps) {
  const qParam = searchParams?.q;
  const initialQ = typeof qParam === "string" ? qParam : "";

  return <SearchScreen initialQ={initialQ} />;
}
