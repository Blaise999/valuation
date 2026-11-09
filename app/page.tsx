import Hero from '@/components/Hero';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowUpRight, ArrowRight, ArrowDownRight, Building2, KeyRound, BarChart3,
  Wrench, ChartNoAxesCombined, House, ShieldCheck, Ruler, ScanSearch,
  Compass, MoveUpRight, CornerDownRight, Asterisk, MoveRight,
} from 'lucide-react';

const SERVICES = [
  { n: '01', slug: 'valuation', name: 'Valuation for All Purposes', desc: 'Clear, defensible valuations for important financial and property decisions.', icon: Ruler },
  { n: '02', slug: 'property-management', name: 'Property Management', desc: 'Thoughtful oversight of tenancies, operations and long-term asset care.', icon: KeyRound },
  { n: '03', slug: 'financial-reporting', name: 'Financial Reporting', desc: 'Purpose-built property valuations and support for financial reporting.', icon: BarChart3 },
  { n: '04', slug: 'facility-management', name: 'Facility Management', desc: 'Coordinated maintenance and operational care for built environments.', icon: Wrench },
  { n: '05', slug: 'feasibility-studies', name: 'Feasibility & Viability', desc: 'Research-led perspectives on what a site or project can become.', icon: ChartNoAxesCombined },
  { n: '06', slug: 'agency', name: 'Sales & Lettings Agency', desc: 'Practical support connecting the right properties with the right people.', icon: House },
];

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />

        {/* SIGNATURE EXPERTISE GRID — no media dependencies or large animation libraries. */}
        <section id="expertise" className="relative overflow-hidden bg-white py-24 text-[#0a2758] lg:py-36">
          <div aria-hidden="true" className="pointer-events-none absolute -right-36 top-5 hidden select-none font-display text-[350px] font-bold leading-none tracking-[-.12em] text-[#f0f7ff] lg:block">ICI</div>
          <div className="relative mx-auto max-w-[1360px] px-6 lg:px-12">
            <div className="grid gap-10 border-b border-[#dce8f6] pb-14 lg:grid-cols-[1fr_1fr] lg:items-end">
              <div>
                <p className="signature-label"><span className="signature-dot" /> The thinking behind every decision</p>
                <h2 className="mt-7 max-w-2xl font-display text-[clamp(3.2rem,5.4vw,6.2rem)] font-medium leading-[1.02] tracking-[-.055em]">
                  Property, <em className="font-normal text-[#247de0]">understood.</em>
                </h2>
              </div>
              <div className="lg:pl-20">
                <p className="max-w-xl text-[17px] leading-8 text-[#5f7290]">Every property has a story, a purpose and a potential. We bring together professional judgement and on-the-ground understanding to help you see the whole picture.</p>
                <Link href="/about" className="mt-7 inline-flex items-center gap-4 border-b border-[#1769c6] pb-2 text-sm font-semibold text-[#1155a7] transition hover:gap-6">Discover our firm <ArrowUpRight size={17} /></Link>
              </div>
            </div>
            <div className="grid border-b border-l border-[#dce8f6] sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`} className="service-panel group relative flex min-h-[310px] flex-col justify-between overflow-hidden border-r border-t border-[#dce8f6] p-7 transition-colors duration-300 hover:bg-[#0952b9] sm:p-9">
                  <div className="relative z-10 flex items-center justify-between"><span className="font-display text-3xl italic text-[#a7c9ef] transition group-hover:text-white/50">{s.n}</span><span className="grid h-12 w-12 place-items-center border border-[#d3e4f8] text-[#1469c8] transition group-hover:rotate-[-6deg] group-hover:border-white/40 group-hover:text-white"><s.icon size={23} strokeWidth={1.35} /></span></div>
                  <div className="relative z-10 mt-12"><h3 className="max-w-[300px] font-display text-[clamp(1.75rem,2.2vw,2.35rem)] font-medium leading-[1.1] tracking-tight text-[#092756] transition group-hover:text-white">{s.name}</h3><p className="mt-4 max-w-sm text-[13px] leading-6 text-[#647894] transition group-hover:text-white/80">{s.desc}</p></div>
                  <ArrowUpRight className="absolute bottom-8 right-8 text-[#1767c6] opacity-0 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white group-hover:opacity-100" size={20} />
                </Link>
              ))}
            </div>
            <div className="flex flex-col justify-between gap-6 pt-9 sm:flex-row sm:items-center"><span className="text-xs font-medium uppercase tracking-[.17em] text-[#8295ae]">From first inspection to final direction</span><Link href="/services" className="inline-flex items-center gap-3 text-sm font-bold text-[#1260bb] transition hover:gap-5">View all expertise <MoveRight size={19} /></Link></div>
          </div>
        </section>

        {/* BRAND STATEMENT */}
        <div className="relative overflow-hidden border-y border-[#d4e6f9] bg-[#eaf4ff] py-7" aria-label="Our approach: insight, precision, possibility">
          <div className="mx-auto flex max-w-[1360px] flex-wrap items-center justify-center gap-x-11 gap-y-3 px-6 font-display text-[clamp(1.2rem,2.7vw,2.4rem)] font-medium tracking-[-.04em] text-[#155fc3]">
            <span>Insight.</span><Asterisk size={22} strokeWidth={1.2} /><span>Precision.</span><Asterisk size={22} strokeWidth={1.2} /><span>Possibility.</span>
          </div>
        </div>

        {/* ARCHITECTURAL PROPERTY EDIT — only one lazily loaded non-hero image. */}
        <section className="bg-[#f6faff] py-24 lg:py-36">
          <div className="mx-auto max-w-[1360px] px-6 lg:px-12">
            <div className="grid items-center gap-14 lg:grid-cols-[.86fr_1.14fr] lg:gap-20">
              <div className="order-2 lg:order-1">
                <p className="signature-label"><span className="signature-dot" /> The property collection / 02</p>
                <h2 className="mt-7 font-display text-[clamp(3.3rem,5.4vw,6.4rem)] font-medium leading-[1] tracking-[-.055em] text-[#0a2758]">Spaces for <em className="font-normal text-[#217bdc]">what&apos;s next.</em></h2>
                <p className="mt-7 max-w-md text-[16px] leading-8 text-[#617592]">Discover residential and commercial opportunities with a consultancy that understands how location, potential and value come together.</p>
                <Link href="/properties" className="group mt-10 inline-flex min-h-14 items-center gap-9 bg-[#0960c7] px-7 text-sm font-semibold text-white transition hover:bg-[#083e92]">Explore properties <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></Link>
                <div className="mt-14 flex flex-wrap gap-5 border-t border-[#c8dcf2] pt-5 text-[11px] font-bold uppercase tracking-[.16em] text-[#6b85a5]"><span>Residential</span><span className="text-[#2879d7]">/</span><span>Commercial</span><span className="text-[#2879d7]">/</span><span>Land</span></div>
              </div>
              <div className="relative order-1 lg:order-2">
                <div className="absolute -right-4 -top-5 h-[35%] w-[58%] border-r-2 border-t-2 border-[#89b6e9] lg:-right-7 lg:-top-7" aria-hidden="true" />
                <Link href="/properties" aria-label="Browse available properties" className="group relative block aspect-[4/4.3] overflow-hidden bg-[#dcecfb] sm:aspect-[5/4.1] lg:aspect-[4/4.4]">
                  <Image src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=78" fill alt="Contemporary residential architecture" sizes="(max-width: 1024px) 100vw, 56vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.035]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061f48]/65 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-7 right-7 flex items-end justify-between gap-4 text-white sm:bottom-10 sm:left-10 sm:right-10"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#c4e2ff]">Our property edit</p><p className="mt-2 font-display text-3xl leading-tight sm:text-4xl">Find your place.</p></div><span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/65 bg-white/15"><ArrowUpRight size={23} /></span></div>
                </Link>
                <div className="absolute -bottom-5 -left-5 hidden bg-[#0b5dc3] px-7 py-5 text-white sm:block"><span className="text-[10px] font-bold uppercase tracking-[.22em] text-[#cde5ff]">The search starts here</span><p className="mt-1 font-display text-lg">Curated with purpose.</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* BLUEPRINT STATEMENT */}
        <section className="relative overflow-hidden bg-[#063e94] py-24 text-white lg:py-36">
          <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
          <div className="pointer-events-none absolute -right-32 top-12 h-[540px] w-[540px] rounded-full border border-white/15 lg:right-[-80px]" aria-hidden="true" />
          <div className="pointer-events-none absolute -right-10 top-36 h-[300px] w-[300px] rounded-full border border-white/15" aria-hidden="true" />
          <div className="relative mx-auto max-w-[1360px] px-6 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-[1fr_.72fr] lg:items-end">
              <div><p className="text-[11px] font-bold uppercase tracking-[.24em] text-[#b8d9ff]">A clearer way forward / 03</p><h2 className="mt-8 max-w-[900px] font-display text-[clamp(3.4rem,6.3vw,7.1rem)] font-medium leading-[1] tracking-[-.055em]">Good decisions <em className="font-normal text-[#b6dbff]">begin with insight.</em></h2></div>
              <p className="max-w-md text-[17px] leading-8 text-[#d8eaff] lg:pb-3">We believe property advice should be thorough, understandable and genuinely useful — whether you&apos;re buying, managing, developing or valuing.</p>
            </div>
            <div className="mt-20 grid border-l border-t border-white/25 md:grid-cols-3">
              {[
                { n: '01', t: 'Listen with intent', d: 'Understand the property, the brief and the decision behind it.', icon: ScanSearch },
                { n: '02', t: 'Examine the detail', d: 'Consider relevant market evidence, physical context and professional methods.', icon: Ruler },
                { n: '03', t: 'Advise with clarity', d: 'Make the findings useful, the next steps understandable and the direction clear.', icon: Compass },
              ].map((item) => (
                <div key={item.n} className="flex min-h-72 flex-col justify-between border-b border-r border-white/25 p-8 lg:p-10"><div className="flex items-center justify-between"><span className="font-display text-5xl italic text-[#95caff]">{item.n}</span><item.icon size={24} strokeWidth={1.25} className="text-[#c6e4ff]" /></div><div><h3 className="font-display text-[27px] font-medium leading-tight">{item.t}</h3><p className="mt-3 max-w-xs text-sm leading-7 text-[#ccdef4]">{item.d}</p></div></div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY THE FIRM — deliberate whitespace and architectural geometry. */}
        <section className="overflow-hidden bg-white py-24 lg:py-36">
          <div className="mx-auto grid max-w-[1360px] gap-14 px-6 lg:grid-cols-[.85fr_1.15fr] lg:gap-24 lg:px-12">
            <div className="relative flex min-h-[380px] flex-col justify-between overflow-hidden bg-[#e6f2ff] p-9 lg:min-h-[560px] lg:p-12">
              <div className="blueprint-grid absolute inset-0 opacity-45" aria-hidden="true" />
              <div className="relative"><span className="font-display text-[11rem] font-semibold leading-none tracking-[-.12em] text-[#1457af]/10 sm:text-[15rem]">ICI.</span></div>
              <div className="relative"><div className="h-px w-24 bg-[#1f72d2]" /><p className="mt-7 max-w-sm font-display text-3xl font-medium leading-tight text-[#0b356f] sm:text-4xl">A different lens on every asset.</p><p className="mt-5 text-xs font-semibold uppercase tracking-[.18em] text-[#3e77ba]">Professional property insight · Nigeria</p></div>
              <ArrowDownRight size={46} strokeWidth={1} className="absolute right-8 top-8 text-[#2477d6]" />
            </div>
            <div className="flex flex-col justify-center">
              <p className="signature-label"><span className="signature-dot" /> The Idoko perspective / 04</p>
              <h2 className="mt-7 font-display text-[clamp(3.1rem,4.6vw,5.7rem)] font-medium leading-[1.04] tracking-[-.055em] text-[#08285b]">Built on trust.<br /><em className="font-normal text-[#2178d5]">Driven by expertise.</em></h2>
              <p className="mt-6 max-w-xl text-[16px] leading-8 text-[#657a96]">We combine professional practice with a straightforward approach to complex property questions. No unnecessary noise. Just the insight your next move deserves.</p>
              <div className="mt-9 space-y-0 border-t border-[#d6e5f6]">
                {[
                  { icon: ShieldCheck, t: 'Professional judgement', d: 'Methodical evaluations and carefully considered recommendations.' },
                  { icon: Building2, t: 'Property-led thinking', d: 'Practical understanding of real assets and the people behind them.' },
                  { icon: CornerDownRight, t: 'Clear next steps', d: 'Advice that moves beyond a report and helps you take action.' },
                ].map(({icon: Icon, t, d}) => (
                  <div key={t} className="flex gap-5 border-b border-[#d6e5f6] py-5"><span className="grid h-12 w-12 shrink-0 place-items-center bg-[#eaf4ff] text-[#1466c5]"><Icon size={23} strokeWidth={1.5} /></span><div><h3 className="font-display text-xl font-semibold text-[#0d3067]">{t}</h3><p className="mt-1 text-[13px] leading-6 text-[#6d809a]">{d}</p></div></div>
                ))}
              </div>
              <Link href="/about" className="mt-8 inline-flex items-center gap-3 text-sm font-bold text-[#1260bb] hover:gap-5">Get to know the firm <ArrowUpRight size={18} /></Link>
            </div>
          </div>
        </section>

        {/* FINAL CALL — an unmistakable blue + white brand expression. */}
        <section className="relative overflow-hidden border-t border-[#cfe2f7] bg-[#eaf4ff] py-24 lg:py-32">
          <div className="pointer-events-none absolute -bottom-24 -right-10 select-none font-display text-[270px] font-medium leading-none text-[#d5eaff] lg:text-[470px]" aria-hidden="true">01</div>
          <div className="relative mx-auto flex max-w-[1360px] flex-col items-start justify-between gap-10 px-6 lg:flex-row lg:items-end lg:px-12">
            <div><p className="signature-label"><span className="signature-dot" /> Let's move with confidence</p><h2 className="mt-7 max-w-[900px] font-display text-[clamp(3.3rem,5.9vw,7rem)] font-medium leading-[1.02] tracking-[-.055em] text-[#082b62]">Your next move <em className="font-normal text-[#1d77d5]">starts here.</em></h2><p className="mt-6 max-w-md text-base leading-8 text-[#5e7695]">Tell us what you need to know about your property. We&apos;ll help you find the right way forward.</p></div>
            <div className="flex flex-wrap gap-3 lg:pb-2"><Link href="/request-valuation" className="inline-flex min-h-14 items-center gap-5 bg-[#095bc1] px-7 text-sm font-bold text-white transition hover:bg-[#073c8c]">Request a valuation <ArrowUpRight size={18} /></Link><Link href="/book-consultation" className="inline-flex min-h-14 items-center gap-5 border border-[#0b64bd] bg-white px-7 text-sm font-bold text-[#0b58ac] transition hover:bg-[#d9ecff]">Book a consultation <ArrowRight size={18} /></Link></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
