'use client';
import { useSearch } from '@/features/search/hooks/UseSearch';
import RippleLoader from '@/components/UI/RippleLoader';
import Shell from '@/components/layout/Shell';
import TopBar from '@/components/layout/TopBar';
import PodcastCard from '@/features/search/components/PodcastCard';
import EmptyState from '@/components/UI/EmptyState';
import EpisodesSection from '@/features/search/components/EpisodesSection';

export default function SearchScreen({ initialQ }: { initialQ: string }) {
  const { q, setQ, data, loading, err } = useSearch(initialQ);

  return (
    <Shell>
      <TopBar value={q} onChange={setQ} />

      <main className="flex-1 px-8 py-8">
        {loading && (
          <div className="min-h-[70vh] grid place-items-center" aria-busy="true">
            <RippleLoader />
          </div>
        )}

        {!loading && (
          <>
            {!err && (!data || q.trim() === '') && <EmptyState />}

            {err && <div className="mt-8 text-red-400">خطأ: {err}</div>}

            {!err && data && data.podcasts.length === 0 && data.episodes.length === 0 && (
              <div className="mt-12 rounded-2xl bg-[#171a21] p-8 text-center text-gray-400">
                لا توجد نتائج لــ <span className="font-semibold text-gray-200">{data.term || '—'}</span>.
              </div>
            )}

            {data && (data.podcasts.length > 0 || data.episodes.length > 0) && (
              <>
                <h2 className="mt-2 mb-4 text-lg font-semibold">Top podcasts for {data.term || 'الكل'}</h2>
                <div className="h-scroll pt-3">
                  <div className="flex gap-4 pb-3">
                    {data.podcasts.map((p) => <PodcastCard key={p.id} p={p} />)}
                  </div>
                </div>

                <EpisodesSection
                  title={`Top episodes for ${data.term || 'الكل'}`}
                  episodes={data.episodes}
                />
              </>
            )}
          </>
        )}
      </main>
    </Shell>
  );
}
