'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, Phone } from 'lucide-react';
import { LogoLockup } from './Logo';
import { cn } from '@/lib/utils';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/properties', label: 'Properties' },
  { href: '/contact', label: 'Contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      {/* Top contact bar */}
      <div className="hidden bg-brand-950 text-white lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs">
          <div className="flex items-center gap-6">
            <span className="text-brand-100/70">No 75 Chime Avenue, New Heaven, Enugu</span>
            <a href="tel:08133988976" className="flex items-center gap-1.5 text-brand-100 transition hover:text-white">
              <Phone size={12} /> 0813 398 8976
            </a>
            <span className="text-brand-100/60">Estate Surveyors & Valuers</span>
          </div>
          <div className="text-brand-100/70">Idoko Chinelo Ifeyinwa — Principal Valuer</div>
        </div>
      </div>

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={cn(
          'sticky top-0 z-40 w-full border-b transition-all',
          scrolled
            ? 'border-ink-200 bg-white/85 backdrop-blur-xl'
            : 'border-transparent bg-white'
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:py-5">
          <Link href="/" className="focus-ring rounded-md">
            <LogoLockup showNiesv />
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative rounded-md px-4 py-2 text-sm font-medium transition',
                    active ? 'text-brand-700' : 'text-ink-700 hover:text-ink-900'
                  )}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="navUnderline"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brand-600"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <Link
              href="/book-consultation"
              className="rounded-full px-4 py-2 text-sm font-medium text-ink-800 transition hover:text-brand-700"
            >
              Book a Call
            </Link>
            <Link
              href="/request-valuation"
              className="group inline-flex items-center gap-1.5 rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800"
            >
              Request Valuation
              <ChevronRight size={14} className="transition group-hover:translate-x-0.5" />
            </Link>
          </div>

          <button
            className="grid h-10 w-10 place-items-center rounded-md text-ink-800 lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </nav>

        {/* Mobile drawer */}
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
                className="fixed inset-0 z-50 bg-ink-900/50 lg:hidden"
              />
              <motion.aside
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="fixed inset-y-0 right-0 z-[60] flex w-[86%] max-w-sm flex-col bg-white p-5 lg:hidden"
              >
                <div className="flex items-center justify-between">
                  <LogoLockup showNiesv />
                  <button
                    onClick={() => setOpen(false)}
                    className="grid h-10 w-10 place-items-center rounded-md text-ink-700"
                    aria-label="Close menu"
                  >
                    <X size={22} />
                  </button>
                </div>

                <div className="mt-8 flex flex-col gap-1">
                  {NAV.map((item, i) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          'flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium transition',
                          pathname === item.href
                            ? 'bg-brand-50 text-brand-800'
                            : 'text-ink-800 hover:bg-ink-50'
                        )}
                      >
                        {item.label}
                        <ChevronRight size={16} className="text-ink-400" />
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-auto space-y-2 border-t border-ink-100 pt-4">
                  <Link
                    href="/book-consultation"
                    className="block rounded-full border border-ink-200 px-5 py-2.5 text-center text-sm font-semibold text-ink-800"
                  >
                    Book a Consultation
                  </Link>
                  <Link
                    href="/request-valuation"
                    className="block rounded-full bg-brand-700 px-5 py-2.5 text-center text-sm font-semibold text-white"
                  >
                    Request Valuation
                  </Link>
                  <a
                    href="tel:08133988976"
                    className="flex items-center justify-center gap-1.5 pt-1 text-xs text-ink-600"
                  >
                    <Phone size={12} /> 0813 398 8976
                  </a>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
