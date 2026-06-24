"use client";
import React from "react";
import { useCart } from "../../context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, summary } = useCart();
  if (!cart.length)
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-16 text-center shadow-sm">
        <h1 className="text-3xl font-semibold">Your cart is empty</h1>
        <p className="mt-4 text-sm text-slate-500">
          Browse our shop to add premium fashion pieces to your wardrobe.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-flex rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold text-white"
        >
          Continue Shopping
        </Link>
      </div>
    );

  return (
    <div className="grid gap-10 xl:grid-cols-[1.6fr_0.9fr]">
      <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold">Shopping Cart</h1>
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={`${item.id}-${item.size}-${item.color}`}
              className="flex items-center gap-6 rounded-3xl border p-5"
            >
              <img
                src={item.image}
                className="h-32 w-32 rounded-3xl object-cover"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="mt-2 text-sm text-slate-500">
                  Size: {item.size} · Color: {item.color}
                </p>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold">
                  GHS {(item.price * item.quantity).toFixed(2)}
                </div>
                <button
                  onClick={() => removeFromCart(item.id, item.size, item.color)}
                  className="text-sm text-slate-500"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <aside className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-sm uppercase tracking-[0.35em] text-slate-500">
          Order summary
        </h2>
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>Subtotal</span>
            <span>GHS {summary.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>Shipping estimate</span>
            <span>GHS {summary.shipping.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-lg font-semibold text-slate-900">
            <span>Total</span>
            <span>GHS {summary.total.toFixed(2)}</span>
          </div>
        </div>
        <Link
          href="/checkout"
          className="mt-8 inline-flex w-full justify-center rounded-full bg-slate-900 px-6 py-4 text-sm font-semibold text-white"
        >
          Proceed to Checkout
        </Link>
      </aside>
    </div>
  );
}
