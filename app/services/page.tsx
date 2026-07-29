import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import RevealOnScroll from '@/components/RevealOnScroll';
import { ArrowRight, Building2, Key, BarChart3, Cog, TrendingUp, Home as HomeIcon, Briefcase, Calendar } from 'lucide-react';

export const metadata = { title: 'Services' };

const SERVICES = [
  { slug: 'valuation', name: 'Valuation for All Purposes', icon: Building2,
    short: 'Sale, mortgage, insurance, taxation, probate, financial reporting, partnership and litigation valuations.',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=75' },
  { slug: 'property-management', name: 'Property Management', icon: Key,
    short: 'Tenant sourcing, rent collection, maintenance, lease administration and reporting.',
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=75' },
  { slug: 'financial-reporting', name: 'Financial Reporting', icon: BarChart3,
    short: 'IFRS-compliant fair value assessment and audit support for corporate clients.',
    img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=75' },
  { slug: 'facility-management', name: 'Facility Management', icon: Cog,
    short: 'Maintenance, security, cleaning, energy and space planning for facilities.',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=75' },
  { slug: 'feasibility-studies', name: 'Feasibility & Viability Studies', icon: TrendingUp,
    short: 'Market research, financial modelling and risk assessment for real estate projects.',
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=75' },
  { slug: 'agency', name: 'Agency Services', icon: HomeIcon,
    short: 'Sales and lettings agency for residential, commercial and industrial property.',
    img: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=900&q=75' },
  { slug: 'investment-consulting', name: 'Investment & Development', icon: Briefcase,
    short: 'Strategic advisory across acquisition, development and disposal of property.',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=900&q=75' },
  { slug: 'consultation', name: 'Consultation Booking', icon: Calendar,
    short: 'A focused paid consultation with the Principal Valuer.',
    img: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=900&q=75' },
];

export default function ServicesPage() {
  return (
    <>
      <Navigation />
      <main>
        <section className="relative overflow-hidden bg-white pt-12">
          <div className="absolute inset-0 bg-grid opacity-50" />
          <div className="pointer-events-none absolute -left-40 -top-20 h-[480px] w-[480px] rounded-full bg-brand-200/40 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-24">
            <RevealOnScroll>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-700">Services</span>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h1 className="mt-3 max-w-4xl font-display text-5xl font-bold leading-[1.05] tracking-tight text-ink-900 sm:text-6xl">
                Eight specialisms.<br /><span className="gradient-text">One trusted firm.</span>
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <p className="mt-6 max-w-2xl text-lg text-ink-600">
                Choose a service to see scope, deliverables and how to begin. Every engagement starts with a clear, written quotation.
              </p>
            </RevealOnScroll>
          </div>
        </section>

        <section className="pb-24 lg:pb-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((s, i) => (
                <RevealOnScroll key={s.slug} delay={(i % 3) * 0.06}>
                  <Link href={`/services/${s.slug}`} className="group block overflow-hidden rounded-3xl border border-ink-100 bg-white transition hover:border-brand-200 hover:shadow-xl hover:shadow-brand-900/5">
                    <div className="relative aspect-[16/10] overflow-hidden bg-ink-100">
                      <Image
                        src={s.img}
                        alt={s.name}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent" />
                      <div className="absolute left-5 top-5 grid h-10 w-10 place-items-center rounded-xl bg-white/90 backdrop-blur ring-1 ring-white/40">
                        <s.icon size={18} className="text-brand-700" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-xl font-bold text-ink-900">{s.name}</h3>
                      <p className="mt-2 line-clamp-2 text-sm text-ink-600">{s.short}</p>
                      <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                        Read more <ArrowRight size={14} className="transition group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </RevealOnScroll>
              ))}
            </div>

            <div className="mt-16 rounded-3xl gradient-brand p-10 text-center text-white lg:p-16">
              <h2 className="font-display text-3xl font-bold lg:text-4xl">Not sure where to start?</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-brand-100">
                Submit a request and our team will recommend the right service for your situation.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link href="/request-valuation" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-900">
                  Submit a Request <ArrowRight size={14} />
                </Link>
                <Link href="/book-consultation" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white">
                  Book a Consultation
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
