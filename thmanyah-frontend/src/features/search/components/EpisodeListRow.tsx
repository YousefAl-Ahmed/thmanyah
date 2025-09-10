'use client';
import ImageFallback from '@/components/UI/ImageFallback';
import type { Episode } from '@/types/search';

type Variant = 'compact' | 'list';
type Props = { e: Episode; variant?: Variant };

export default function EpisodeListRow({ e, variant = 'compact' }: Props) {
  const isList = variant === 'list';
  return (
    <div
      className={[
        'flex items-start gap-4 rounded-xl bg-[#171a21] transition hover:bg-[#1b1f27]',
        isList ? 'p-4' : 'p-3',
      ].join(' ')}
    >
      <ImageFallback
        src={e.artworkUrl}
        alt={e.title}
        className={isList ? 'h-16 w-16 object-cover' : 'h-12 w-12 object-cover'}
        rounded="rounded-md"
      />
      <div className="min-w-0 flex-1">
        {/* podcast name */}
        <div className="truncate text-xs text-pink-400">{e.podcastTitle}</div>
        {/* title */}
        <div
          className={[
            'font-medium',
            isList ? 'text-base leading-snug line-clamp-2' : 'truncate',
          ].join(' ')}
        >
          {e.title}
        </div>
        {/* meta (date / duration) */}
        <div className="mt-2 flex items-center gap-4 text-xs text-gray-400">
          {/* you can format these if you want, kept simple to avoid changing your types */}
          {e.publishedAt && <span>{new Date(e.publishedAt).toLocaleDateString()}</span>}
          {typeof e.durationSec === 'number' && <span>{Math.round(e.durationSec / 60)}min</span>}
        </div>
      </div>

      <button
        title="المزيد"
        className="grid h-8 w-8 place-items-center rounded-full text-gray-400 hover:bg-white/10"
      >
        ⋯
      </button>
    </div>
  );
}
