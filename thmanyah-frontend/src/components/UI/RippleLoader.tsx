// components/RippleLoader.tsx
import React from 'react';

type CSSVarStyle = React.CSSProperties & {
  [key in `--${string}`]?: string | number;
};

function ringStyle(from: number, delay: number, color: string): CSSVarStyle {
  return {
    '--from': from,
    '--dur': '2.2s',
    animationDelay: `${delay}s`,
    borderColor: color,
  };
}

export default function RippleLoader() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="relative h-24 w-24">
        {/* A: biggest, starts first */}
        <span
          className="absolute inset-0 rounded-full border-2 animate-ripple-seq"
          style={ringStyle(0.45, 0, '#f472b6')}   /* pink-400 */
        />
        {/* B: second, starts inside A after delay */}
        <span
          className="absolute inset-0 rounded-full border-2 animate-ripple-seq"
          style={ringStyle(0.28, 0.35, '#a78bfa')} /* violet-400 */
        />
        {/* C: smallest, starts last inside B */}
        <span
          className="absolute inset-0 rounded-full border-2 animate-ripple-seq"
          style={ringStyle(0.14, 0.7, '#818cf8')}  /* indigo-400 */
        />
      </div>
    </div>
  );
}
