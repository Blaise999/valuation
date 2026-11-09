import Link from 'next/link';
import { ArrowRight, ArrowDown, ShieldCheck, Building2, Award } from 'lucide-react';
import CinematicBackdrop from './CinematicBackdrop';

/** The homepage video is the only change in imagery; all other original photographs remain in place. */
export default function Hero() {
  return (
    <section aria-labelledby="home-hero-heading" className="relative isolate overflow-hidden bg-[#082a61] text-white">
      <div className="hero-stage relative flex items-center">
        <CinematicBackdrop />
        <div className="pointer-events-none absolute inset-5 hidden border border-white/15 lg:block" aria-hidden="true" />
        <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col justify-center px-6 pb-28 pt-24 sm:px-10 lg:px-16 lg:pb-24 lg:pt-24">
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.18em] text-white/90 sm:text-xs">
            <span className="h-px w-10 shrink-0 bg-[#8ccaff]" /> Estate Surveyors &amp; Valuers · Property Management · Agency
          </div>
          <h1 id="home-hero-heading" className="mt-10 max-w-[1050px] font-display text-[clamp(3.6rem,8vw,8.6rem)] font-semibold leading-[.98] tracking-[-.055em] text-white">
            Asset Valuation,<br /><em className="font-normal text-[#b9ddff]">done right.</em>
          </h1>
          <p className="mt-8 max-w-[700px] border-l-2 border-[#75baff] pl-5 text-[15px] leading-7 text-white/95 sm:text-[18px] sm:leading-8">
            Accredited property valuations, property management, feasibility studies,
            and real estate advisory across Nigeria — backed by decades of professional
            practice and the highest professional standards.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/request-valuation" className="group inline-flex min-h-14 items-center justify-center gap-4 bg-white px-7 text-sm font-bold text-[#093474] transition hover:bg-[#dbeeff]">
              Request a Valuation <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/book-consultation" className="inline-flex min-h-14 items-center justify-center border border-white/65 bg-white/10 px-7 text-sm font-semibold text-white transition hover:bg-white/20">
              Book a Consultation
            </Link>
          </div>
          <div className="mt-12 grid max-w-[740px] grid-cols-3 gap-3 border-t border-white/30 pt-6 sm:gap-8">
            {[
              { icon: ShieldCheck, value: 'Reg.', label: 'Estate Surveyors & Valuers' },
              { icon: Building2, value: 'All', label: 'Property Types' },
              { icon: Award, value: '100%', label: 'Independent Reports' },
            ].map(({icon: Icon,value,label}) => (
              <div key={label} className="flex items-start gap-2 sm:gap-3">
                <Icon size={18} className="mt-1 hidden shrink-0 text-[#acd7ff] sm:block" />
                <div><p className="font-display text-[22px] font-bold leading-tight text-white sm:text-[27px]">{value}</p><p className="mt-1 text-[10px] leading-4 text-white/85 sm:text-xs">{label}</p></div>
              </div>
            ))}
          </div>
        </div>
        <a href="#services" className="absolute bottom-7 left-6 z-10 hidden items-center gap-3 text-[10px] font-semibold uppercase tracking-[.2em] text-white/80 transition hover:text-white lg:bottom-10 lg:left-16 lg:flex">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-white/60"><ArrowDown size={15} /></span> Explore our services
        </a>
      </div>
    </section>
  );
}
