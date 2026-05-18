'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Images } from 'lucide-react';

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
  const safeImages = images?.filter(Boolean) || [];
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const hasImages = safeImages.length > 0;
  const hasMultiple = safeImages.length > 1;

  function nextImage() {
    setActive((prev) => (prev + 1) % safeImages.length);
  }

  function prevImage() {
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
  }, [open, safeImages.length]);

  if (!hasImages) {
    return (
      <div className={`grid h-full place-items-center bg-ink-100 text-ink-400 ${className}`}>
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

        <div className="absolute inset-0 bg-black/0 transition group-hover/image:bg-black/10" />

        {badge}

        {hasMultiple && (
          <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-ink-900/75 px-3 py-1.5 text-[11px] font-semibold text-white shadow-lg backdrop-blur">
            <Images size={12} />
            {safeImages.length} photos
          </span>
        )}

        <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-ink-900 opacity-0 shadow-lg backdrop-blur transition group-hover/image:opacity-100">
          Tap to view
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[999] bg-ink-950/95 text-white">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
            aria-label="Close gallery"
          >
            <X size={20} />
          </button>

          <div className="absolute left-4 top-4 z-20 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur">
            {active + 1} / {safeImages.length}
          </div>

          <div className="flex h-full flex-col">
            <div className="relative min-h-0 flex-1">
              <Image
                src={safeImages[active]}
                alt={`${title} photo ${active + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />

              {hasMultiple && (
                <>
                  <button
                    type="button"
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>

                  <button
                    type="button"
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            {hasMultiple && (
              <div className="border-t border-white/10 bg-black/30 px-4 py-4 backdrop-blur">
                <div className="mx-auto flex max-w-5xl gap-3 overflow-x-auto pb-1">
                  {safeImages.map((img, index) => (
                    <button
                      key={`${img}-${index}`}
                      type="button"
                      onClick={() => setActive(index)}
                      className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-2xl border transition ${
                        active === index
                          ? 'border-amber-300 opacity-100'
                          : 'border-white/10 opacity-60 hover:opacity-100'
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