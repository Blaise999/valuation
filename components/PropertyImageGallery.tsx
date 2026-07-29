'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Images,
  Maximize2,
} from 'lucide-react';

type PropertyImageGalleryProps = {
  images?: string[] | null;
  title: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  badge?: React.ReactNode;
};

export default function PropertyImageGallery({
  images,
  title,
  className = '',
  sizes = '(max-width: 768px) 100vw, 33vw',
  priority = false,
  badge,
}: PropertyImageGalleryProps) {
  const safeImages = useMemo(
    () => Array.from(new Set((images || []).filter(Boolean))),
    [images],
  );

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const hasImages = safeImages.length > 0;
  const hasMultiple = safeImages.length > 1;

  function nextImage() {
    if (!hasMultiple) return;
    setActive((prev) => (prev + 1) % safeImages.length);
  }

  function prevImage() {
    if (!hasMultiple) return;
    setActive((prev) => (prev - 1 + safeImages.length) % safeImages.length);
  }

  useEffect(() => {
    if (!open) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    }

    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open, hasMultiple, safeImages.length]);

  if (!hasImages) {
    return (
      <div
        className={`grid h-full w-full place-items-center bg-ink-100 text-sm text-ink-400 ${className}`}
      >
        No image
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setActive(0);
          setOpen(true);
        }}
        className={`group/image relative block h-full w-full overflow-hidden bg-ink-100 text-left ${className}`}
        aria-label={`View photos for ${title}`}
      >
        <Image
          src={safeImages[0]}
          alt={title}
          fill
          className="object-cover transition duration-700 group-hover/image:scale-105"
          sizes={sizes}
          priority={priority}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-black/5 opacity-80 transition group-hover/image:opacity-100" />

        {badge}

        {hasMultiple && (
          <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-black/65 px-3 py-1.5 text-[11px] font-semibold text-white shadow-lg backdrop-blur-md">
            <Images size={12} />
            {safeImages.length} photos
          </span>
        )}

        <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-ink-900 opacity-0 shadow-lg backdrop-blur transition group-hover/image:opacity-100">
          <Maximize2 size={12} />
          View gallery
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[999999] bg-black text-white">
          {/* soft background blur image */}
          <div className="absolute inset-0 opacity-25">
            <Image
              src={safeImages[active]}
              alt=""
              fill
              className="scale-110 object-cover blur-2xl"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-black/70" />
          </div>

          {/* top bar */}
          <div className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-4 py-4 sm:px-6">
            <div className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur-md ring-1 ring-white/10">
              {active + 1} / {safeImages.length}
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white shadow-lg backdrop-blur-md ring-1 ring-white/10 transition hover:bg-white/20"
              aria-label="Close gallery"
            >
              <X size={21} />
            </button>
          </div>

          {/* main image area */}
          <div className="relative z-10 flex h-full flex-col">
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-28 pt-20 sm:px-8 lg:px-16">
              <div className="relative h-full max-h-[72vh] w-full max-w-6xl overflow-hidden rounded-3xl bg-black/30 shadow-2xl ring-1 ring-white/10">
                <Image
                  src={safeImages[active]}
                  alt={`${title} photo ${active + 1}`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>

              {hasMultiple && (
                <>
                  <button
                    type="button"
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white shadow-lg backdrop-blur-md ring-1 ring-white/10 transition hover:bg-white/20 sm:left-6 sm:h-12 sm:w-12"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={25} />
                  </button>

                  <button
                    type="button"
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white shadow-lg backdrop-blur-md ring-1 ring-white/10 transition hover:bg-white/20 sm:right-6 sm:h-12 sm:w-12"
                    aria-label="Next image"
                  >
                    <ChevronRight size={25} />
                  </button>
                </>
              )}
            </div>

            {/* thumbnails */}
            {hasMultiple && (
              <div className="absolute bottom-0 left-0 right-0 z-30 border-t border-white/10 bg-black/75 px-4 py-4 backdrop-blur-xl">
                <div className="mx-auto flex max-w-6xl gap-3 overflow-x-auto pb-1 [scrollbar-width:thin]">
                  {safeImages.map((img, index) => (
                    <button
                      key={`${img}-${index}`}
                      type="button"
                      onClick={() => setActive(index)}
                      className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border transition sm:h-20 sm:w-28 ${
                        active === index
                          ? 'border-amber-300 opacity-100 shadow-lg shadow-amber-300/20'
                          : 'border-white/10 opacity-55 hover:opacity-100'
                      }`}
                      aria-label={`View image ${index + 1}`}
                    >
                      <Image
                        src={img}
                        alt={`${title} thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="112px"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}