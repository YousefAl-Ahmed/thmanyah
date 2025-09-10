// src/app/search/page.tsx
import SearchScreen from "@/features/search/SearchScreen";

type SP = Record<string, string | string[] | undefined>;

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<SP>;
}) {
  const sp = (await searchParams) ?? {};
  const q = sp.q;
  const initialQ = typeof q === "string" ? q : "";

  return <SearchScreen initialQ={initialQ} />;
}
