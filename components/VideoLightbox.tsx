'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Play, X } from 'lucide-react';

export default function VideoLightbox({
  url, title, className = '', label = 'Watch video',
}: {
  url: string;
  title: string;
  className?: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const [playbackError, setPlaybackError] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  useEffect(() => {
    if (!open) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = oldOverflow; document.removeEventListener('keydown', onKey); };
  }, [open]);
  return (
    <>
      <button type="button" onClick={() => { setPlaybackError(false); setOpen(true); }} className={`inline-flex items-center gap-2 rounded-full border border-white/20 bg-brand-950/90 px-4 py-2.5 text-xs font-bold text-white shadow-lg backdrop-blur-sm transition hover:scale-[1.02] hover:bg-brand-800 ${className}`}>
        <Play size={13} fill="currentColor" /> {label}
      </button>
      {ready && open && createPortal(
        <div role="dialog" aria-modal="true" aria-label={`Video: ${title}`} className="fixed inset-0 z-[999999] flex items-center justify-center bg-[#061020]/95 p-4 text-white sm:p-8" onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
          <div className="w-full max-w-5xl">
            <div className="mb-4 flex items-center justify-between gap-4"><p className="truncate font-display text-lg font-bold">{title}</p><button type="button" onClick={() => setOpen(false)} aria-label="Close video" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/20"><X size={21} /></button></div>
            {/* Media is mounted only after the visitor clicks play; never fetched on page load. */}
            {playbackError ? (
              <div className="flex aspect-video flex-col items-center justify-center gap-3 rounded-2xl bg-black p-6 text-center text-sm">
                <p>Your browser cannot play this video's format.</p>
                <a href={url} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white px-4 py-2 font-semibold text-blue-900">Open original video</a>
              </div>
            ) : (
              <video src={url} controls autoPlay playsInline preload="none" onError={() => setPlaybackError(true)} className="aspect-video w-full rounded-2xl bg-black shadow-2xl" />
            )}
          </div>
        </div>, document.body,
      )}
    </>
  );
}
