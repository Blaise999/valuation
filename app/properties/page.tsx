import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import RevealOnScroll from '@/components/RevealOnScroll';
import { createClient } from '@/lib/supabase/server';
import { formatNaira } from '@/lib/utils';
import {
  MapPin, Bed, Bath, Maximize, ArrowRight, Phone, MessageCircle,
  Building2, Home, Tag, Briefcase, Sparkles, Search, Mail,
} from 'lucide-react';
import type { PropertyRow } from '@/types/db';

export const metadata = { title: 'Properties' };
export const revalidate = 60;

function PropertyCard({ p, layout = 'card' }: { p: PropertyRow; layout?: 'card' | 'wide' | 'feature' }) {
  const period = p.price_period === 'monthly' ? '/mo' : p.price_period === 'yearly' ? '/yr' : '';
  const intent = p.price_period === 'sale' ? 'For Sale' : 'For Rent';

  if (layout === 'feature') {
    return (
      <article className="group relative overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-md transition hover:shadow-2xl hover:shadow-brand-900/10">
        <div className="grid lg:grid-cols-12">
          <div className="relative aspect-[4/3] overflow-hidden bg-ink-100 lg:col-span-7 lg:aspect-auto">
            {p.images?.[0] ? (
              <Image src={p.images[0]} alt={p.title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 60vw" priority />
            ) : (
              <div className="grid h-full place-items-center text-ink-400">No image</div>
            )}
            <div className="absolute left-5 top-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-amber-400 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-950 shadow-md">
                ★ Featured
              </span>
              <span className="rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-ink-900 ring-1 ring-white shadow-md backdrop-blur">
                {intent}
              </span>
            </div>
            {p.images && p.images.length > 1 && (
              <span className="absolute bottom-5 right-5 rounded-full bg-ink-900/70 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur">
                +{p.images.length - 1} photos
              </span>
            )}
          </div>
          <div className="flex flex-col justify-between p-7 lg:col-span-5 lg:p-10">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-4xl font-bold text-brand-900">{formatNaira(p.price)}</span>
                {period && <span className="text-sm font-medium text-ink-500">{period}</span>}
              </div>
              <h2 className="mt-3 font-display text-2xl font-bold text-ink-900">{p.title}</h2>
              <div className="mt-2 flex items-center gap-1 text-sm text-ink-500">
                <MapPin size={14} />
                {[p.location, p.city, p.state].filter(Boolean).join(', ')}
              </div>

              <div className="mt-5 flex flex-wrap gap-3 border-t border-ink-100 pt-5 text-sm text-ink-700">
                {p.bedrooms != null && (
                  <span className="flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-xs">
                    <Bed size={13} className="text-brand-700" /> {p.bedrooms} Beds
                  </span>
                )}
                {p.bathrooms != null && (
                  <span className="flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-xs">
                    <Bath size={13} className="text-brand-700" /> {p.bathrooms} Baths
                  </span>
                )}
                {p.area_sqm != null && (
                  <span className="flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-xs">
                    <Maximize size={13} className="text-brand-700" /> {p.area_sqm} sqm
                  </span>
                )}
              </div>

              {p.description && (
                <p className="mt-5 line-clamp-3 text-sm leading-relaxed text-ink-600">{p.description}</p>
              )}
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              <a href="tel:08133988976" className="inline-flex items-center gap-1.5 rounded-full bg-brand-700 px-5 py-2.5 text-xs font-semibold text-white">
                <Phone size={12} /> Call Agent
              </a>
              <a href="https://wa.me/2348133988976" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-5 py-2.5 text-xs font-semibold text-ink-800 hover:bg-ink-50">
                <MessageCircle size={12} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (layout === 'wide') {
    return (
      <article className="group flex flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white transition hover:border-brand-200 hover:shadow-lg sm:flex-row">
        <div className="relative aspect-[4/3] sm:aspect-auto sm:w-72 sm:shrink-0">
          {p.images?.[0] ? (
            <Image src={p.images[0]} alt={p.title} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="288px" />
          ) : (
            <div className="grid h-full place-items-center bg-ink-100 text-ink-400">No image</div>
          )}
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold text-ink-900 backdrop-blur">{intent}</span>
        </div>
        <div className="flex flex-1 flex-col justify-between p-6">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold text-brand-900">{formatNaira(p.price)}</span>
              {period && <span className="text-xs font-medium text-ink-500">{period}</span>}
            </div>
            <h3 className="mt-1.5 font-display text-lg font-bold text-ink-900">{p.title}</h3>
            <div className="mt-1 flex items-center gap-1 text-xs text-ink-500">
              <MapPin size={11} />
              {[p.location, p.city, p.state].filter(Boolean).join(', ')}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-ink-100 pt-4 text-xs text-ink-700">
            {p.bedrooms != null && <span className="flex items-center gap-1"><Bed size={12} className="text-brand-700" /> {p.bedrooms}</span>}
            {p.bathrooms != null && <span className="flex items-center gap-1"><Bath size={12} className="text-brand-700" /> {p.bathrooms}</span>}
            {p.area_sqm != null && <span className="flex items-center gap-1"><Maximize size={12} className="text-brand-700" /> {p.area_sqm} sqm</span>}
            <a href="https://wa.me/2348133988976" target="_blank" rel="noreferrer" className="ml-auto inline-flex items-center gap-1 rounded-full bg-brand-700 px-3 py-1.5 text-[11px] font-semibold text-white">
              Enquire <ArrowRight size={11} />
            </a>
          </div>
        </div>
      </article>
    );
  }

  // Standard card
  return (
    <article className="group block overflow-hidden rounded-3xl border border-ink-100 bg-white transition hover:border-brand-200 hover:shadow-xl hover:shadow-brand-900/5">
      <div className="relative aspect-[4/3] overflow-hidden bg-ink-100">
        {p.images?.[0] ? (
          <Image src={p.images[0]} alt={p.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
        ) : (
          <div className="grid h-full place-items-center text-ink-400">No image</div>
        )}
        {p.featured && (
          <span className="absolute left-4 top-4 rounded-full bg-amber-400 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-950">
            Featured
          </span>
        )}
        <span className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold capitalize text-ink-900 ring-1 ring-ink-100">
          {intent}
        </span>
      </div>
      <div className="p-6">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-2xl font-bold text-brand-900">{formatNaira(p.price)}</span>
          {period && <span className="text-sm font-medium text-ink-500">{period}</span>}
        </div>
        <h3 className="mt-2 font-display text-lg font-bold text-ink-900">{p.title}</h3>
        <div className="mt-1 flex items-center gap-1 text-xs text-ink-500">
          <MapPin size={12} />
          {[p.location, p.city, p.state].filter(Boolean).join(', ')}
        </div>

        <div className="mt-4 flex items-center gap-4 border-t border-ink-100 pt-4 text-xs text-ink-700">
          {p.bedrooms != null && (
            <span className="flex items-center gap-1.5"><Bed size={14} className="text-brand-700" /> {p.bedrooms} Beds</span>
          )}
          {p.bathrooms != null && (
            <span className="flex items-center gap-1.5"><Bath size={14} className="text-brand-700" /> {p.bathrooms} Baths</span>
          )}
          {p.area_sqm != null && (
            <span className="flex items-center gap-1.5"><Maximize size={14} className="text-brand-700" /> {p.area_sqm} sqm</span>
          )}
        </div>
      </div>
    </article>
  );
}

export default async function PropertiesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('properties')
    .select('*')
    .in('status', ['available', 'pending'])
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false });

  const properties = (data || []) as PropertyRow[];

  // Adaptive grouping based on count
  const featured = properties.find((p) => p.featured) || properties[0];
  const others = properties.filter((p) => p.id !== featured?.id);

  const forSale = properties.filter((p) => p.price_period === 'sale').length;
  const forRent = properties.filter((p) => p.price_period !== 'sale').length;

  return (
    <>
      <Navigation />
      <main>
        {/* HERO */}
        <section className="relative overflow-hidden bg-white pt-12">
          <div className="absolute inset-0 bg-grid opacity-50" />
          <div className="pointer-events-none absolute -left-40 -top-20 h-[480px] w-[480px] rounded-full bg-brand-200/40 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-20">
            <RevealOnScroll>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/60 px-3 py-1.5 text-xs font-medium text-brand-800 backdrop-blur-sm">
                <Sparkles size={12} className="text-brand-700" /> Active Listings
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h1 className="mt-6 max-w-4xl font-display text-5xl font-bold leading-[1.05] tracking-tight text-ink-900 sm:text-6xl lg:text-7xl">
                Properties handled by <span className="gradient-text">our agency.</span>
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <p className="mt-6 max-w-2xl text-lg text-ink-600">
                We act as agent for vendors and landlords across residential, commercial and industrial property. Every listing has been appraised by our valuers — so you know the asking price reflects the real market.
              </p>
            </RevealOnScroll>

            {properties.length > 0 && (
              <RevealOnScroll delay={0.3}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <div className="rounded-2xl bg-white px-5 py-3 ring-1 ring-ink-100">
                    <div className="text-xs uppercase tracking-wider text-ink-500">Total Listings</div>
                    <div className="font-display text-2xl font-bold text-ink-900">{properties.length}</div>
                  </div>
                  <div className="rounded-2xl bg-white px-5 py-3 ring-1 ring-ink-100">
                    <div className="text-xs uppercase tracking-wider text-ink-500">For Sale</div>
                    <div className="font-display text-2xl font-bold text-ink-900">{forSale}</div>
                  </div>
                  <div className="rounded-2xl bg-white px-5 py-3 ring-1 ring-ink-100">
                    <div className="text-xs uppercase tracking-wider text-ink-500">For Rent</div>
                    <div className="font-display text-2xl font-bold text-ink-900">{forRent}</div>
                  </div>
                </div>
              </RevealOnScroll>
            )}
          </div>
        </section>

        {/* LISTINGS — adaptive layout */}
        <section className="pb-24">
          <div className="mx-auto max-w-7xl px-6">
            {properties.length === 0 ? (
              /* RICH EMPTY STATE */
              <RevealOnScroll>
                <div className="overflow-hidden rounded-3xl border border-ink-100 bg-white">
                  <div className="grid lg:grid-cols-2">
                    <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[400px]">
                      <Image
                        src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1100&q=75"
                        alt="Property"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="rounded-2xl bg-white/95 p-4 backdrop-blur">
                          <div className="text-xs font-semibold uppercase tracking-wider text-brand-700">No Listings Yet</div>
                          <div className="mt-1 font-display text-base font-bold text-ink-900">New properties coming soon</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-8 lg:p-12">
                      <h2 className="font-display text-3xl font-bold text-ink-900">Looking for a property?</h2>
                      <p className="mt-3 text-base leading-relaxed text-ink-600">
                        We may not have a current public listing that matches your search — but we have an active network of vendors and landlords. Tell us what you&apos;re looking for and we&apos;ll come back with options.
                      </p>

                      <div className="mt-8 space-y-3">
                        {[
                          { icon: Home, t: 'Residential', d: 'Bungalows, duplexes, blocks of flats, serviced apartments.' },
                          { icon: Building2, t: 'Commercial', d: 'Offices, retail, hotels, mixed-use developments.' },
                          { icon: Briefcase, t: 'Industrial', d: 'Warehouses, factories, logistics facilities.' },
                          { icon: Tag, t: 'Land', d: 'Bare land for development, agricultural, or investment.' },
                        ].map((c) => (
                          <div key={c.t} className="flex items-start gap-3 rounded-xl bg-ink-50/50 p-3">
                            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white text-brand-700 ring-1 ring-ink-100">
                              <c.icon size={14} />
                            </span>
                            <div>
                              <div className="text-sm font-semibold text-ink-900">{c.t}</div>
                              <div className="text-xs text-ink-500">{c.d}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 flex flex-wrap gap-3">
                        <Link href="/contact" className="inline-flex items-center gap-1.5 rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white">
                          <Search size={14} /> Tell Us What You Need
                        </Link>
                        <a href="https://wa.me/2348133988976" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-5 py-2.5 text-sm font-semibold text-ink-800 hover:bg-ink-50">
                          <MessageCircle size={14} /> WhatsApp Us
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ) : properties.length === 1 ? (
              /* SINGLE LISTING — feature it big */
              <div className="space-y-12">
                <RevealOnScroll>
                  <PropertyCard p={properties[0]} layout="feature" />
                </RevealOnScroll>

                <RevealOnScroll>
                  <div className="rounded-3xl bg-brand-50/40 p-8 text-center ring-1 ring-brand-100 sm:p-12">
                    <h3 className="font-display text-2xl font-bold text-ink-900">Looking for something different?</h3>
                    <p className="mx-auto mt-2 max-w-xl text-sm text-ink-600">
                      Our agency network covers many off-market properties. Let us know your specific brief.
                    </p>
                    <Link href="/contact" className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white">
                      <Search size={14} /> Send a Brief
                    </Link>
                  </div>
                </RevealOnScroll>
              </div>
            ) : properties.length === 2 ? (
              /* TWO LISTINGS — feature first, wide row second */
              <div className="space-y-6">
                <RevealOnScroll>
                  <PropertyCard p={properties[0]} layout="feature" />
                </RevealOnScroll>
                <RevealOnScroll delay={0.05}>
                  <PropertyCard p={properties[1]} layout="wide" />
                </RevealOnScroll>

                <RevealOnScroll>
                  <div className="mt-8 rounded-3xl bg-brand-50/40 p-8 text-center ring-1 ring-brand-100">
                    <h3 className="font-display text-xl font-bold text-ink-900">Want something specific? Tell us.</h3>
                    <Link href="/contact" className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white">
                      <Search size={14} /> Send a Brief
                    </Link>
                  </div>
                </RevealOnScroll>
              </div>
            ) : properties.length <= 4 ? (
              /* 3-4 listings — feature + 2x wide */
              <div className="space-y-6">
                {featured && (
                  <RevealOnScroll>
                    <PropertyCard p={featured} layout="feature" />
                  </RevealOnScroll>
                )}
                <div className="grid gap-6 sm:grid-cols-2">
                  {others.map((p, i) => (
                    <RevealOnScroll key={p.id} delay={i * 0.05}>
                      <PropertyCard p={p} layout="card" />
                    </RevealOnScroll>
                  ))}
                </div>
              </div>
            ) : (
              /* 5+ listings — feature + grid */
              <div className="space-y-10">
                {featured && (
                  <RevealOnScroll>
                    <PropertyCard p={featured} layout="feature" />
                  </RevealOnScroll>
                )}
                <div>
                  <div className="mb-6 flex items-center gap-3">
                    <h2 className="font-display text-2xl font-bold text-ink-900">More listings</h2>
                    <div className="h-px flex-1 bg-ink-100" />
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {others.map((p, i) => (
                      <RevealOnScroll key={p.id} delay={(i % 3) * 0.05}>
                        <PropertyCard p={p} layout="card" />
                      </RevealOnScroll>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* AGENT CTA — make it clear we're agents */}
        {properties.length > 0 && (
          <section className="pb-24">
            <div className="mx-auto max-w-7xl px-6">
              <div className="overflow-hidden rounded-3xl bg-ink-900 p-10 text-white lg:p-16">
                <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-16">
                  <div className="lg:col-span-7">
                    <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-300">For Owners</span>
                    <h3 className="mt-3 font-display text-3xl font-bold leading-tight lg:text-4xl">
                      List your property with our agency.
                    </h3>
                    <p className="mt-4 text-base text-ink-300">
                      We act for vendors and landlords across Nigeria — properly priced, professionally marketed, with vetted enquiries only.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
                    <Link href="/services/agency" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink-900">
                      How agency works <ArrowRight size={14} />
                    </Link>
                    <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold">
                      List a property
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
