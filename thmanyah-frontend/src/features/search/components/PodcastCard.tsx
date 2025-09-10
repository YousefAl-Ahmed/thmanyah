// src/components/PodcastCard.tsx
'use client';

import type { Podcast } from '@/types/search';
import ImageFallback from '@/components/UI/ImageFallback';

type Props = { p: Podcast };

export default function PodcastCard({ p }: Props) {
  return (
    <div className="w-[260px] shrink-0">
      <div
        className="
          rounded-2xl border border-white/5 bg-[#141821] p-4
          shadow-sm transition
          hover:-translate-y-0.5 hover:shadow-md hover:ring-1 hover:ring-white/10
        "
      >
        {/* Cover (fixed square) */}
        <div className="relative overflow-hidden rounded-xl border border-white/5">
          <ImageFallback
            src={p.artworkUrl}
            alt={p.title}
            className="aspect-square w-full object-cover"
          />
        </div>

        {/* Text (fixed heights) */}
        <div className="mt-3 min-w-0" dir="rtl">
          {/* Title: 2 lines exactly (leading-5 ≈ 20px → 40px total) */}
          <div
            className="text-[15px] font-semibold leading-5 text-white line-clamp-2 h-[40px]"
            title={p.title}
          >
            {p.title}
          </div>

          {/* Small spacer between title & author */}
          <div className="h-1" />

          {/* Author: 1 line exactly */}
          <div
            className="text-[13px] leading-[18px] text-pink-400/80 line-clamp-1 h-[18px]"
            title={p.author}
          >
            {p.author}
          </div>
        </div>
      </div>
    </div>
  );
}
