"use client";

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
