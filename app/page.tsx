import Hero from '@/components/Hero';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, Building2, Key, BarChart3, Cog, TrendingUp, Home as HomeIcon,
  Briefcase, Calendar, Quote, Check, ShieldCheck, Award, Users, MapPin, Star,
} from 'lucide-react';
import RevealOnScroll from '@/components/RevealOnScroll';
import { LogoMark } from '@/components/Logo';



const SERVICES = [
  { slug: 'valuation', name: 'Valuation for All Purposes', icon: Building2,
    desc: 'Sale, mortgage, insurance, taxation, probate, financial reporting, partnership and litigation.',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=75' },
  { slug: 'property-management', name: 'Property Management', icon: Key,
    desc: 'Tenant sourcing, rent collection, maintenance and lease admin for landlords.',
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=75' },
  { slug: 'financial-reporting', name: 'Financial Reporting', icon: BarChart3,
    desc: 'IFRS-compliant fair value assessments and audit support for institutions.',
    img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=75' },
  { slug: 'facility-management', name: 'Facility Management', icon: Cog,
    desc: 'Operational, technical and soft FM for commercial and residential facilities.',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=75' },
  { slug: 'feasibility-studies', name: 'Feasibility & Viability', icon: TrendingUp,
    desc: 'Market research, financial modelling and highest-and-best-use analysis.',
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=75' },
  { slug: 'agency', name: 'Agency Services', icon: HomeIcon,
    desc: 'Sales and lettings agency for residential, commercial and industrial property.',
    img: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=900&q=75' },
];

const PROPERTY_TYPES = [
  { src: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=75', label: 'Commercial Towers' },
  { src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=75', label: 'Residential Duplexes' },
  { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=75', label: 'Estate Blocks' },
  { src: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=900&q=75', label: 'Office Buildings' },
  { src: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=900&q=75', label: 'Family Homes' },
  { src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=75', label: 'Mixed-Use Developments' },
];

const TESTIMONIALS = [
  {
    name: 'Engr. E. Okeke',
    role: 'Director, Crestpoint Holdings',
    quote: 'Idoko Consulting handled the valuation of our entire commercial portfolio. The reports were precise, defensible and delivered ahead of schedule. They are now our go-to firm.',
    initials: 'EO',
    color: '#2557eb',
  },
  {
    name: 'Mrs. F. Nwankwo',
    role: 'Private Client',
    quote: 'I needed a probate valuation urgently. Within days I had a stamped, professional report that was accepted without question by my late husband\'s estate solicitors.',
    initials: 'FN',
    color: '#1e3568',
  },
  {
    name: 'M. Adekunle',
    role: 'CFO, Lagos Finance Group',
    quote: 'For our IFRS reporting we needed a valuer that understood fair value standards. Their work passed the audit with zero adjustments — that\'s a first for us.',
    initials: 'MA',
    color: '#5e96fa',
  },
];

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />

        {/* SERVICES — image cards */}
        <section id="services" className="relative py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <RevealOnScroll>
              <div className="mx-auto max-w-2xl text-center">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-700">What we do</span>
                <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
                  A complete real estate <span className="gradient-text">advisory practice</span>
                </h2>
                <p className="mt-5 text-base text-ink-600">
                  From single-property valuations to strategic portfolio advisory — we cover every chapter of the property lifecycle.
                </p>
              </div>
            </RevealOnScroll>

            <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((s, i) => (
                <RevealOnScroll key={s.slug} delay={(i % 3) * 0.06}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group relative block overflow-hidden rounded-3xl border border-ink-100 bg-white transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-900/10"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-ink-100">
                      <Image
                        src={s.img}
                        alt={s.name}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/10 to-transparent" />
                      <div className="absolute left-5 top-5 grid h-11 w-11 place-items-center rounded-xl bg-white/95 backdrop-blur ring-1 ring-white/40">
                        <s.icon size={20} className="text-brand-700" />
                      </div>
                    </div>
                    <div className="p-7">
                      <h3 className="font-display text-xl font-bold text-ink-900">{s.name}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-600">{s.desc}</p>
                      <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                        Learn more <ArrowRight size={14} className="transition group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* PROPERTY TYPES — what we value */}
        <section className="relative bg-ink-50/40 py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <RevealOnScroll>
              <div className="mb-12 grid items-end gap-8 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-700">What we value</span>
                  <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
                    Every kind of property — <span className="gradient-text">we&apos;ve valued it.</span>
                  </h2>
                </div>
                <div className="lg:col-span-5">
                  <p className="text-base text-ink-600">
                    From single family homes to commercial towers, from bare land to mixed-use estates — we apply the same disciplined methodology across every property type and purpose.
                  </p>
                </div>
              </div>
            </RevealOnScroll>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PROPERTY_TYPES.map((p, i) => (
                <RevealOnScroll key={p.label} delay={(i % 3) * 0.06}>
                  <div className={`group relative overflow-hidden rounded-3xl bg-white shadow-md ${
                    i === 0 ? 'sm:col-span-2 sm:row-span-1' : ''
                  }`}>
                    <div className={`relative ${i === 0 ? 'aspect-[2.4/1]' : 'aspect-[4/3]'} overflow-hidden`}>
                      <Image
                        src={p.src}
                        alt={p.label}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        <span className="rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-ink-900 backdrop-blur">
                          {p.label}
                        </span>
                        <span className="grid h-9 w-9 place-items-center rounded-full bg-white/20 text-white backdrop-blur ring-1 ring-white/30">
                          <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS — dark section */}
        <section className="relative overflow-hidden bg-brand-950 py-24 text-white lg:py-32">
          <div className="absolute inset-0 bg-grid-dark opacity-30" />
          <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-brand-500/30 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 bottom-20 h-80 w-80 rounded-full bg-brand-400/20 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-6">
            <RevealOnScroll>
              <div className="grid items-end gap-8 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-300">How it works</span>
                  <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
                    From request to report — <br />
                    <span className="text-brand-300">all online, all transparent.</span>
                  </h2>
                </div>
                <div className="lg:col-span-5">
                  <p className="text-base leading-relaxed text-brand-100/70">
                    Submit your request and documents, get a quotation, pay securely with Paystack, and receive your professional report — all tracked from one dashboard.
                  </p>
                </div>
              </div>
            </RevealOnScroll>

            <div className="mt-16 grid gap-4 lg:grid-cols-4">
              {[
                { n: '01', t: 'Submit Request', d: 'Fill in property details, upload documents and tell us what you need.' },
                { n: '02', t: 'Quotation Sent', d: 'Our team reviews and emails a quotation tailored to scope and complexity.' },
                { n: '03', t: 'Pay Securely', d: 'Pay via Paystack — cards, bank transfers and all major options supported.' },
                { n: '04', t: 'Report Delivered', d: 'Site inspection completed, report uploaded and emailed to you.' },
              ].map((step, i) => (
                <RevealOnScroll key={step.n} delay={i * 0.1}>
                  <div className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur transition hover:bg-white/10">
                    <div className="font-display text-5xl font-bold text-brand-300/40">{step.n}</div>
                    <h3 className="mt-4 font-display text-lg font-bold">{step.t}</h3>
                    <p className="mt-2 text-sm text-brand-100/70">{step.d}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>

            <RevealOnScroll>
              <div className="mt-12 flex flex-wrap gap-3">
                <Link href="/request-valuation" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-900 transition hover:bg-brand-50">
                  Start a Request <ArrowRight size={14} />
                </Link>
                <Link href="/services" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                  View All Services
                </Link>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* WHY US */}
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              <RevealOnScroll>
                <div className="relative">
                  {/* Logo backdrop */}
                  <div className="pointer-events-none absolute -left-6 -top-6 z-0 opacity-10">
                    <LogoMark size={180} />
                  </div>
                  <div className="relative z-10 grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div className="aspect-[3/4] overflow-hidden rounded-3xl bg-ink-100 shadow-xl">
                        <div className="relative h-full">
                          <Image
                            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=75"
                            alt="Site work"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 50vw, 220px"
                          />
                        </div>
                      </div>
                      <div className="aspect-square overflow-hidden rounded-3xl bg-ink-100 shadow-xl">
                        <div className="relative h-full">
                          <Image
                            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=600&q=75"
                            alt="Real estate documents"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 50vw, 220px"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4 pt-10">
                      <div className="aspect-square overflow-hidden rounded-3xl bg-ink-100 shadow-xl">
                        <div className="relative h-full">
                          <Image
                            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=75"
                            alt="Building exterior"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 50vw, 220px"
                          />
                        </div>
                      </div>
                      <div className="aspect-[3/4] overflow-hidden rounded-3xl bg-ink-100 shadow-xl">
                        <div className="relative h-full">
                          <Image
                            src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=600&q=75"
                            alt="Modern building"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 50vw, 220px"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>

              <div>
                <RevealOnScroll>
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-700">Why choose us</span>
                  <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
                    Decades of practice. <br />
                    <span className="gradient-text">Standards you can trust.</span>
                  </h2>
                </RevealOnScroll>

                <div className="mt-10 space-y-6">
                  {[
                    { icon: ShieldCheck, t: 'Professional Practice', d: 'A registered firm of Estate Surveyors and Valuers serving private and corporate clients.' },
                    { icon: Award, t: 'Court-Admissible Reports', d: 'Valuations accepted by banks, courts, insurance firms and the Federal Inland Revenue Service.' },
                    { icon: Users, t: 'Transparent, Fixed Quotation', d: 'Clear scope and fixed quotation before any work begins — no surprises.' },
                    { icon: Star, t: 'Secure Online Payments', d: 'Pay through Paystack with full receipt and audit trail in your dashboard.' },
                  ].map((b, i) => (
                    <RevealOnScroll key={b.t} delay={i * 0.07}>
                      <div className="flex gap-4">
                        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl gradient-brand text-white shadow-md shadow-brand-700/30">
                          <b.icon size={18} />
                        </div>
                        <div>
                          <div className="font-display text-base font-bold text-ink-900">{b.t}</div>
                          <div className="mt-1 text-sm text-ink-600">{b.d}</div>
                        </div>
                      </div>
                    </RevealOnScroll>
                  ))}
                </div>

                <RevealOnScroll>
                  <Link href="/about" className="mt-10 inline-flex items-center gap-2 rounded-full bg-brand-700 px-6 py-3 text-sm font-semibold text-white">
                    Meet the Team <ArrowRight size={14} />
                  </Link>
                </RevealOnScroll>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="bg-ink-50/40 py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <RevealOnScroll>
              <div className="mx-auto max-w-2xl text-center">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-700">Client voices</span>
                <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
                  Trusted by <span className="gradient-text">private and corporate clients.</span>
                </h2>
              </div>
            </RevealOnScroll>

            <div className="mt-16 grid gap-5 lg:grid-cols-3">
              {TESTIMONIALS.map((t, i) => (
                <RevealOnScroll key={t.name} delay={i * 0.08}>
                  <div className="flex h-full flex-col rounded-3xl bg-white p-7 ring-1 ring-ink-100">
                    <Quote size={28} className="text-brand-300" />
                    <p className="mt-5 flex-1 text-sm leading-relaxed text-ink-700">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="mt-7 flex items-center gap-3 border-t border-ink-100 pt-5">
                      <div style={{ background: t.color }} className="grid h-10 w-10 place-items-center rounded-full text-xs font-bold text-white">
                        {t.initials}
                      </div>
                      <div>
                        <div className="font-display text-sm font-bold text-ink-900">{t.name}</div>
                        <div className="text-xs text-ink-500">{t.role}</div>
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden py-24 lg:py-28">
          <div className="absolute inset-0 gradient-brand" />
          <div className="absolute inset-0 bg-grid-dark opacity-30" />
          <div className="pointer-events-none absolute -right-40 -top-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-amber-200/15 blur-3xl" />

          <div className="relative mx-auto max-w-5xl px-6 text-center text-white">
            <RevealOnScroll>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-medium backdrop-blur">
                <span className="grid h-1.5 w-1.5 place-items-center rounded-full bg-emerald-400" />
                Now accepting new requests
              </div>
              <h2 className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Ready to value your property?
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base text-brand-100">
                Submit your request in under 5 minutes. Our team will review and get back to you with a tailored quotation within 24 hours.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Link href="/request-valuation" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-brand-900 transition hover:bg-brand-50">
                  Request a Valuation <ArrowRight size={14} />
                </Link>
                <Link href="/book-consultation" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20">
                  <Calendar size={14} /> Book a Consultation
                </Link>
              </div>
            </RevealOnScroll>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
