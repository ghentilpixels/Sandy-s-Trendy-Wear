"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  RefreshCw,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { products as staticProducts } from "../data/products";

type Product = {
  id: number;
  name: string;
  category: string;
  gender: string;
  description: string;
  price: number;
  discountPrice: number | null;
  images: string[];
  sizes: string[];
  colors: string[];
  stock: number;
  featured: boolean;
  bestSeller: boolean;
  createdAt: string;
};

const serviceHighlights = [
  {
    title: "Secure Payment",
    text: "Protected checkout for every order.",
    icon: ShieldCheck,
  },
  {
    title: "Fast Delivery",
    text: "Accra dispatch within 2-3 business days.",
    icon: Truck,
  },
  {
    title: "Easy Returns",
    text: "Simple 30-day returns on eligible pieces.",
    icon: RefreshCw,
  },
];

const categories = [
  {
    title: "Street essentials",
    text: "Oversized tees, denim layers, and easy weekend pieces.",
    href: "/shop",
  },
  {
    title: "Warm-weather polish",
    text: "Linen shirts and light staples for Ghanaian days.",
    href: "/shop",
  },
  {
    title: "Everyday accessories",
    text: "Structured carry pieces that finish the outfit cleanly.",
    href: "/shop",
  },
];

const reviews = [
  {
    name: "Akosua M.",
    location: "Accra",
    text: "The fit felt premium immediately. I wore the denim jacket twice in the first week.",
  },
  {
    name: "Kojo T.",
    location: "Kumasi",
    text: "Clean styles, quick delivery, and the shirt quality is better than expected.",
  },
  {
    name: "Efia S.",
    location: "Takoradi",
    text: "The tote is structured, simple, and works with almost everything I own.",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeScaleIn = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" as const } },
};

function AnimatedSection({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeScaleIn}
    >
      {children}
    </motion.div>
  );
}

