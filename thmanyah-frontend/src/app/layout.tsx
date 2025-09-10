// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

/**
 * Fonts (next/font) — zero layout shift, auto preload.
 * We keep them as CSS variables and attach to <html />.
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * App-wide metadata.
 * - `title` supports a template automatically: `title.default` and `title.template`.
 * - Adjust description once you finalize copy.
 */
export const metadata: Metadata = {
  title: {
    default: "Thmanyah Search",
    template: "%s · Thmanyah",
  },
  description: "Search podcasts and episodes powered by Thmanyah.",
  // Add icons/OG later when ready:
  // icons: { icon: "/favicon.ico" },
  // openGraph: { ... },
};

/**
 * Root layout — keep it static/lightweight.
 * - Set lang/dir once for RTL support across the app.
 * - Provide a <main> landmark for accessibility.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="antialiased">
        <main id="content">{children}</main>
      </body>
    </html>
  );
}
