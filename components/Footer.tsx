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
      <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-brand-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-brand-500/15 blur-3xl" />

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

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-brand-100/60 md:flex-row md:items-center">
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
