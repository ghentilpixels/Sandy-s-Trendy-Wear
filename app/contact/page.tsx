import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

const contactMethods = [
  {
    label: "Email",
    value: "info@sandystrendywear.com",
    href: "mailto:info@sandystrendywear.com",
    icon: Mail,
  },
  {
    label: "Phone",
    value: "+233 24 339 1270",
    href: "tel:+233",
    icon: Phone,
  },
  {
    label: "Location",
    value: "Accra, Ghana",
    href: "https://www.google.com/maps/search/?api=1&query=Accra%2C%20Ghana",
    icon: MapPin,
  },
];

export default function ContactPage() {
  return (
    <div className="space-y-12">
      <section className="grid overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm lg:grid-cols-[0.9fr_1.1fr]">
        <div
          className="min-h-[360px] bg-cover bg-center lg:min-h-[620px]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80')",
          }}
          aria-label="Styled fashion accessories"
          role="img"
        />

        <div className="p-8 sm:p-10 lg:p-14">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
            <MessageCircle size={28} />
          </div>
          <h1 className="mt-8 max-w-2xl text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
            Need help choosing the right fit or order?
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Send a message and our team will help with sizing, delivery,
            product details, returns, or bulk styling requests.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {contactMethods.map((method) => {
              const Icon = method.icon;

              return (
                <Link
                  key={method.label}
                  href={method.href}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-orange-200 hover:bg-orange-50"
                >
                  <Icon className="h-6 w-6 text-orange-500" />
                  <p className="mt-4 text-sm font-semibold text-slate-900">
                    {method.label}
                  </p>
                  <p className="mt-1 text-sm leading-5 text-slate-600">
                    {method.value}
                  </p>
                </Link>
              );
            })}
          </div>

          <form className="mt-10 space-y-5 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Name
                <input
                  type="text"
                  name="name"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:bg-white"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Email
                <input
                  type="email"
                  name="email"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:bg-white"
                />
              </label>
            </div>

            <label className="block space-y-2 text-sm font-medium text-slate-700">
              Subject
              <input
                type="text"
                name="subject"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:bg-white"
              />
            </label>

            <label className="block space-y-2 text-sm font-medium text-slate-700">
              Message
              <textarea
                name="message"
                rows={5}
                className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:bg-white"
              />
            </label>

            <button
              type="button"
              className="inline-flex rounded-full bg-slate-950 px-8 py-4 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Send message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
