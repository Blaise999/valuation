"use client";

import { Menu } from "lucide-react";
import { Logo } from "./Logo";
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
