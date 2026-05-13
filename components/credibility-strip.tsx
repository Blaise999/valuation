"use client";

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
