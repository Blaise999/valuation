"use client";

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
