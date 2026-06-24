import Link from "next/link";
import { HeartHandshake, MapPin, Sparkles, Truck } from "lucide-react";

const values = [
  {
    title: "Designed for daily confidence",
    text: "Every piece is selected for strong silhouettes, breathable comfort, and easy styling from weekday plans to weekend moments.",
    icon: Sparkles,
  },
  {
    title: "Rooted in Ghana",
    text: "Our collection is shaped around warm weather, city movement, and the expressive style culture our customers live every day.",
    icon: MapPin,
  },
  {
    title: "Service that keeps pace",
    text: "Fast local delivery, helpful support, and simple returns keep the shopping experience as polished as the clothes.",
    icon: Truck,
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-16">
      <section className="grid overflow-hidden rounded-[32px] border border-slate-200 bg-slate-950 text-white shadow-2xl lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex min-h-[520px] flex-col justify-center p-8 sm:p-12 lg:p-16">
          <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            Fashion essentials made for confident everyday style.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Sandy&apos;s Trendy Wear brings together premium men&apos;s,
            women&apos;s, and unisex pieces for customers who want clothing that
            feels modern, wearable, and expressive without overthinking the fit.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="rounded-full bg-white px-8 py-4 text-sm font-semibold text-slate-950 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Shop the collection
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/25 bg-white/10 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Contact us
            </Link>
          </div>
        </div>
        <div
          className="min-h-[420px] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=1200&q=80')",
          }}
          aria-label="Fashion collection display"
          role="img"
        />
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {values.map((value) => {
          const Icon = value.icon;

          return (
            <article
              key={value.title}
              className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                <Icon size={28} />
              </div>
              <h2 className="mt-6 text-xl font-semibold text-slate-900">
                {value.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {value.text}
              </p>
            </article>
          );
        })}
      </section>

      <section className="grid gap-8 rounded-[32px] border border-slate-200 bg-slate-50 p-8 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:p-12">
        <div>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white">
            <HeartHandshake size={28} />
          </div>
          <h2 className="mt-6 text-3xl font-semibold text-slate-900">
            Built around trust, fit, and repeat wear.
          </h2>
        </div>
        <div className="space-y-5 text-base leading-8 text-slate-600">
          <p>
            We focus on versatile pieces that earn a regular place in your
            wardrobe: soft tees, polished shirts, easy jackets, and accessories
            that finish an outfit cleanly.
          </p>
          <p>
            Every product page is written to help you choose with clarity, from
            sizing and color options to sale pricing and stock availability.
          </p>
        </div>
      </section>
    </div>
  );
}
