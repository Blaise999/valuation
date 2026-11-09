import Link from 'next/link';
import { ArrowDown, ArrowUpRight, MoveUpRight, Compass } from 'lucide-react';
import CinematicBackdrop from './CinematicBackdrop';

/** Video-first, poster-backed hero. The only moving media on the home page. */
export default function Hero() {
  return (
    <section aria-labelledby="home-hero-heading" className="relative isolate overflow-hidden bg-[#082a61] text-white">
      <div className="hero-stage relative flex items-center">
        <CinematicBackdrop />
        <div className="pointer-events-none absolute inset-5 hidden border border-white/15 lg:block" aria-hidden="true" />
        <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col justify-center px-6 pb-32 pt-28 sm:px-10 lg:px-16 lg:pb-28 lg:pt-24">
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.24em] text-white/90 sm:text-xs">
            <span className="h-px w-10 bg-[#78baff]" /> Property intelligence / Enugu, Nigeria
          </div>
          <h1 id="home-hero-heading" className="mt-9 max-w-[950px] font-display text-[clamp(3.8rem,7.7vw,8.4rem)] font-semibold leading-[.98] tracking-[-.055em] text-white">
            Beyond the<br />
            <span className="italic font-normal text-[#b9ddff]">address.</span>
            <span className="mt-2 block text-[.53em] font-medium leading-[1.1] tracking-[-.035em]">Into the value.</span>
          </h1>
          <p className="mt-8 max-w-xl border-l-2 border-[#75baff] pl-5 text-[15px] leading-7 text-white/90 sm:text-[17px] sm:leading-8">
            Precise valuations, thoughtful property advisory and the local expertise to make your next move a confident one.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/request-valuation" className="group inline-flex min-h-14 items-center justify-center gap-5 bg-white px-7 text-sm font-bold text-[#093474] transition hover:bg-[#dbeeff]">
              Request a valuation <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link href="/properties" className="group inline-flex min-h-14 items-center justify-center gap-5 border border-white/70 bg-white/10 px-7 text-sm font-semibold text-white transition hover:bg-white/20">
              Explore properties <MoveUpRight size={17} />
            </Link>
          </div>
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute right-[7%] top-[20%] hidden h-44 w-44 items-center justify-center rounded-full border border-white/35 lg:flex">
          <div className="flex h-[132px] w-[132px] items-center justify-center rounded-full border border-dashed border-white/30"><Compass size={45} strokeWidth={1} className="text-white/80" /></div>
        </div>
        <a href="#expertise" className="absolute bottom-7 left-6 z-10 hidden items-center gap-3 text-[10px] font-semibold uppercase tracking-[.25em] text-white/80 transition hover:text-white sm:left-10 lg:bottom-12 lg:left-16 lg:flex">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-white/60"><ArrowDown size={15} /></span>
          Scroll to discover
        </a>
      </div>
      <div className="relative z-10 bg-white text-[#102e5f]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-px border-b border-[#dce9f7] bg-[#dce9f7] px-0 sm:grid-cols-3 sm:px-8 lg:px-14">
          {[
            ['01', 'Valuation & advisory', 'Independent perspective'],
            ['02', 'Property management', 'Care for every asset'],
            ['03', 'Sales & agency', 'Opportunities worth exploring'],
          ].map(([number, name, description]) => (
            <div key={number} className="flex items-center gap-5 bg-white px-7 py-5 sm:px-5 lg:px-7 lg:py-7">
              <span className="font-display text-4xl font-normal italic text-[#267bd3]">{number}</span>
              <div><p className="text-[13px] font-bold uppercase tracking-[.04em]">{name}</p><p className="mt-1 text-xs text-[#7285a0]">{description}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
