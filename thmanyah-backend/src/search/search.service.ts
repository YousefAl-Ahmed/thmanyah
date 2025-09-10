// src/search/search.service.ts
import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import type { SearchResponse, Podcast, Episode } from './types';
import { PrismaService } from '../prisma/prisma.service'; // ⬅️ NEW
import { Prisma } from '@prisma/client';

/** Minimal iTunes response typing (we only use a few fields) */
interface ITunesSearchResponse<T = unknown> {
  resultCount: number;
  results: T[];
}

interface ITunesPodcast {
  collectionId: number;
  collectionName?: string;
  artistName?: string;
  artworkUrl600?: string;
  artworkUrl100?: string;
}

interface ITunesEpisode {
  trackId: number;
  trackName?: string;
  collectionName?: string;
  artworkUrl100?: string;
  artworkUrl60?: string;
  releaseDate?: string;
  trackTimeMillis?: number;
}

function errorMessage(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}

const CACHE_TTL_MINUTES = 60 * 24; // 24h cache

@Injectable()
export class SearchService {
  constructor(
    private readonly http: HttpService,
    private readonly prisma: PrismaService, // ⬅️ NEW
  ) {}

  /** Call iTunes Search API with given params and return typed data */
  private async fetchItunes<T>(
    params: Record<string, string | number>,
  ): Promise<ITunesSearchResponse<T>> {
    const url = new URL('https://itunes.apple.com/search');
    for (const [k, v] of Object.entries(params)) {
      url.searchParams.set(k, String(v));
    }

    try {
      const res = await firstValueFrom(
        this.http.get<ITunesSearchResponse<T>>(url.toString(), {
          timeout: 8000,
        }),
      );
      // Ensure a safe fallback shape
      return res.data ?? { resultCount: 0, results: [] };
    } catch (e: unknown) {
      // Convert unknown to message safely; throw a clean 502 upstream error
      throw new HttpException(
        {
          ok: false,
          error: 'Upstream iTunes API failed',
          detail: errorMessage(e),
        },
        502,
      );
    }
  }

  /** Map iTunes podcast -> our Podcast */
  private normalizePodcast(r: ITunesPodcast): Podcast {
    return {
      id: String(r.collectionId),
      title: r.collectionName ?? '',
      author: r.artistName ?? '',
      artworkUrl: r.artworkUrl600 || r.artworkUrl100 || '',
    };
  }

  /** Map iTunes episode -> our Episode */
  private normalizeEpisode(r: ITunesEpisode): Episode {
    return {
      id: String(r.trackId),
      title: r.trackName ?? '',
      podcastTitle: r.collectionName ?? '',
      artworkUrl: r.artworkUrl100 || r.artworkUrl60 || '',
      publishedAt: r.releaseDate
        ? new Date(r.releaseDate).toISOString()
        : undefined,
      durationSec:
        typeof r.trackTimeMillis === 'number'
          ? Math.round(r.trackTimeMillis / 1000)
          : undefined,
    };
  }

  /** ---- Cache helpers (SQLite via Prisma) ---- */
  private isExpired(createdAt: Date): boolean {
    const ageMs = Date.now() - createdAt.getTime();
    return ageMs > CACHE_TTL_MINUTES * 60_000;
  }

  private async getCached(term: string) {
    return this.prisma.searchResult.findFirst({
      where: { term },
      orderBy: { createdAt: 'desc' },
    });
  }

  private async saveCache(term: string, result: SearchResponse) {
    await this.prisma.searchResult.create({
      data: {
        term,
        // Cast to JsonValue to satisfy Prisma types
        result: result as unknown as Prisma.InputJsonValue,
      },
    });
  }

  /** Core search that your controller calls */
  async search(term: string, limit = 20, offset = 0): Promise<SearchResponse> {
    const q = term.trim();
    const common = { term: q, limit, offset, country: 'sa' }; // adjust country if you like

    // 0) Try DB cache first
    const cached = await this.getCached(q);
    if (cached && !this.isExpired(cached.createdAt)) {
      return cached.result as unknown as SearchResponse;
    }

    // 1) Fetch podcasts
    const podcastsRes = await this.fetchItunes<ITunesPodcast>({
      ...common,
      media: 'podcast',
    });
    const podcasts = (podcastsRes.results ?? []).map((r) =>
      this.normalizePodcast(r),
    );

    // 2) Fetch episodes
    const episodesRes = await this.fetchItunes<ITunesEpisode>({
      ...common,
      entity: 'podcastEpisode',
    });
    const episodes = (episodesRes.results ?? []).map((r) =>
      this.normalizeEpisode(r),
    );

    // 3) hasMore heuristic
    const hasMore = podcasts.length === limit || episodes.length === limit;

    const response: SearchResponse = {
      term: q,
      podcasts,
      episodes,
      page: { limit, offset, hasMore },
    };

    // 4) Save normalized response into cache
    await this.saveCache(q, response);

    return response;
  }
}
