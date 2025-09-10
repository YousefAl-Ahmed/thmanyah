export type MediaKind = 'podcast' | 'episode';

export interface Podcast {
  id: string;
  title: string;
  author: string;
  artworkUrl: string;
}

export interface Episode {
  id: string;
  title: string;
  podcastTitle: string;
  artworkUrl: string;
  publishedAt?: string;  // ISO date
  durationSec?: number;
}

export interface SearchResponse {
  term: string;
  podcasts: Podcast[];
  episodes: Episode[];
  page: { limit: number; offset: number; hasMore: boolean };
}
