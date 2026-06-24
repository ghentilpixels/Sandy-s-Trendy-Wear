"use client";

import Link from "next/link";
import { ShoppingBag, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const navItems = [
  { href: "/", label: "Home", exact: true },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { cart } = useCart();
  const { isLoggedIn, isAdmin } = useAuth();
  const cartCount = cart.reduce(
    (total: number, item: { quantity?: number }) => total + (item.quantity ?? 0),
    0,
  );

  const isActive = (href: string, exact?: boolean) =>
    exact
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);

  const accountHref = isLoggedIn ? (isAdmin ? "/admin" : "/dashboard") : "/auth";
  const accountLabel = isLoggedIn ? (isAdmin ? "Admin" : "Account") : "Login";

  return (
    <nav className="sticky top-4 z-50 mx-auto mt-4 w-[90%] max-w-6xl">
      <div className="rounded-[32px] bg-white/95 px-4 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.08)] ring-1 ring-slate-200/70 backdrop-blur-md md:rounded-full md:px-6">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-50">
              <span className="h-3 w-3 rounded-full bg-orange-500" />
            </span>

            <span className="truncate text-lg font-bold text-slate-900 md:text-xl">
              Sandy&apos;s Trendy Wear
            </span>
          </Link>

          <div className="hidden items-center gap-10 md:flex">
            {navItems.map((item) => {
              const active = isActive(item.href, item.exact);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative font-medium transition ${
                    active
                      ? "text-orange-500"
                      : "text-slate-700 hover:text-orange-500"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute -bottom-3 left-0 h-[3px] w-full rounded-full bg-orange-500" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <Link
              href="/cart"
              aria-label="View cart"
              className={`relative flex h-11 w-11 items-center justify-center rounded-full transition ${
                isActive("/cart")
                  ? "bg-orange-50 text-orange-500"
                  : "text-slate-800 hover:bg-slate-100"
              }`}
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[11px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              href={accountHref}
              className={`hidden rounded-full px-6 py-3 font-medium transition sm:inline-flex ${
                isActive(accountHref)
                  ? "bg-orange-500 text-white"
                  : "bg-slate-950 text-white hover:bg-slate-800"
              }`}
            >
              {accountLabel}
            </Link>

            <Link
              href={accountHref}
              aria-label={accountLabel}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-white transition hover:bg-slate-800 sm:hidden"
            >
              <UserRound size={20} />
            </Link>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-4 gap-1 border-t border-slate-200 pt-3 md:hidden">
          {navItems.map((item) => {
            const active = isActive(item.href, item.exact);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-3 py-2 text-center text-sm font-medium transition ${
                  active
                    ? "bg-orange-50 text-orange-600"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
