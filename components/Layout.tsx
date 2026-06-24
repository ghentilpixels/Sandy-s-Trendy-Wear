"use client";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { CartProvider } from "../context/CartContext";
import { AuthProvider } from "../context/AuthContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-white text-slate-900">
          <Header />
          <main className="mx-auto w-full max-w-screen-2xl px-4 pb-20 pt-4 sm:px-6 lg:px-8">
            {children}
          </main>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}
