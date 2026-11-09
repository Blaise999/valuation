import Image from 'next/image';
import Link from 'next/link';
import { LogoLockup } from './Logo';
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';

const SERVICES = [
  ['Valuation', '/services/valuation'],
  ['Property Management', '/services/property-management'],
  ['Facility Management', '/services/facility-management'],
  ['Feasibility Studies', '/services/feasibility-studies'],
  ['Agency', '/services/agency'],
  ['Investment Consulting', '/services/investment-consulting'],
];

const COMPANY = [
  ['About Us', '/about'],
  ['Properties', '/properties'],
  ['Request Valuation', '/request-valuation'],
  ['Book a Consultation', '/book-consultation'],
  ['Contact', '/contact'],
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-950 text-brand-100">
      <div className="absolute inset-0 bg-grid-dark opacity-40" />

      <div className="relative mx-auto max-w-7xl border-b border-white/15 px-6 pb-10 pt-16 lg:pb-14 lg:pt-20">
        <p className="text-[11px] font-semibold uppercase tracking-[.24em] text-[#a9d5ff]">Idoko C Idoko Consulting / Enugu, Nigeria</p>
        <div className="mt-5 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-3xl font-display text-4xl font-medium leading-tight text-white sm:text-5xl">Make your next property decision <em className="text-[#a9d5ff]">a confident one.</em></h2>
          <Link href="/request-valuation" className="inline-flex shrink-0 items-center justify-center gap-2 self-start border border-[#a9d5ff] px-6 py-4 text-sm font-semibold text-[#c2ddff] transition hover:bg-[#a9d5ff] hover:text-brand-950">Start a conversation <ArrowUpRight size={16} /></Link>
        </div>
      </div>
      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <LogoLockup variant="light" />
            <p className="mt-6 max-w-md text-sm leading-relaxed text-brand-100/70">
              Estate Surveyors & Valuers · Property Managers · Facility Managers · Agency.
              Trusted advisory across valuation, property management, feasibility, and real estate investment in Nigeria.
            </p>

            <div className="mt-8 space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/5 ring-1 ring-white/10">
                  <MapPin size={14} />
                </span>
                <div className="text-brand-100/80">
                  No 75 Chime Avenue, New Heaven<br />
                  Opp Mr Biggs bus stop, Enugu
                </div>
              </div>
              <a href="tel:08133988976" className="flex items-center gap-3 text-brand-100/80 transition hover:text-white">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/5 ring-1 ring-white/10">
                  <Phone size={14} />
                </span>
                0813 398 8976
              </a>
              <a href="mailto:info@idokoconsulting.com" className="flex items-center gap-3 text-brand-100/80 transition hover:text-white">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/5 ring-1 ring-white/10">
                  <Mail size={14} />
                </span>
                info@idokoconsulting.com
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">Services</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {SERVICES.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="group inline-flex items-center gap-1 text-brand-100/80 transition hover:text-white">
                    {label}
                    <ArrowUpRight size={12} className="opacity-0 transition group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">Company</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {COMPANY.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-brand-100/80 transition hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="mt-9 text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">Reach us</h4>
            <ul className="mt-5 space-y-2 text-sm text-brand-100/80">
              <li>
                <a href="https://wa.me/2348133988976" target="_blank" rel="noreferrer" className="transition hover:text-white">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="tel:08133988976" className="transition hover:text-white">
                  Call us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-10 sm:flex-row">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 shrink-0 rounded-xl bg-white p-2 shadow-sm">
              <Image
                src="/niesv-logo.png"
                alt="Nigerian Institution of Estate Surveyors and Valuers (NIESV)"
                fill
                sizes="64px"
                className="object-contain p-1"
              />
            </div>
            <div className="relative h-16 w-16 shrink-0 rounded-xl bg-white p-2 shadow-sm">
              <Image
                src="/esvarbon-logo.png"
                alt="Estate Surveyors and Valuers Registration Board of Nigeria (ESVARBON)"
                fill
                sizes="64px"
                className="object-contain p-1"
              />
            </div>
            <p className="max-w-xs text-xs leading-relaxed text-brand-100/60">
              Registered with the Nigerian Institution of Estate Surveyors and Valuers and the Estate Surveyors and Valuers Registration Board of Nigeria.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-brand-100/60 md:flex-row md:items-center">
          <div>
            © {new Date().getFullYear()} Idoko C Idoko Consulting. All rights reserved.
          </div>
          <div className="flex items-center gap-5">
            <span>Idoko Chinelo Ifeyinwa — Principal Valuer</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
