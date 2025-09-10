// src/lib/format.ts

/** "Sep 10" style; returns "" if input is missing/invalid */
export function formatShortDate(
  iso?: string,
  locale?: string | string[]
): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(locale, { month: "short", day: "numeric" });
}

/** "2025-09-10" → e.g., "10/09/2025" based on locale */
export function formatFullDate(
  iso?: string,
  locale?: string | string[]
): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(locale);
}

/** 90s -> "2min", 45s -> "45s"; returns "" if missing */
export function formatDurationShort(seconds?: number): string {
  if (seconds == null || Number.isNaN(seconds)) return "";
  const m = Math.round(seconds / 60);
  return m > 0 ? `${m}min` : `${seconds}s`;
}

/** 3723s -> "1:02:03" (H:MM:SS) */
export function formatDurationHMS(seconds?: number): string {
  if (seconds == null || Number.isNaN(seconds)) return "";
  const s = Math.max(0, Math.floor(seconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const mm = m.toString().padStart(2, "0");
  const ss = sec.toString().padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${ss}` : `${m}:${ss}`;
}

/** 1500 -> "1.5K", 1200000 -> "1.2M" */
export function formatCountCompact(n?: number, locale = "en"): string {
  if (n == null || Number.isNaN(n)) return "";
  try {
    return new Intl.NumberFormat(locale, { notation: "compact" }).format(n);
  } catch {
    return `${n}`;
  }
}
