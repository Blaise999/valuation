'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

/** Lightweight scroll reveal that preserves readable content if JavaScript is off. */
export default function RevealOnScroll({
  children, delay = 0, y = 24, once = true, className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  once?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    element.classList.add('reveal-pending');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          element.classList.remove('reveal-pending');
          element.classList.add('reveal-visible');
          if (once) observer.unobserve(element);
        } else if (!once) {
          element.classList.remove('reveal-visible');
          element.classList.add('reveal-pending');
        }
      });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0.05 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [once]);

  const style = { '--reveal-y': `${y}px`, '--reveal-delay': `${delay}s` } as CSSProperties;
  return <div ref={ref} className={className} style={style}>{children}</div>;
}
