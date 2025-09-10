// src/components/EpisodeCardWide.tsx
import ImageFallback from "@/components/UI/ImageFallback";
import type { Episode } from "@/types/search";
import { formatShortDate, formatDurationShort } from "@/lib/format";
import { memo } from "react";

type Props = { e: Episode };

/**
 * Presentational, stateless, and memoized.
 * No "use client" needed here—if a parent is client, this will be bundled as client automatically.
 */
function EpisodeCardWideBase({ e }: Props) {
  const dateLabel = formatShortDate(e.publishedAt);
  const durationLabel = formatDurationShort(e.durationSec);

  return (
    <article
      className="group relative w-[460px] shrink-0 overflow-hidden rounded-2xl border border-white/5 bg-[#171a21] p-4"
      role="listitem"
    >
      <div className="flex items-start gap-4">
        <ImageFallback
          src={e.artworkUrl}
          alt={e.title}
          className="h-16 w-16 object-cover"
          rounded="rounded-lg"
        />
        <div className="min-w-0">
          <div className="mb-1 truncate text-xs text-pink-400">{e.podcastTitle}</div>
          <h3 className="truncate text-base font-semibold">{e.title}</h3>

          <div className="mt-3 flex items-center gap-4 text-xs text-gray-400">
            {dateLabel && <span>{dateLabel}</span>}
            {durationLabel && <span>{durationLabel}</span>}
          </div>
        </div>
      </div>

      {/* per-card kebab (not wired) */}
      <button
        title="المزيد"
        aria-label="المزيد من الخيارات"
        className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full text-gray-400 hover:bg-white/10"
        type="button"
      >
        ⋯
      </button>

      {/* bottom hairline like reference */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
        <div className="h-[2px] w-1/5 bg-gradient-to-r from-pink-400/60 to-indigo-400/60" />
      </div>
    </article>
  );
}

// Memoize to avoid re-render when parent re-renders without prop changes.
const EpisodeCardWide = memo(EpisodeCardWideBase);
export default EpisodeCardWide;
