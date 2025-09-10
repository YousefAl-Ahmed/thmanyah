// src/app/search/page.tsx
import SearchScreen from "@/features/search/SearchScreen";

type SP = Record<string, string | string[] | undefined>;
type Props = { searchParams?: SP | Promise<SP> };

export default async function SearchPage({ searchParams }: Props) {
  const sp: SP | undefined =
    searchParams && "then" in (searchParams as never)
      ? await (searchParams as Promise<SP>)
      : (searchParams as SP | undefined);

  const qParam = sp?.q;
  const initialQ = typeof qParam === "string" ? qParam : "";

  return <SearchScreen initialQ={initialQ} />;
}
