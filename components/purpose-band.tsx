"use client";

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
