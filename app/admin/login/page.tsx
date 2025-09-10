// app/admin/login/page.tsx
"use client";

import { setToken } from "@/app/lib/auth";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

// Resolve API base for dev/prod
function getApiBase(): string {
  // Prefer explicit env (set in .env.local / Vercel)
  const fromEnv =
    process.env.NEXT_PUBLIC_API_BASE || process.env.NEXT_PUBLIC_API_BASE_URL; // support either name
  if (fromEnv) return fromEnv;

  // Fallbacks
  if (
    typeof window !== "undefined" &&
    window.location.hostname === "localhost"
  ) {
    return "http://127.0.0.1:8080";
  }
  return "https://aprillia-porto.up.railway.app";
}

export default function AdminLogin() {
  const router = useRouter();
  const API_BASE = useMemo(getApiBase, []);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "");
    const password = String(form.get("password") || "");

    try {
      const res = await fetch(`${API_BASE}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Read as text first to gracefully handle non-JSON error bodies
      const raw = await res.text();
      let data: any = {};
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        /* ignore parse error; we'll use raw if needed */
      }

      if (!res.ok) {
        const msg =
          data?.error ||
          data?.message ||
          raw?.slice(0, 200) ||
          `Login failed (${res.status})`;
        throw new Error(msg);
      }

      const token: string | undefined =
        data.access_token ?? data.token ?? data?.data?.token;

      if (!token) throw new Error("No token returned by /api/login");

      setToken(token);
      router.replace("/admin/blogs");
    } catch (e: any) {
      setErr(e?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full mt-32">
      <form onSubmit={handleLogin} className="space-y-4 max-w-sm mx-auto p-6">
        <div className="px-6 py-8 border rounded-2xl">
          <h1 className="text-3xl font-bold text-center mt-2 mb-6">
            Welcome, Admin!
          </h1>

          {err && (
            <p className="mb-3 text-sm text-red-600 break-words" role="alert">
              {err}
            </p>
          )}

          <label className="text-sm font-medium opacity-75" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="username"
            className="mt-1 w-full border px-3 py-2 rounded-lg border-black/10"
            placeholder="admin@email.com"
          />

          <label
            className="text-sm font-medium mt-3 opacity-75 block"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="mt-1 w-full border px-3 py-2 rounded-lg border-black/10"
            placeholder="••••••••"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full border mt-6 px-3 py-2 rounded-lg border-black/10 hover:bg-[#3A3282] hover:text-white disabled:opacity-60"
          >
            {loading ? "Logging in…" : "Login"}
          </button>

          {/* Helpful runtime hint (remove if you don't want it) */}
          <p className="mt-3 text-xs text-gray-500 break-all">
            API: {API_BASE}
          </p>
        </div>
      </form>

      <footer className="w-full px-6 py-10 border-t mt-16 text-sm text-center">
        © {new Date().getFullYear()} My Portofolio
        <h1 className="text-center">Made by Aprillia Kusuma</h1>
      </footer>
    </div>
  );
}
