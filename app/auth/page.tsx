"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { LogIn, UserPlus, Mail, Lock, User } from "lucide-react";

export default function AuthPage() {
const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { login, register, user } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (user) {
      router.push(user.role === "admin" ? "/admin" : "/dashboard");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === "login") await login(form.email, form.password);
      else await register(form.name, form.email, form.password);
    } catch {
      // Auth errors handled by context
    }
  };

  return (
    <div className="mx-auto max-w-5xl rounded-[32px] border border-slate-200 bg-white shadow-xl">
      <div className="grid md:grid-cols-2">
        <div className="relative hidden overflow-hidden rounded-l-[32px] bg-gradient-to-br from-slate-900 to-slate-800 md:block">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-indigo-500 blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-purple-500 blur-3xl"></div>
          </div>
          <div className="relative flex h-full flex-col items-center justify-center p-12 text-center">
            <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white">
                {mode === "login" ? "Welcome Back!" : "Join Us Today"}
              </h2>
              <p className="mt-3 text-slate-300">
                {mode === "login"
                  ? "Sign in to access your account and continue shopping."
                  : "Create an account to enjoy exclusive benefits."}
              </p>
            </div>
          </div>
        </div>
        <div className="p-10">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
                Account
              </p>
              <h1 className="mt-3 text-3xl font-semibold">
                {mode === "login" ? "Welcome back" : "Create your account"}
              </h1>
            </div>
            <button
              onClick={() => setMode((m) => (m === "login" ? "register" : "login"))}
              className="rounded-full border border-slate-300 bg-slate-100 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
            >
              {mode === "login" ? "Register" : "Login"}
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === "register" && (
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Full name
                </label>
                <div className="relative mt-2">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-2xl border border-slate-300 py-3.5 pl-12 pr-4 text-slate-900 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    required
                  />
                </div>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Email address
              </label>
              <div className="relative mt-2">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-2xl border border-slate-300 py-3.5 pl-12 pr-4 text-slate-900 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="relative mt-2">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full rounded-2xl border border-slate-300 py-3.5 pl-12 pr-4 text-slate-900 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 py-4 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              {mode === "login" ? (
                <>
                  <LogIn className="h-4 w-4" />
                  Sign In
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4" />
                  Create Account
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
