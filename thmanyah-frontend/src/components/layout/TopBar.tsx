// src/components/TopBar.tsx
'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useQueryParam } from '@/lib/useQueryParam';
import TopBarView from '@/components/layout/TopBarView';

type Props = {
  value: string;                 // controlled value from parent
  onChange: (v: string) => void; // lift state to parent
};

export default function TopBar({ value, onChange }: Props) {
  const [placeholder, setPlaceholder] = useState(
    'Search through over 70 million podcasts and episodes...'
  );

  const router = useRouter();
  const pathname = usePathname();
  const { setParam } = useQueryParam('q');

  // When typing: update parent state AND sync URL instantly (no debounce needed here)
  const handleChange = (next: string) => {
    onChange(next);
    setParam(next || null); // remove ?q when empty
  };

  // When pressing Enter: add history entry (push)
  const handleSubmit = () => {
    const term = value.trim();
    if (!term) return;
    // Ensure URL is synced, then push for browser history
    setParam(term);
    // Keep on same path; preserves other params already set
    router.push(`${pathname}?q=${encodeURIComponent(term)}`);
  };

  return (
    <TopBarView
      value={value}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onBack={() => router.back()}
      onForward={() => router.forward()}
      placeholder={placeholder}
      onFocusPlaceholder={() => setPlaceholder('')}
      onBlurPlaceholder={() =>
        setPlaceholder('Search through over 70 million podcasts and episodes...')
      }
    />
  );
}
