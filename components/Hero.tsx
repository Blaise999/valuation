'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Building2,
  TrendingUp,
  Sparkles,
  Star,
  Users,
} from 'lucide-react';
import { LogoMark } from './Logo';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Parallax transforms — different speeds per image for depth
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-white pt-8">
      {/* Background — animated grid + drifting gradients */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      <motion.div
        className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-brand-200/40 blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-40 top-32 h-[560px] w-[560px] rounded-full bg-brand-300/30 blur-3xl"
        animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-amber-200/30 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div style={{ opacity }} className="relative mx-auto max-w-7xl px-6 pb-16 pt-12 lg:pb-24 lg:pt-16">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10"
        >
          {/* LEFT — copy */}
          <div className="lg:col-span-7">
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/60 px-3 py-1.5 text-xs font-medium text-brand-800 backdrop-blur-sm"
            >
              <span className="grid h-4 w-4 place-items-center rounded-full bg-brand-700 text-white">
                <Sparkles size={10} />
              </span>
              Estate Surveyors &amp; Valuers · Property Management · Agency
            </motion.div>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="mt-6 font-display text-[42px] font-bold leading-[1.04] tracking-tight text-ink-900 sm:text-[58px] lg:text-[72px]"
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="block"
              >
                Property valuation,
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="block"
              >
                <span className="relative inline-block">
                  <span className="gradient-text">done right.</span>
                  <motion.svg
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.9, ease: 'easeOut' }}
                    viewBox="0 0 240 14"
                    className="absolute -bottom-2 left-0 h-3 w-full"
                    fill="none"
                  >
                    <motion.path
                      d="M2 9 Q 60 2, 120 7 T 238 6"
                      stroke="#2557eb"
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 1.2, duration: 0.9 }}
                    />
                  </motion.svg>
                </span>
              </motion.span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="mt-7 max-w-xl text-base leading-relaxed text-ink-600 sm:text-lg"
            >
              Accredited property valuations, property management, feasibility studies,
              and real estate advisory across Nigeria — backed by decades of professional
              practice and the highest professional standards.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="mt-10 flex flex-col gap-3 sm:flex-row"
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/request-valuation"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-700 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-700/30 transition hover:bg-brand-800 hover:shadow-brand-800/40 sm:w-auto"
                >
                  Request a Valuation
                  <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/book-consultation"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink-200 bg-white px-7 py-3.5 text-sm font-semibold text-ink-800 transition hover:border-ink-300 hover:bg-ink-50 sm:w-auto"
                >
                  Book a Consultation
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="mt-12 grid grid-cols-3 gap-4 sm:gap-8"
            >
              {[
                { icon: ShieldCheck, value: 'Reg.', label: 'Estate Surveyors & Valuers' },
                { icon: Building2, value: 'All', label: 'Property Types' },
                { icon: Award, value: '100%', label: 'Independent Reports' },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-50 ring-1 ring-brand-100">
                    <s.icon size={16} className="text-brand-700" />
                  </div>
                  <div>
                    <div className="font-display text-xl font-bold text-ink-900">{s.value}</div>
                    <div className="text-[11px] text-ink-500">{s.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — IMAGE COLLAGE */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto h-[520px] w-full max-w-[500px] sm:h-[600px]">
              {/* MAIN building image with parallax */}
              <motion.div
                style={{ y: y1 }}
                initial={{ opacity: 0, scale: 0.92, rotate: -3 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="absolute right-0 top-0 h-[400px] w-[300px] overflow-hidden rounded-[28px] bg-ink-100 shadow-2xl shadow-brand-900/25 ring-4 ring-white sm:h-[460px] sm:w-[340px]"
              >
                <Image
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=75"
                  alt="Modern building exterior"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 300px, 340px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/50 via-transparent to-transparent" />
                {/* Inner badge */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl bg-white/95 px-4 py-3 backdrop-blur">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-brand-700">Recent Valuation</div>
                    <div className="font-display text-sm font-bold text-ink-900">Commercial Tower, Enugu</div>
                  </div>
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                    <Star size={14} fill="currentColor" />
                  </div>
                </div>
              </motion.div>

              {/* Secondary image — keys */}
              <motion.div
                style={{ y: y2 }}
                initial={{ opacity: 0, scale: 0.85, rotate: 6 }}
                animate={{ opacity: 1, scale: 1, rotate: -4 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
                className="absolute bottom-8 left-0 h-[230px] w-[230px] overflow-hidden rounded-[24px] bg-ink-100 shadow-2xl shadow-brand-900/25 ring-4 ring-white sm:h-[280px] sm:w-[280px]"
              >
                <Image
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=700&q=75"
                  alt="Property keys"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 230px, 280px"
                />
              </motion.div>

              {/* Third image — floor plan */}
              <motion.div
                style={{ y: y3 }}
                initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
                animate={{ opacity: 1, scale: 1, rotate: 5 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
                className="absolute -bottom-4 right-8 h-[160px] w-[160px] overflow-hidden rounded-2xl bg-ink-100 shadow-xl shadow-brand-900/20 ring-4 ring-white sm:h-[200px] sm:w-[200px]"
              >
                <Image
                  src="https://images.unsplash.com/photo-1577415124269-fc1140a69e91?auto=format&fit=crop&w=400&q=75"
                  alt="Architectural plan"
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </motion.div>

              {/* Floating stat card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1, duration: 0.7, type: 'spring', damping: 18 }}
                className="absolute -left-3 top-16 flex items-center gap-3 rounded-2xl bg-white p-3 shadow-xl shadow-brand-900/15 ring-1 ring-ink-100"
              >
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="grid h-10 w-10 place-items-center rounded-xl gradient-brand text-white"
                >
                  <TrendingUp size={18} />
                </motion.div>
                <div>
                  <div className="font-display text-sm font-bold text-ink-900">Mortgage</div>
                  <div className="text-[10px] text-ink-500">Valuation in 5 days</div>
                </div>
              </motion.div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3, type: 'spring', damping: 12 }}
                className="absolute right-2 top-[180px] flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2.5 text-white shadow-xl"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-400 text-[11px] font-bold text-ink-900">✓</span>
                <span className="text-xs font-semibold">Paystack Secured</span>
              </motion.div>

              {/* Logo mark — floating */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, type: 'spring', damping: 14 }}
                whileHover={{ rotate: 6, scale: 1.05 }}
                className="absolute -right-4 -top-4 grid h-20 w-20 place-items-center rounded-full bg-white p-3 shadow-xl ring-4 ring-brand-100"
              >
                <LogoMark size={56} />
              </motion.div>

              {/* Reviews mini-card */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6, duration: 0.6 }}
                className="absolute -bottom-2 -left-2 flex items-center gap-3 rounded-2xl bg-white p-3 shadow-xl ring-1 ring-ink-100"
              >
                <div className="flex -space-x-2">
                  {['#2557eb', '#1e3568', '#5e96fa'].map((c, i) => (
                    <div key={i} style={{ background: c }} className="grid h-7 w-7 place-items-center rounded-full text-[10px] font-bold text-white ring-2 ring-white">
                      {['EO', 'MA', 'CN'][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={10} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="text-[10px] text-ink-500">Trusted by clients</div>
                </div>
              </motion.div>

              {/* Decorative spinning ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
                className="pointer-events-none absolute -right-12 -top-12 -z-0 h-32 w-32 rounded-full border-2 border-dashed border-brand-300/60"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
                className="pointer-events-none absolute -left-10 bottom-0 -z-0 h-24 w-24 rounded-full border-2 border-dashed border-amber-300/50"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="relative mt-4 overflow-hidden border-y border-ink-100 py-4"
      >
        <div className="flex items-center whitespace-nowrap">
          <div className="animate-marquee flex shrink-0 items-center gap-8 pr-8 text-xs font-medium uppercase tracking-[0.2em] text-ink-500">
            {[
              'Valuation for All Purposes', 'Property Management', 'Financial Reporting',
              'Facility Management', 'Feasibility & Viability', 'Agency', 'Investment Consulting',
              'Valuation for All Purposes', 'Property Management', 'Financial Reporting',
              'Facility Management', 'Feasibility & Viability', 'Agency', 'Investment Consulting',
            ].map((s, i) => (
              <span key={i} className="flex items-center gap-8">
                <span>{s}</span>
                <span className="h-1 w-1 rounded-full bg-ink-300" />
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
