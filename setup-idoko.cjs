const fs = require("fs");
const path = require("path");

const files = {
  "lib/site-data.ts": `import {
  Award,
  Banknote,
  Building2,
  FileCheck2,
  Gavel,
  Home,
  Landmark,
  ShieldCheck,
  TrendingUp,
  Trees,
} from "lucide-react";

export const unsplashImages = {
  hero: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=90",
  luxuryHome:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=90",
  cityBuilding:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=90",
  land:
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=90",
  interior:
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=90",
  documents:
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=90",
  estate:
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=90",
  map:
    "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=90",
};

export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Request", href: "#request" },
];

export const heroStats = [
  { value: "01", label: "Property Valuation" },
  { value: "02", label: "Land Assessment" },
  { value: "03", label: "Estate Advisory" },
  { value: "04", label: "Legal Reports" },
];

export const credibilityItems = [
  {
    icon: FileCheck2,
    title: "Documented Reports",
    text: "Clear valuation reports prepared for property, legal, financial, and estate decisions.",
  },
  {
    icon: ShieldCheck,
    title: "Confidential Handling",
    text: "Client property information, asset details, and documents are handled with discretion.",
  },
  {
    icon: Banknote,
    title: "Market-Based Opinion",
    text: "Valuation opinions guided by location, market activity, property condition, and asset potential.",
  },
  {
    icon: Award,
    title: "Professional Standard",
    text: "A polished process from request and inspection to analysis and final report delivery.",
  },
];

export const services = [
  {
    icon: Home,
    title: "Residential Valuation",
    text: "Accurate valuation reports for homes, apartments, duplexes, private residences, and residential estates.",
    image: unsplashImages.interior,
  },
  {
    icon: Building2,
    title: "Commercial Valuation",
    text: "Professional assessment for office buildings, shops, hotels, warehouses, plazas, schools, and mixed-use properties.",
    image: unsplashImages.cityBuilding,
  },
  {
    icon: Trees,
    title: "Land Valuation",
    text: "Market-backed assessment for land acquisition, sale, development planning, title decisions, and investment review.",
    image: unsplashImages.land,
  },
  {
    icon: Landmark,
    title: "Bank & Mortgage Reports",
    text: "Structured reports prepared for lending, collateral review, mortgage support, and institutional documentation.",
    image: unsplashImages.estate,
  },
  {
    icon: Gavel,
    title: "Probate & Legal Valuation",
    text: "Clear valuation support for inheritance, court matters, family estate settlement, insurance, and dispute resolution.",
    image: unsplashImages.documents,
  },
  {
    icon: TrendingUp,
    title: "Investment Advisory",
    text: "Property market opinions, rental assessment, development potential, and practical asset decision support.",
    image: unsplashImages.map,
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Initial Request",
    text: "The client submits property details, valuation purpose, location, and contact information.",
  },
  {
    number: "02",
    title: "Document Review",
    text: "We review ownership details, survey/title documents, building information, and available evidence.",
  },
  {
    number: "03",
    title: "Inspection & Market Study",
    text: "Physical inspection and market comparison help establish realistic value and asset condition.",
  },
  {
    number: "04",
    title: "Report Preparation",
    text: "A formal valuation report is prepared with professional reasoning, figures, and relevant notes.",
  },
];

export const valuationPurposes = [
  "Sale or purchase decision",
  "Mortgage or bank security",
  "Probate and inheritance",
  "Court or legal documentation",
  "Insurance valuation",
  "Rent assessment",
  "Investment planning",
  "Company asset reporting",
];

export const aboutPoints = [
  "Clean corporate identity",
  "Valuation request funnel",
  "Trust-building service layout",
  "Professional Unsplash imagery",
  "Report-focused messaging",
  "Ready for Supabase backend",
];
`,

  "components/logo.tsx": `export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-[#c99b42] shadow-lg shadow-black/20">
        <svg viewBox="0 0 64 64" className="h-10 w-10" aria-hidden="true">
          <path
            d="M14 50V24L32 12l18 12v26"
            fill="none"
            stroke="#07111f"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M23 50V31h18v19"
            fill="none"
            stroke="#07111f"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18 50h28"
            stroke="#07111f"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M32 12v38"
            stroke="#07111f"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.35"
          />
        </svg>
      </div>

      <div className="leading-tight">
        <p className="text-lg font-black uppercase tracking-[-0.03em] text-white">
          Idoko C. Idoko
        </p>
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-200/80">
          Valuations
        </p>
      </div>
    </div>
  );
}
`,

  "components/section-label.tsx": `import { Sparkles } from "lucide-react";

type SectionLabelProps = {
  children: React.ReactNode;
  dark?: boolean;
};

export function SectionLabel({ children, dark = false }: SectionLabelProps) {
  return (
    <div
      className={
        dark
          ? "mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-amber-200"
          : "mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-amber-700"
      }
    >
      <Sparkles className="h-3.5 w-3.5" />
      {children}
    </div>
  );
}
`,

  "components/header.tsx": `"use client";

import { Menu } from "lucide-react";
import { Logo } from "./logo";
import { navLinks } from "@/lib/site-data";

export function Header() {
  return (
    <header className="absolute left-0 right-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-8 rounded-full border border-white/10 bg-white/10 px-7 py-3 text-sm font-medium text-white/70 backdrop-blur-xl lg:flex">
          {navLinks.map((link) => (
            <a key={link.href} className="transition hover:text-white" href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#request"
            className="hidden rounded-full bg-white px-5 py-3 text-sm font-bold text-[#07111f] transition hover:-translate-y-0.5 hover:bg-amber-100 md:inline-flex"
          >
            Get Valuation
          </a>

          <button className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-xl lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
`,

  "components/hero-section.tsx": `"use client";

import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, ClipboardCheck } from "lucide-react";
import { Header } from "./header";
import { heroStats, unsplashImages } from "@/lib/site-data";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#07111f] text-white">
      <Header />

      <div className="absolute inset-0">
        <img
          src={unsplashImages.hero}
          alt="Premium residential property"
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07111f] via-[#07111f]/92 to-[#07111f]/35" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(201,155,66,0.25),transparent_28%),radial-gradient(circle_at_78%_20%,rgba(16,185,129,0.16),transparent_30%)]" />
      </div>

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 pb-20 pt-32 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.div
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white/75 backdrop-blur-xl"
          >
            <BadgeCheck className="h-4 w-4 text-amber-300" />
            Property • Land • Estate • Asset Valuation
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="max-w-5xl text-5xl font-black leading-[0.96] tracking-[-0.06em] md:text-7xl lg:text-8xl"
          >
            Know the true value before you decide.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-2xl text-lg leading-8 text-white/68 md:text-xl"
          >
            Idoko C. Idoko Valuations provides professional valuation reports
            and estate advisory support for land, residential properties,
            commercial assets, legal matters, mortgage decisions, and investment
            planning.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#request"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#c99b42] px-8 py-4 text-sm font-black text-[#07111f] shadow-2xl shadow-black/30 transition hover:-translate-y-1 hover:bg-amber-300"
            >
              Request a Valuation <ArrowRight className="h-4 w-4" />
            </a>

            <a
              href="#services"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-bold text-white backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/10"
            >
              Explore Services
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-14 grid max-w-2xl grid-cols-2 gap-3 md:grid-cols-4"
          >
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl"
              >
                <p className="text-2xl font-black text-amber-200">{stat.value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.25 }}
          className="relative hidden lg:block"
        >
          <div className="absolute -left-8 top-12 z-20 rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-2xl">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-200">
                <ClipboardCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="font-bold">Formal valuation report</p>
                <p className="text-sm text-white/50">Prepared for serious use</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-white/10 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <img
              src={unsplashImages.luxuryHome}
              alt="Valuation property exterior"
              className="h-[38rem] w-full rounded-[2.5rem] object-cover"
            />

            <div className="absolute inset-x-3 bottom-3 rounded-b-[2.5rem] bg-gradient-to-t from-black/75 to-transparent p-8 pt-28">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-200">
                Asset intelligence
              </p>
              <p className="mt-2 text-2xl font-black tracking-[-0.04em]">
                Residential, commercial & landed property reports.
              </p>
            </div>
          </div>

          <div className="absolute -bottom-8 right-10 z-20 max-w-sm rounded-[2rem] bg-white p-6 text-[#07111f] shadow-2xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-700">
              Decision support
            </p>
            <p className="mt-2 text-xl font-black tracking-[-0.03em]">
              For sale, purchase, mortgage, probate, insurance & investment.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
`,

  "components/credibility-strip.tsx": `"use client";

import { motion } from "framer-motion";
import { credibilityItems } from "@/lib/site-data";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export function CredibilityStrip() {
  return (
    <section className="relative z-20 -mt-14 px-6 lg:px-8">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto grid max-w-7xl gap-4 rounded-[2.5rem] border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-900/10 md:grid-cols-2 lg:grid-cols-4"
      >
        {credibilityItems.map((item) => {
          const Icon = item.icon;

          return (
            <motion.div
              variants={fadeUp}
              key={item.title}
              className="rounded-[2rem] bg-[#f7f3ea] p-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#07111f] text-amber-300">
                <Icon className="h-6 w-6" />
              </div>

              <h3 className="mt-5 text-lg font-black tracking-[-0.03em] text-[#07111f]">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
`,

  "components/about-section.tsx": `"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { SectionLabel } from "./section-label";
import { aboutPoints, unsplashImages } from "@/lib/site-data";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export function AboutSection() {
  return (
    <section id="about" className="overflow-hidden bg-[#f7f3ea] px-6 py-24 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="overflow-hidden rounded-[3rem] shadow-2xl shadow-slate-900/10">
            <img
              src={unsplashImages.documents}
              alt="Valuation documents and report preparation"
              className="h-[36rem] w-full object-cover"
            />
          </div>

          <div className="absolute -bottom-8 -right-3 rounded-[2rem] bg-[#07111f] p-6 text-white shadow-2xl md:-right-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-300">
              Report-first approach
            </p>
            <p className="mt-2 max-w-xs text-2xl font-black tracking-[-0.04em]">
              Built for evidence, accuracy, and professional presentation.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>Professional standard</SectionLabel>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-4xl font-black leading-tight tracking-[-0.05em] text-[#07111f] md:text-6xl"
          >
            A valuation brand should feel like authority, not decoration.
          </motion.h2>

          <motion.p variants={fadeUp} className="mt-7 text-lg leading-8 text-slate-600">
            The website is designed to make clients immediately understand that
            Idoko C. Idoko Valuations handles serious property decisions: asset
            value, land value, mortgage support, legal matters, estate settlement,
            rental assessment, and investment advisory.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 grid gap-4 sm:grid-cols-2">
            {aboutPoints.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-700" />
                <p className="text-sm font-bold text-slate-700">{item}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
`,

  "components/services-section.tsx": `"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "./section-label";
import { services } from "@/lib/site-data";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export function ServicesSection() {
  return (
    <section id="services" className="bg-white px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end"
        >
          <div className="max-w-3xl">
            <motion.div variants={fadeUp}>
              <SectionLabel>Core services</SectionLabel>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-4xl font-black leading-tight tracking-[-0.05em] text-[#07111f] md:text-6xl"
            >
              Every service points back to one thing: defensible value.
            </motion.h2>
          </div>

          <motion.p variants={fadeUp} className="max-w-md text-lg leading-8 text-slate-600">
            The site separates each valuation category so visitors instantly know
            the firm can handle their exact purpose.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <motion.article
                variants={fadeUp}
                key={service.title}
                className="group overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-900/10"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#07111f]/80 via-[#07111f]/20 to-transparent" />

                  <div className="absolute bottom-5 left-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#07111f] shadow-xl">
                    <Icon className="h-7 w-7" />
                  </div>
                </div>

                <div className="p-7">
                  <h3 className="text-2xl font-black tracking-[-0.04em] text-[#07111f]">
                    {service.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">{service.text}</p>

                  <a
                    href="#request"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-black text-amber-700"
                  >
                    Request this service <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
`,

  "components/purpose-band.tsx": `"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Layers3 } from "lucide-react";
import { unsplashImages, valuationPurposes } from "@/lib/site-data";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export function PurposeBand() {
  return (
    <section className="relative overflow-hidden bg-[#07111f] px-6 py-24 text-white lg:px-8">
      <div className="absolute inset-0 opacity-30">
        <img
          src={unsplashImages.cityBuilding}
          alt="Commercial property skyline"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#07111f]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            variants={fadeUp}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-amber-200"
          >
            <Layers3 className="h-4 w-4" />
            Use cases
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-4xl font-black tracking-[-0.05em] md:text-6xl"
          >
            One report. Many serious decisions.
          </motion.h2>

          <motion.p variants={fadeUp} className="mt-6 text-lg leading-8 text-white/65">
            Visitors should not wonder whether valuation applies to them. This
            section makes the use cases obvious.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid gap-4 sm:grid-cols-2"
        >
          {valuationPurposes.map((purpose) => (
            <motion.div
              variants={fadeUp}
              key={purpose}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl"
            >
              <CheckCircle2 className="h-5 w-5 shrink-0 text-amber-300" />
              <p className="font-bold text-white/85">{purpose}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
`,

  "components/process-section.tsx": `"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "./section-label";
import { processSteps } from "@/lib/site-data";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export function ProcessSection() {
  return (
    <section id="process" className="bg-[#f7f3ea] px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>Process</SectionLabel>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-4xl font-black leading-tight tracking-[-0.05em] text-[#07111f] md:text-6xl"
          >
            From enquiry to valuation report.
          </motion.h2>

          <motion.p variants={fadeUp} className="mt-6 text-lg leading-8 text-slate-600">
            The process is simple for the client, but professional behind the scenes.
          </motion.p>
        </motion.div>

        <div className="relative mt-16 grid gap-6 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: index * 0.08 }}
              key={step.number}
              className="relative rounded-[2.5rem] bg-white p-7 shadow-sm"
            >
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#07111f] text-xl font-black text-amber-300">
                {step.number}
              </div>

              <h3 className="text-2xl font-black tracking-[-0.04em] text-[#07111f]">
                {step.title}
              </h3>

              <p className="mt-3 leading-7 text-slate-600">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
`,

  "components/request-form.tsx": `"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPinned, Phone } from "lucide-react";
import { SectionLabel } from "./section-label";
import { unsplashImages } from "@/lib/site-data";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export function RequestForm() {
  return (
    <section id="request" className="bg-white px-6 py-24 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>Start here</SectionLabel>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-4xl font-black leading-tight tracking-[-0.05em] text-[#07111f] md:text-6xl"
          >
            Request a valuation for your property or asset.
          </motion.h2>

          <motion.p variants={fadeUp} className="mt-6 text-lg leading-8 text-slate-600">
            This form is the conversion engine. Next, we’ll connect it to Supabase
            so every request is saved, trackable, and ready for admin review.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 overflow-hidden rounded-[2.5rem] bg-[#07111f] text-white shadow-2xl shadow-slate-900/10"
          >
            <img
              src={unsplashImages.land}
              alt="Land and property valuation"
              className="h-64 w-full object-cover opacity-70"
            />

            <div className="p-7">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-300">
                Contact details
              </p>

              <div className="mt-5 space-y-4 text-white/75">
                <p className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-amber-300" />
                  +234 000 000 0000
                </p>

                <p className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-amber-300" />
                  info@idokocidokovaluations.com
                </p>

                <p className="flex items-center gap-3">
                  <MapPinned className="h-5 w-5 text-amber-300" />
                  Enugu, Nigeria
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75 }}
          className="rounded-[2.5rem] border border-slate-200 bg-[#f7f3ea] p-5 shadow-2xl shadow-slate-900/10 md:p-8"
        >
          <div className="rounded-[2rem] bg-white p-5 md:p-7">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="text-sm font-black text-slate-700">Full name</span>
                <input
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-[#07111f]"
                  placeholder="Client name"
                />
              </label>

              <label className="block">
                <span className="text-sm font-black text-slate-700">Phone number</span>
                <input
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-[#07111f]"
                  placeholder="080..."
                />
              </label>

              <label className="block md:col-span-2">
                <span className="text-sm font-black text-slate-700">Email address</span>
                <input
                  type="email"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-[#07111f]"
                  placeholder="client@email.com"
                />
              </label>

              <label className="block">
                <span className="text-sm font-black text-slate-700">Property type</span>
                <select className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-[#07111f]">
                  <option>Land</option>
                  <option>Residential property</option>
                  <option>Commercial property</option>
                  <option>Industrial property</option>
                  <option>Estate / multiple assets</option>
                  <option>Other</option>
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-black text-slate-700">Valuation purpose</span>
                <select className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-[#07111f]">
                  <option>Sale / purchase</option>
                  <option>Mortgage / bank</option>
                  <option>Probate / inheritance</option>
                  <option>Legal / court matter</option>
                  <option>Insurance</option>
                  <option>Investment decision</option>
                  <option>Rental assessment</option>
                </select>
              </label>

              <label className="block md:col-span-2">
                <span className="text-sm font-black text-slate-700">Property location</span>
                <input
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-[#07111f]"
                  placeholder="Area, city, landmark, or full address"
                />
              </label>

              <label className="block md:col-span-2">
                <span className="text-sm font-black text-slate-700">Message</span>
                <textarea
                  className="mt-2 min-h-36 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-[#07111f]"
                  placeholder="Briefly describe the property and what the valuation is needed for..."
                />
              </label>
            </div>

            <button
              type="button"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#07111f] px-8 py-4 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-[#10243f]"
            >
              Submit Valuation Request <ArrowRight className="h-4 w-4" />
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-slate-500">
              Next step: connect this form to Supabase, add file uploads, and send
              email notifications.
            </p>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
`,

  "components/footer.tsx": `import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="bg-[#07111f] px-6 py-12 text-white lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <Logo />

        <div className="text-sm leading-7 text-white/55 md:text-right">
          <p>Professional property, land, estate, and asset valuation services.</p>
          <p>© {new Date().getFullYear()} Idoko C. Idoko Valuations. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
`,

  "app/page.tsx": `import { AboutSection } from "@/components/about-section";
import { CredibilityStrip } from "@/components/credibility-strip";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { ProcessSection } from "@/components/process-section";
import { PurposeBand } from "@/components/purpose-band";
import { RequestForm } from "@/components/request-form";
import { ServicesSection } from "@/components/services-section";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-[#111827]">
      <HeroSection />
      <CredibilityStrip />
      <AboutSection />
      <ServicesSection />
      <PurposeBand />
      <ProcessSection />
      <RequestForm />
      <Footer />
    </main>
  );
}
`,

  "app/globals.css": `@import "tailwindcss";

html {
  scroll-behavior: smooth;
}

body {
  background: #ffffff;
}

::selection {
  background: #c99b42;
  color: #07111f;
}
`,
};

for (const [filePath, content] of Object.entries(files)) {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
  console.log("created", filePath);
}

console.log("Done. Now installing packages...");
