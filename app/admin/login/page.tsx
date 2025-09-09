// app/admin/login/page.tsx
"use client";

import { setToken } from "@/app/lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

const API_BASE =
  (process.env.NEXT_PUBLIC_API_BASE || "").replace(/\/+$/, "") ||
  "http://127.0.0.1:8080"; // local fallback only in dev

export default function AdminLogin() {
  const router = useRouter();
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
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        // If you switch to cookie-based auth later, add: credentials: "include"
        body: JSON.stringify({ email, password }),
        mode: "cors",
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(`Login failed (${res.status}) ${txt}`);
      }

      const data = await res.json();
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
        <div className="px-6 py-8 border rounded-2xl items-center">
          <h1 className="text-3xl font-bold text-center mt-4 mb-8">
            Welcome, Admin!
          </h1>

          {err && (
            <p className="mb-3 text-sm text-red-600 break-words">{err}</p>
          )}

          <h2 className="text-sm font-medium opacity-75">Email</h2>
          <input
            name="email"
            type="email"
            required
            className="input w-full border px-2 py-2 rounded-lg border-black/10"
            placeholder="Email"
          />

          <h2 className="text-sm font-medium mt-3 opacity-75">Password</h2>
          <input
            name="password"
            type="password"
            required
            className="input w-full border px-2 py-2 rounded-lg border-black/10"
            placeholder="Password"
          />

          <button
            disabled={loading}
            className="btn w-full border mt-6 px-2 py-2 rounded-lg border-black/10 hover:bg-[#3A3282] hover:text-white disabled:opacity-60"
          >
            {loading ? "Logging in…" : "Login"}
          </button>
        </div>
      </form>

      <footer className="w-full px-6 py-10 border-t mt-16 text-sm text-center">
        © {new Date().getFullYear()} My Portofolio
        <h1 className="text-center">Made by Aprillia Kusuma</h1>
      </footer>
    </div>
  );
}
