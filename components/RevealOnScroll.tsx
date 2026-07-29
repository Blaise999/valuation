'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

export default function RevealOnScroll({
  children,
  delay = 0,
  y = 24,
  once = true,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  once?: boolean;
  /** Apply layout classes (like grid col-span) directly to the wrapping div. */
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return className ? <div className={className}>{children}</div> : <>{children}</>;
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
