"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

type UserProfile = {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  avatar_url: string;
  created_at: string;
};

export default function DashboardPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Editable fields
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ── Load user on mount ──────────────────────────────────────────
  useEffect(() => {
    async function loadUser() {
      const {
        data: { user: authUser },
        error,
      } = await supabase.auth.getUser();

      if (error || !authUser) {
        window.location.href = "/login";
        return;
      }

      // Pull extra profile data from your `profiles` table if you have one
      // Otherwise fall back to auth metadata
      const profile: UserProfile = {
        id: authUser.id,
        email: authUser.email ?? "",
        full_name: authUser.user_metadata?.full_name ?? "",
        phone: authUser.user_metadata?.phone ?? "",
        avatar_url: authUser.user_metadata?.avatar_url ?? "",
        created_at: authUser.created_at,
      };

      setUser(profile);
      setFullName(profile.full_name);
      setPhone(profile.phone);
      setLoading(false);
    }

    loadUser();
  }, []);

  // ── Save profile ────────────────────────────────────────────────
  async function saveProfile() {
    setSaving(true);
    setMessage(null);

    const { error } = await supabase.auth.updateUser({
      data: { full_name: fullName, phone },
    });

    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({ type: "success", text: "Profile updated successfully." });
      setUser((prev) =>
        prev ? { ...prev, full_name: fullName, phone } : prev,
      );
    }
    setSaving(false);
  }

  // ── Change password ─────────────────────────────────────────────
  async function changePassword() {
    setMessage(null);

    if (!newPassword)
      return setMessage({ type: "error", text: "Enter a new password." });
    if (newPassword.length < 6)
      return setMessage({
        type: "error",
        text: "Password must be at least 6 characters.",
      });
    if (newPassword !== confirmPassword)
      return setMessage({ type: "error", text: "Passwords do not match." });

    setSaving(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({ type: "success", text: "Password changed successfully." });
      setNewPassword("");
      setConfirmPassword("");
    }
    setSaving(false);
  }

  // ── Sign out ────────────────────────────────────────────────────
  async function signOut() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  // ── Helpers ─────────────────────────────────────────────────────
  function getInitials(name: string, email: string) {
    if (name)
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    return email[0].toUpperCase();
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  // ── Render ──────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* ── Header ── */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
          <p className="text-xs uppercase tracking-widest text-slate-400 font-medium">
            Customer dashboard
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            Your account
          </h1>
        </div>

        {/* ── Avatar + summary ── */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 flex items-center gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xl font-bold text-white">
            {getInitials(user.full_name, user.email)}
          </div>
          <div className="min-w-0">
            <p className="text-lg font-semibold text-slate-900 truncate">
              {user.full_name || "No name set"}
            </p>
            <p className="text-sm text-slate-500 truncate">{user.email}</p>
            <p className="mt-1 text-xs text-slate-400">
              Member since {formatDate(user.created_at)}
            </p>
          </div>
          <button
            onClick={signOut}
            className="ml-auto shrink-0 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Sign out
          </button>
        </div>

        {/* ── Feedback banner ── */}
        {message && (
          <div
            className={`rounded-xl px-4 py-3 text-sm font-medium ${
              message.type === "success"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* ── Profile details ── */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 space-y-5">
          <h2 className="text-base font-semibold text-slate-900">
            Profile details
          </h2>

          {/* Email — read only */}
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Email address
            </label>
            <div className="rounded-lg bg-slate-50 border border-slate-200 px-3 py-2.5 text-sm text-slate-500 select-all">
              {user.email}
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Email cannot be changed here.
            </p>
          </div>

          {/* Full name */}
          <div>
            <label
              className="block text-xs font-medium text-slate-500 mb-1"
              htmlFor="full-name"
            >
              Full name
            </label>
            <input
              id="full-name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Phone */}
          <div>
            <label
              className="block text-xs font-medium text-slate-500 mb-1"
              htmlFor="phone"
            >
              Phone number
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+233 xx xxx xxxx"
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <button
            onClick={saveProfile}
            disabled={saving}
            className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60 transition-colors"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>

        {/* ── Change password ── */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 space-y-5">
          <h2 className="text-base font-semibold text-slate-900">
            Change password
          </h2>

          <div>
            <label
              className="block text-xs font-medium text-slate-500 mb-1"
              htmlFor="new-password"
            >
              New password
            </label>
            <input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label
              className="block text-xs font-medium text-slate-500 mb-1"
              htmlFor="confirm-password"
            >
              Confirm new password
            </label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your new password"
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <button
            onClick={changePassword}
            disabled={saving}
            className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-60 transition-colors"
          >
            {saving ? "Updating…" : "Update password"}
          </button>
        </div>

        {/* ── Danger zone ── */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-red-100 space-y-3">
          <h2 className="text-base font-semibold text-red-600">Danger zone</h2>
          <p className="text-sm text-slate-500">
            Signing out will end your current session on this device.
          </p>
          <button
            onClick={signOut}
            className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            Sign out of account
          </button>
        </div>
      </div>
    </div>
  );
}
