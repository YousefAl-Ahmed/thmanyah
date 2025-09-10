'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Episode } from '@/types/search';
import EpisodeCardWide from './EpisodeCardWide';   // for Scroll
import EpisodeCardTile from './EpisodeCardTile';   // for Grid
import EpisodeListRow from './EpisodeListRow';     // for Compact/List

type Layout = 'compact' | 'list' | 'grid' | 'scroll';
type Props = { title: string; episodes: Episode[] };

const STORAGE_KEY = 'episodes.layout';

export default function EpisodesSection({ title, episodes }: Props) {
  const [layout, setLayout] = useState<Layout>('compact'); // default = Compact
  const [menuOpen, setMenuOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // restore & persist
  useEffect(() => {
    const v = localStorage.getItem(STORAGE_KEY) as Layout | null;
    if (v) setLayout(v);
  }, []);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, layout);
  }, [layout]);

  // close menu on outside / ESC
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (
        !menuOpen ||
        !menuRef.current ||
        !btnRef.current ||
        menuRef.current.contains(e.target as Node) ||
        btnRef.current.contains(e.target as Node)
      ) return;
      setMenuOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const content = useMemo(() => {
    switch (layout) {
      case 'scroll':
        return (
          <>
  <div className="h-scroll pb-3">
    <div className="scroll-content">
      {episodes.map((e) => (
        <EpisodeCardWide key={e.id} e={e} />
      ))}
    </div>
  </div>
            <div className="h-px w-full bg-white/5" />
          </>
        );

      case 'grid':
        return (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {episodes.map((e) => (
              <EpisodeCardTile key={e.id} e={e} />
            ))}
          </div>
        );

      case 'list':
        return (
          <div className="grid grid-cols-1 gap-3">
            {episodes.map((e) => (
              <EpisodeListRow key={e.id} e={e} variant="list" />
            ))}
          </div>
        );

      case 'compact':
      default:
        // original small rows – responsive columns (e.g., 1 / 2 / 3)
        return (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {episodes.map((e) => (
              <EpisodeListRow key={e.id} e={e} variant="compact" />
            ))}
          </div>
        );
    }
  }, [layout, episodes]);

  return (
    <section className="mt-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>

        {/* ⋯ layout switcher */}
        <div className="relative">
          <button
            ref={btnRef}
            onClick={() => setMenuOpen((o) => !o)}
            className="grid h-8 w-8 place-items-center rounded-full text-gray-300 hover:bg-white/10"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            title="Layout options"
          >
            ⋯
          </button>

          {menuOpen && (
            <div
              ref={menuRef}
              role="menu"
              className="absolute right-0 z-20 mt-2 w-56 overflow-hidden rounded-xl border border-white/10 bg-[#151821] p-1 shadow-xl"
            >
              <button
                role="menuitem"
                className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-white/5"
                onClick={() => { setLayout('compact'); setMenuOpen(false); }}
              >
                Compact
              </button>
              <button
                role="menuitem"
                className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-white/5"
                onClick={() => { setLayout('list'); setMenuOpen(false); }}
              >
                List
              </button>
              <button
                role="menuitem"
                className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-white/5"
                onClick={() => { setLayout('grid'); setMenuOpen(false); }}
              >
                Grid
              </button>
              <button
                role="menuitem"
                className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-white/5"
                onClick={() => { setLayout('scroll'); setMenuOpen(false); }}
              >
                Scroll
              </button>
            </div>
          )}
        </div>
      </div>

      {content}
    </section>
  );
}
