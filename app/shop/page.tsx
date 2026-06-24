"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { products } from "../../data/products";

const categories = Array.from(new Set(products.map((p) => p.category)));

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [search, setSearch] = useState("");

  const visibleProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch =
        search.length === 0 ||
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  return (
    <div className="space-y-10">
      <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
              Shop the collection
            </p>
            <h1 className="mt-3 text-4xl font-semibold text-slate-900">
              Fashion essentials for every occasion
            </h1>
          </div>
          <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search styles, categories, or names"
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm outline-none focus:border-indigo-500"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-3xl border border-slate-200 bg-white px-5 py-4 text-sm outline-none"
            >
              <option>All</option>
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
              Results
            </p>
            <h2 className="text-2xl font-semibold text-slate-900">
              {visibleProducts.length} products available
            </h2>
          </div>
          <div className="text-sm text-slate-500">
            Showing {visibleProducts.length} of {products.length}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {visibleProducts.map((product) => (
            <article
              key={product.id}
              className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <Link href={`/product/${product.id}`}>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-72 w-full object-cover"
                />
              </Link>
              <div className="p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
                    {product.category}
                  </p>
                  {product.bestSeller && (
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                      Best seller
                    </span>
                  )}
                </div>
                <Link href={`/product/${product.id}`}>
                  <h3 className="mt-4 text-xl font-semibold text-slate-900 hover:text-indigo-600">
                    {product.name}
                  </h3>
                </Link>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {product.description}
                </p>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-lg font-semibold text-slate-900">
                      GHS {product.discountPrice || product.price}
                    </div>
                  </div>
                  <Link
                    href={`/product/${product.id}`}
                    className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
                  >
                    View
                  </Link>
                </div>
              </div>
            </article>
          ))}
          {visibleProducts.length === 0 && (
            <div className="col-span-full rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500">
              No products match your search.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
