"use client";

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
