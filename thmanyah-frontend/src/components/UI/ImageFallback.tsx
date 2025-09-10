'use client';
import { useState } from 'react';

type Props = {
  src?: string;
  alt: string;
  className?: string;
  // optional: what to render when the image fails
  fallbackClassName?: string;
  rounded?: string; // e.g. 'rounded-xl'
};

const FALLBACK_BG = 'bg-[#0f1115]/40'; // subtle dark gray

export default function ImageFallback({
  src,
  alt,
  className = '',
  fallbackClassName = '',
  rounded = '',
}: Props) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return <div className={`${className} ${rounded} ${FALLBACK_BG} ${fallbackClassName}`} aria-label={alt} />;
  }

  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt={alt}
      className={`${className} ${rounded} object-cover`}
      onError={() => setError(true)}
      loading="lazy"
      referrerPolicy="no-referrer"
    />
  );
}
