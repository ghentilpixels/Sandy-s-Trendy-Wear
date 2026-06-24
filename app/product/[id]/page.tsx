"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useCart } from "../../../context/CartContext";
import { products } from "../../../data/products";

const colorSwatches: Record<string, string> = {
  Beige: "bg-stone-300",
  Black: "bg-slate-950",
  Indigo: "bg-indigo-800",
  Sand: "bg-amber-200",
  Tan: "bg-amber-700",
  White: "bg-white",
};

export default function ProductPage() {
  const params = useParams();
  const id = Number(params?.id);
  const product = products.find((item) => item.id === id);
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(
    product?.sizes?.[0] || "One size",
  );
  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0] || "Default",
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const recommended = useMemo(
    () =>
      products
        .filter((item) => item.id !== id)
        .sort((a, b) => Number(b.bestSeller) - Number(a.bestSeller))
        .slice(0, 3),
    [id],
  );

  if (!product) {
    return (
      <section className="rounded-[32px] border border-slate-200 bg-white p-10 text-center shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">
          Product not found
        </h1>
        <p className="mt-3 text-slate-600">
          The item you opened is no longer available.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white"
        >
          Back to shop
        </Link>
      </section>
    );
  }

  const price = product.discountPrice || product.price;
  const totalPrice = price * quantity;
  const savings = product.discountPrice ? product.price - product.discountPrice : 0;

  const handleAddToCart = () => {
    addToCart(product, {
      size: selectedSize,
      color: selectedColor,
      quantity,
    });
    setAdded(true);
  };

  return (
    <div className="space-y-14">
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-orange-500"
      >
        <ArrowLeft size={18} />
        Back to shop
      </Link>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] xl:gap-12">
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-[36px] border border-slate-200 bg-slate-100 shadow-sm">
            <div className="relative aspect-[4/5] min-h-[420px]">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                priority
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute left-5 top-5 flex flex-wrap gap-2">
              {product.bestSeller && (
                <span className="rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white">
                  Best seller
                </span>
              )}
              {product.discountPrice && (
                <span className="rounded-full bg-orange-500 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white">
                  Sale
                </span>
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: Truck, title: "Fast delivery", text: "2-3 business days" },
              { icon: ShieldCheck, title: "Secure checkout", text: "Protected payment" },
              { icon: RotateCcw, title: "Easy returns", text: "30-day policy" },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <Icon className="h-6 w-6 text-orange-500" />
                  <p className="mt-4 font-semibold text-slate-900">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        <aside className="lg:sticky lg:top-36 lg:self-start">
          <div className="rounded-[36px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/5 sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-orange-50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-orange-600">
                {product.category}
              </span>
              <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-600">
                {product.gender}
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-tight text-slate-950 md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-5 text-base leading-7 text-slate-600">
              {product.description}
            </p>

            <div className="mt-7 flex flex-wrap items-end gap-4 border-b border-slate-200 pb-7">
              <p className="text-4xl font-bold text-slate-950">GHS {price}</p>
              {product.discountPrice && (
                <>
                  <p className="pb-1 text-lg text-slate-400 line-through">
                    GHS {product.price}
                  </p>
                  <p className="rounded-full bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-600">
                    Save GHS {savings}
                  </p>
                </>
              )}
            </div>

            <div className="mt-7 space-y-7">
              <div>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                    Size
                  </p>
                  <p className="text-sm text-slate-500">{selectedSize}</p>
                </div>
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`h-12 rounded-2xl border text-sm font-semibold transition ${
                        selectedSize === size
                          ? "border-slate-950 bg-slate-950 text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:border-orange-300 hover:bg-orange-50"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                    Color
                  </p>
                  <p className="text-sm text-slate-500">{selectedColor}</p>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`flex items-center gap-2 rounded-full border px-4 py-3 text-sm font-semibold transition ${
                        selectedColor === color
                          ? "border-slate-950 bg-slate-950 text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:border-orange-300 hover:bg-orange-50"
                      }`}
                    >
                      <span
                        className={`h-4 w-4 rounded-full border border-slate-300 ${
                          colorSwatches[color] || "bg-slate-200"
                        }`}
                      />
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-[150px_1fr]">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                    Qty
                  </p>
                  <div className="mt-3 flex h-14 items-center justify-between rounded-full border border-slate-200 bg-slate-50 px-2">
                    <button
                      type="button"
                      onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900 shadow-sm transition hover:bg-slate-100"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="text-base font-bold text-slate-950">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((current) => current + 1)}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-900 shadow-sm transition hover:bg-slate-100"
                      aria-label="Increase quantity"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>

                <div className="rounded-[24px] bg-slate-50 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                    Total
                  </p>
                  <p className="mt-2 text-2xl font-bold text-slate-950">
                    GHS {totalPrice}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-6 text-sm font-bold text-white shadow-lg shadow-slate-950/10 transition hover:bg-slate-800"
                >
                  {added ? <Check size={19} /> : <ShoppingBag size={19} />}
                  {added ? "Added to cart" : "Add to cart"}
                </button>
                <Link
                  href="/cart"
                  className="inline-flex h-14 w-full items-center justify-center rounded-full border border-slate-950 px-6 text-sm font-bold text-slate-950 transition hover:bg-slate-100"
                >
                  View cart
                </Link>
              </div>

              <div className="rounded-[24px] bg-slate-50 p-5 text-sm leading-6 text-slate-600">
                <p>
                  <span className="font-semibold text-slate-950">
                    {product.stock} in stock.
                  </span>{" "}
                  Ships from Accra with delivery updates after checkout.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-slate-950">
              Complete the look
            </h2>
            <p className="mt-2 text-slate-600">
              More pieces that pair well with this selection.
            </p>
          </div>
          <Link
            href="/shop"
            className="text-sm font-semibold text-orange-600 hover:text-orange-700"
          >
            Browse all products
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {recommended.map((item) => (
            <Link
              key={item.id}
              href={`/product/${item.id}`}
              className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                  {item.category}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-slate-950">
                  {item.name}
                </h3>
                <p className="mt-3 text-sm font-semibold text-slate-700">
                  GHS {item.discountPrice || item.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
