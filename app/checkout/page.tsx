"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CreditCard, MapPin, Package, Truck } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, summary, clearCart } = useCart();
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    region: "",
    city: "",
    address: "",
  });

  const isValid =
    form.fullName &&
    form.email &&
    form.phone &&
    form.region &&
    form.city &&
    form.address &&
    cart.length;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!isValid) return;
    clearCart();
    router.push("/");
  };

  return (
    <div className="grid gap-10 xl:grid-cols-[1.4fr_0.9fr]">
      <form
        onSubmit={handleSubmit}
        className="space-y-10 rounded-[36px] border border-slate-200 bg-white p-8 shadow-sm sm:p-10"
      >
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
            Checkout
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-950">
            Delivery & payment
          </h1>
        </div>

        <section className="grid gap-6 rounded-[28px] border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-950 shadow-sm">
              <MapPin size={18} />
            </div>
            <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-slate-900">
              Customer information
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              className="h-14 rounded-full border border-slate-200 bg-white px-5 text-sm outline-none transition focus:border-orange-300 focus:bg-white"
              placeholder="Full name"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              required
            />
            <input
              className="h-14 rounded-full border border-slate-200 bg-white px-5 text-sm outline-none transition focus:border-orange-300 focus:bg-white"
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              className="h-14 rounded-full border border-slate-200 bg-white px-5 text-sm outline-none transition focus:border-orange-300 focus:bg-white"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
          </div>
        </section>

        <section className="grid gap-6 rounded-[28px] border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-950 shadow-sm">
              <Truck size={18} />
            </div>
            <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-slate-900">
              Delivery address
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              className="h-14 rounded-full border border-slate-200 bg-white px-5 text-sm outline-none transition focus:border-orange-300 focus:bg-white"
              placeholder="Region"
              value={form.region}
              onChange={(e) => setForm({ ...form, region: e.target.value })}
              required
            />
            <input
              className="h-14 rounded-full border border-slate-200 bg-white px-5 text-sm outline-none transition focus:border-orange-300 focus:bg-white"
              placeholder="City"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              required
            />
            <input
              className="h-14 rounded-full border border-slate-200 bg-white px-5 text-sm outline-none transition focus:border-orange-300 focus:bg-white sm:col-span-2"
              placeholder="Street address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              required
            />
          </div>
        </section>

        <section className="grid gap-6 rounded-[28px] border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-950 shadow-sm">
              <CreditCard size={18} />
            </div>
            <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-slate-900">
              Payment method
            </h2>
          </div>
          <div className="rounded-[24px] border border-dashed border-slate-300 bg-white p-6 text-center">
            <p className="text-sm font-semibold text-slate-700">
              Cash on delivery
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Pay when your order arrives.
            </p>
          </div>
        </section>

        <button
          type="submit"
          disabled={!isValid}
          className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-6 text-sm font-bold text-white shadow-lg shadow-slate-950/10 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Package size={18} />
          Place Order
        </button>
      </form>

      <aside className="space-y-6 rounded-[36px] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-orange-600">
            <CreditCard size={18} />
          </div>
          <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-slate-900">
            Order summary
          </h2>
        </div>
        <div className="space-y-4">
          {cart.map((i) => (
            <div
              key={`${i.id}-${i.size}-${i.color}`}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-3"
            >
              <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-white">
                <Image
                  src={i.image}
                  alt={i.name}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-950">
                  {i.name}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  Qty: {i.quantity}
                </p>
              </div>
              <p className="text-sm font-bold text-slate-950">
                GHS {(i.price * i.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
        <div className="space-y-3 border-t border-slate-200 pt-5">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>Subtotal</span>
            <span>GHS {summary.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>Shipping</span>
            <span>GHS {summary.shipping.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-lg font-bold text-slate-950">
            <span>Total</span>
            <span>GHS {summary.total.toFixed(2)}</span>
          </div>
        </div>
        <Link
          href="/cart"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-300 hover:bg-slate-50"
        >
          <ArrowLeft size={16} />
          Back to cart
        </Link>
      </aside>
    </div>
  );
}
