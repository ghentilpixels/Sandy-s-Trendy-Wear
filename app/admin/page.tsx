"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Package, ShoppingCart, Users, BarChart3 } from "lucide-react";

type Stats = {
  totalOrders: number;
  totalRevenue: string;
  totalCustomers: number;
  totalProducts: number;
};

export default function AdminPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/overview");
        const data = await res.json();
        setStats(data);
      } catch {
        setStats(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const sections = [
    { name: "Products", href: "/admin/products", icon: Package, count: stats?.totalProducts ?? 0 },
    { name: "Orders", href: "/admin/orders", icon: ShoppingCart, count: stats?.totalOrders ?? 0 },
    { name: "Customers", href: "/admin/customers", icon: Users, count: stats?.totalCustomers ?? 0 },
  ];

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border p-8 bg-white shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Admin Dashboard</h1>
        <p className="text-sm text-slate-500">
          Manage products, orders and customers from here.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-full text-center text-slate-500">Loading stats...</div>
        ) : (
          sections.map((section) => (
            <Link
              key={section.name}
              href={section.href}
              className="rounded-3xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
                    {section.name}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                    {section.count}
                  </h3>
                </div>
                <section.icon className="h-10 w-10 text-indigo-600" />
              </div>
            </Link>
          ))
        )}
        {stats && (
          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
                  Revenue
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                  GHS {stats.totalRevenue}
                </h3>
              </div>
              <BarChart3 className="h-10 w-10 text-indigo-600" />
            </div>
          </div>
        )}
      </div>

      <div className="rounded-3xl border bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/admin/products"
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:from-indigo-700 hover:to-purple-700"
          >
            <Package className="h-4 w-4" />
            Manage Products
          </Link>
          <Link
            href="/admin/orders"
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:from-indigo-700 hover:to-purple-700"
          >
            <ShoppingCart className="h-4 w-4" />
            View Orders
          </Link>
          <Link
            href="/admin/customers"
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:from-indigo-700 hover:to-purple-700"
          >
            <Users className="h-4 w-4" />
            Manage Customers
          </Link>
        </div>
      </div>
    </div>
  );
}