function StaggerSection({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        if (!cancelled) {
          setProducts(data);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setProducts(staticProducts);
          setLoading(false);
        }
      }
    }

    loadProducts();
    return () => {
      cancelled = true;
    };
  }, []);

  const featuredProducts = products.filter((product) => product.featured);
  const bestSellers = products.filter((product) => product.bestSeller);
  const heroProducts = featuredProducts.slice(0, 3);
  const mainHeroProduct = heroProducts[0] ?? products[0];
  const supportingHeroProducts = heroProducts.slice(1);

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-150px)] items-center justify-center">
        <p className="text-lg text-slate-500">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="space-y-24">
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeScaleIn}
        className="grid min-h-[calc(100vh-150px)] gap-10 overflow-hidden rounded-[36px] bg-slate-950 text-white shadow-2xl lg:grid-cols-[1fr_0.95fr]">
        <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-14">
          <h1 className="max-w-3xl text-5xl font-bold leading-[0.98] tracking-normal md:text-7xl">
            Sandy&apos;s Trendy Wear
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
            Premium men&apos;s, women&apos;s, and unisex fashion selected for
            confident everyday dressing, warm-weather comfort, and polished
            street style.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/shop"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-bold text-slate-950 shadow-xl shadow-black/20 transition hover:-translate-y-0.5"
            >
              Shop new arrivals
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/about"
              className="inline-flex h-14 items-center justify-center rounded-full border border-white/25 px-7 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Our story
            </Link>
          </div>

          <div className="mt-12 grid gap-5 border-t border-white/10 pt-8 sm:grid-cols-3">
            <div>
              <p className="text-3xl font-bold">4.8</p>
              <p className="mt-1 text-sm text-slate-400">Customer rating</p>
            </div>
            <div>
              <p className="text-3xl font-bold">{products.length}</p>
              <p className="mt-1 text-sm text-slate-400">Curated styles</p>
            </div>
            <div>
              <p className="text-3xl font-bold">30</p>
              <p className="mt-1 text-sm text-slate-400">Day returns</p>
            </div>
          </div>
        </div>

        <div className="relative min-h-[520px] p-5 sm:p-8">
          <div className="absolute inset-x-8 top-8 h-28 rounded-full bg-orange-500/20 blur-3xl" />
          <Link
            href={`/product/${mainHeroProduct.id}`}
            className="group relative block h-full min-h-[520px] overflow-hidden rounded-[32px] bg-slate-900"
          >
            <Image
              src={mainHeroProduct.images[0]}
              alt={mainHeroProduct.name}
              fill
              priority
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-300">
                Featured pick
              </p>
              <h2 className="mt-3 max-w-md text-3xl font-bold">
                {mainHeroProduct.name}
              </h2>
              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950">
                View product
                <ArrowRight size={17} />
              </div>
            </div>
          </Link>

          <div className="absolute right-6 top-8 hidden w-44 space-y-4 xl:block">
            {supportingHeroProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group block overflow-hidden rounded-[24px] bg-white p-2 shadow-2xl shadow-black/25"
              >
                <div className="relative aspect-square overflow-hidden rounded-[18px] bg-slate-100">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="176px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="mt-3 px-1 text-sm font-bold text-slate-950">
                  {product.name}
                </p>
                <p className="px-1 pb-1 text-sm text-slate-500">
                  GHS {product.discountPrice || product.price}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </motion.section>

      <AnimatedSection>
        <section className="grid gap-4 md:grid-cols-3">
          {serviceHighlights.map((item) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.title}
                variants={fadeInUp}
                className="flex items-center gap-5 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                  <Icon size={27} />
                </div>
                <div>
                  <h2 className="font-bold text-slate-950">{item.title}</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {item.text}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <h2 className="text-4xl font-bold leading-tight text-slate-950 md:text-5xl">
              Shop by the way you move.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
              Build a wardrobe around pieces that feel easy, modern, and ready for
              real days in the city.
            </p>
          </div>
          <StaggerSection>
            <div className="grid gap-4 md:grid-cols-3">
              {categories.map((category) => (
                <motion.div key={category.title} variants={fadeInUp}>
                  <Link
                    href={category.href}
                    className="group rounded-[28px] border border-slate-200 bg-slate-50 p-6 transition hover:border-orange-200 hover:bg-orange-50"
                  >
                    <Sparkles className="h-6 w-6 text-orange-500" />
                    <h3 className="mt-8 text-xl font-bold text-slate-950">
                      {category.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {category.text}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-orange-600">
                      Explore
                      <ArrowRight
                        size={16}
                        className="transition group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </StaggerSection>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-4xl font-bold text-slate-950">
                Fresh arrivals
              </h2>
              <p className="mt-3 max-w-2xl text-slate-600">
                A tighter edit of premium staples, selected for fit, texture, and
                everyday repeat wear.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700"
            >
              Browse all products
              <ArrowRight size={17} />
            </Link>
          </div>

          <StaggerSection>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {featuredProducts.map((product) => (
                <motion.div key={product.id} variants={fadeInUp}>
                  <Link
                    href={`/product/${product.id}`}
                    className="group overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                      {product.discountPrice && (
                        <span className="absolute left-4 top-4 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                          Sale
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                        {product.category}
                      </p>
                      <h3 className="mt-3 text-lg font-bold text-slate-950">
                        {product.name}
                      </h3>
                      <div className="mt-4 flex items-center gap-3">
                        <span className="font-bold text-slate-950">
                          GHS {product.discountPrice || product.price}
                        </span>
                        {product.discountPrice && (
                          <span className="text-sm text-slate-400 line-through">
                            GHS {product.price}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </StaggerSection>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="grid overflow-hidden rounded-[36px] bg-slate-100 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-[420px]">
            <Image
              src={bestSellers[0]?.images[0] || products[0].images[0]}
              alt={bestSellers[0]?.name || products[0].name}
              fill
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
            <div className="flex items-center gap-2 text-orange-500">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-5 w-5 fill-orange-500" />
              ))}
            </div>
            <h2 className="mt-7 max-w-2xl text-4xl font-bold leading-tight text-slate-950 md:text-5xl">
              The pieces customers keep reaching for.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
              Best sellers combine clean silhouettes with practical comfort, so
              they work hard across casual plans, travel days, and dressed-up
              evenings.
            </p>
            <StaggerSection>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {bestSellers.map((product) => (
                  <motion.div key={product.id} variants={fadeInUp}>
                    <Link
                      href={`/product/${product.id}`}
                      className="flex items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div>
                        <p className="font-bold text-slate-950">{product.name}</p>
                        <p className="mt-1 text-sm text-slate-500">
                          GHS {product.discountPrice || product.price}
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 shrink-0 text-orange-500" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </StaggerSection>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="grid gap-5 md:grid-cols-3">
          {reviews.map((review, index) => (
            <motion.article
              key={review.name}
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
              className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm"
            >
              <div className="flex items-center gap-1 text-orange-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-orange-500" />
                ))}
              </div>
              <p className="mt-5 text-base leading-7 text-slate-700">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="mt-6">
                <p className="font-bold text-slate-950">{review.name}</p>
                <p className="text-sm text-slate-500">{review.location}</p>
              </div>
            </motion.article>
          ))}
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="overflow-hidden rounded-[36px] bg-slate-950 p-8 text-white shadow-2xl sm:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-orange-300">
                <ShoppingBag size={28} />
              </div>
              <h2 className="mt-7 max-w-2xl text-4xl font-bold leading-tight md:text-5xl">
                Get early access to drops before they sell through.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-slate-300">
                Join the mailing list for new arrivals, limited sale alerts, and
                practical styling notes from Sandy&apos;s Trendy Wear.
              </p>
            </div>
            <form className="rounded-[28px] bg-white p-4 shadow-2xl shadow-black/20 sm:flex sm:items-center sm:gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-14 w-full rounded-full bg-slate-100 px-5 text-sm text-slate-950 outline-none placeholder:text-slate-400"
              />
              <button
                type="button"
                className="mt-3 inline-flex h-14 w-full items-center justify-center rounded-full bg-orange-500 px-7 text-sm font-bold text-white transition hover:bg-orange-600 sm:mt-0 sm:w-auto"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
