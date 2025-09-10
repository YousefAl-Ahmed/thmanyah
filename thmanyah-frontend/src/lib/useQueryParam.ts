// src/lib/useQueryParam.ts
'use client';

import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useQueryParam(key: string) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setParam = useCallback(
    (value: string | null) => {
      const params = new URLSearchParams(searchParams?.toString() ?? '');

      if (value && value.trim() !== '') {
        params.set(key, value.trim());
      } else {
        params.delete(key);
      }

      const qs = params.toString();
      const nextUrl = qs ? `${pathname}?${qs}` : pathname;
      router.replace(nextUrl, { scroll: false });
    },
    [key, pathname, router, searchParams]
  );

  const getParam = useCallback(() => {
    return searchParams?.get(key) ?? null;
  }, [key, searchParams]);

  return { getParam, setParam };
}
