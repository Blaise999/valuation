'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

type Connection = { saveData?: boolean; effectiveType?: string };

/**
 * One responsive muted video, never two simultaneous autoplay elements.
 * Real posters paint before React hydrates and remain visible on slow connections,
 * when autoplay fails, or when reduced-motion/data-saving preferences apply.
 */
export default function CinematicBackdrop() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [source, setSource] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const connection = (navigator as Navigator & { connection?: Connection }).connection;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      connection?.saveData || /^(slow-2g|2g)$/.test(connection?.effectiveType || '')) {
      return;
    }

    const chosen = window.matchMedia('(max-width: 767px)').matches
      ? '/media/idoko-hero-mobile.mp4'
      : '/media/idoko-hero-desktop.mp4';
    let cancelled = false;
    const activate = () => { if (!cancelled) setSource(chosen); };
    // The poster and primary page content get a chance to paint first.
    const timer = window.setTimeout(activate, 950);
    return () => { cancelled = true; window.clearTimeout(timer); };
  }, [enabled]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !source || !enabled) return;
    const play = () => {
      if (video.ended) return;
      if (document.visibilityState === 'visible') {
        void video.play().then(() => setVisible(true)).catch(() => setVisible(false));
      } else {
        video.pause();
      }
    };
    play();
    document.addEventListener('visibilitychange', play);
    return () => document.removeEventListener('visibilitychange', play);
  }, [source, enabled]);

  return (
    <>
      <picture className="absolute inset-0 block h-full w-full" aria-hidden="true">
        <source media="(max-width: 767px)" srcSet="/media/idoko-hero-mobile.webp" type="image/webp" />
        <img src="/media/idoko-hero-desktop.webp" alt="" fetchPriority="high" decoding="async" className="h-full w-full object-cover object-center" />
      </picture>
      {enabled && source && (
        <video
          ref={videoRef}
          src={source}
          muted
          playsInline
          autoPlay
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => { setVisible(true); setFinished(false); }}
          onEnded={() => setFinished(true)}
          onError={() => setVisible(false)}
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(3,23,61,.84)_0%,rgba(3,33,86,.52)_46%,rgba(4,33,77,.12)_100%)] max-md:bg-[linear-gradient(0deg,rgba(2,21,53,.88)_0%,rgba(6,41,90,.42)_60%,rgba(3,34,74,.13)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#071c40]/60 to-transparent" />
      {(source || !enabled) && <button type="button"
        onClick={() => {
          if (finished && videoRef.current) {
            videoRef.current.currentTime = 0;
            void videoRef.current.play().catch(() => setVisible(false));
            setFinished(false);
          } else {
            setEnabled((prev) => !prev);
            setVisible(false);
            if (enabled) setSource(null);
          }
        }}
        className="absolute bottom-6 right-6 z-20 flex min-h-10 items-center gap-2 border border-white/35 bg-[#062651]/55 px-3.5 text-[10px] font-semibold uppercase tracking-[.14em] text-white transition hover:bg-[#062651]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:bottom-8 md:right-10"
        aria-label={finished ? 'Replay background video' : enabled ? 'Stop background video' : 'Play background video'}>
        {enabled && !finished ? <Pause size={13} fill="currentColor" /> : <Play size={13} fill="currentColor" />}
        <span>{finished ? 'Replay film' : enabled ? 'Pause motion' : 'Play motion'}</span>
      </button>}
    </>
  );
}
