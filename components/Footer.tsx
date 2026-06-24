"use client";

import Link from "next/link";
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const supportLinks = [
  { href: "/contact", label: "Help and inquiries" },
  { href: "/cart", label: "View cart" },
  { href: "/shop", label: "Shipping & returns" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-white">
              Sandy&apos;s Trendy Wear
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              Premium fashion for men and women across Ghana.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50">
                <span className="h-3 w-3 rounded-full bg-orange-500" />
              </div>
              <span className="text-sm font-semibold text-white">
                Est. 2026
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-slate-400">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-slate-400 transition hover:text-orange-400"
                  >
                    {link.label}
                    <ArrowRight
                      size={14}
                      className="opacity-0 -translate-x-1 transition group-hover:opacity-100 group-hover:translate-x-0"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-slate-400">
              Customer Support
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-slate-400 transition hover:text-orange-400"
                  >
                    {link.label}
                    <ArrowRight
                      size={14}
                      className="opacity-0 -translate-x-1 transition group-hover:opacity-100 group-hover:translate-x-0"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-slate-400">
              Contact Us
            </h3>
            <div className="mt-5 space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-orange-400">
                  <MapPin size={14} />
                </div>
                <span className="text-slate-400">Accra, Ghana</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-orange-400">
                  <Phone size={14} />
                </div>
                <span className="text-slate-400">
                  +233 24 339 1270 / +233 54 093 6957
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-orange-400">
                  <Mail size={14} />
                </div>
                <span className="text-slate-400">
                  info@sandystrendywear.com
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 text-sm text-slate-500 md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} Sandy&apos;s Trendy Wear. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
