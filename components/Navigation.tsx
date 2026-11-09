'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight, Phone, MoveUpRight } from 'lucide-react';
import { LogoLockup } from './Logo';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/properties', label: 'Properties' },
  { href: '/contact', label: 'Contact' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <div className="hidden border-b border-[#e5edf8] bg-[#f4f9ff] lg:block">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-12 py-2 text-[10px] font-semibold uppercase tracking-[.16em] text-[#5f7ea8]">
          <span>No 75 Chime Avenue, New Heaven, Enugu <span className="mx-3 text-[#1d72cf]">/</span> Estate Surveyors &amp; Valuers</span>
          <a href="tel:08133988976" className="inline-flex items-center gap-2 transition hover:text-[#075bc4]"><Phone size={12} /> 0813 398 8976</a>
          <span>Idoko Chinelo Ifeyinwa — Principal Valuer</span>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-[#e0eaf6] bg-white/95 supports-[backdrop-filter]:bg-white/95">
        <nav aria-label="Main navigation" className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:px-12 lg:py-3.5">
          <Link href="/" aria-label="Idoko C Idoko Consulting home" className="shrink-0 focus-visible:outline-2 focus-visible:outline-[#1168c9]"><LogoLockup showNiesv={false} className="origin-left scale-[.85] sm:scale-100" /></Link>
          <div className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} aria-current={pathname === item.href ? 'page' : undefined}
                className={`relative py-3 text-[12px] font-bold uppercase tracking-[.1em] transition-colors ${pathname === item.href ? 'text-[#0960c5]' : 'text-[#5b7191] hover:text-[#0959bc]'}`}>
                {item.label}{pathname === item.href && <span className="absolute bottom-1 left-0 h-[2px] w-full bg-[#126fd0]" />}
              </Link>
            ))}
          </div>
          <Link href="/request-valuation" className="group hidden min-h-11 items-center gap-4 bg-[#095bc2] px-5 text-[12px] font-bold text-white transition hover:bg-[#073b85] lg:inline-flex">Request valuation <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>
          <button type="button" className="ml-auto grid h-11 w-11 place-items-center border border-[#d3e2f5] text-[#0a3474] lg:hidden" aria-label="Open navigation" aria-expanded={open} onClick={() => setOpen(true)}><Menu size={23} /></button>
        </nav>
      </header>
      {open && (
        <div className="fixed inset-0 z-[90] lg:hidden">
          <button type="button" className="absolute inset-0 bg-[#082b5d]/75" aria-label="Close navigation" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 right-0 flex w-[min(90vw,390px)] flex-col overflow-y-auto bg-white p-6 shadow-2xl" aria-label="Mobile navigation">
            <div className="flex items-center justify-between gap-3"><LogoLockup className="scale-[.8] origin-left" /><button type="button" aria-label="Close navigation" onClick={() => setOpen(false)} className="grid h-11 w-11 shrink-0 place-items-center border border-[#dae6f6] text-[#0a3571]"><X size={21} /></button></div>
            <p className="signature-label mb-5 mt-12">Explore the firm</p>
            <div className="flex flex-col border-t border-[#deebf8]">
              {NAV.map((item, index) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={`flex items-center justify-between border-b border-[#deebf8] py-5 font-display text-3xl ${pathname === item.href ? 'text-[#1471cf]' : 'text-[#0b2f67]'}`}><span>{item.label}</span><span className="font-sans text-xs text-[#80a0c6]">0{index + 1}</span></Link>
              ))}
            </div>
            <div className="mt-auto space-y-3 pt-10"><Link href="/request-valuation" onClick={() => setOpen(false)} className="flex items-center justify-between bg-[#095bc2] px-5 py-4 text-sm font-semibold text-white">Request a valuation <MoveUpRight size={18} /></Link><a href="tel:08133988976" className="flex items-center justify-center gap-2 py-4 text-sm font-semibold text-[#0e5db6]"><Phone size={15} /> 0813 398 8976</a></div>
          </aside>
        </div>
      )}
    </>
  );
}
