// src/app/page.tsx
import type { Metadata } from "next";
import SearchScreen from "@/features/search/SearchScreen";

export const metadata: Metadata = { title: "Search" };

type SP = Record<string, string | string[] | undefined>;

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Promise<SP>;
}) {
  const sp = (await searchParams) ?? {};
  const q = sp.q;
  const initialQ = typeof q === "string" ? q : "";

  return <SearchScreen initialQ={initialQ} />;
}
