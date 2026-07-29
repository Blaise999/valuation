"use client";

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
            Property � Land � Estate � Asset Valuation
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
