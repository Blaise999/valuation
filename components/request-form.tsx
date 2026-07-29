"use client";

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
            This form is the conversion engine. Next, we�ll connect it to Supabase
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
