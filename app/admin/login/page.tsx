"use client";
import { setToken } from "../../lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLogin() {
  const router = useRouter();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "");
    const password = String(form.get("password") || "");

    const r = await fetch("http://127.0.0.1:8080/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!r.ok) {
      alert("Login failed");
      return;
    }
    const data = await r.json();

    // IMPORTANT: pick the right key per your backend
    const token = data.access_token ?? data.token;
    if (!token) {
      alert("No token returned");
      return;
    }

    setToken(token);
    console.log("Saved token:", token); // quick check
    router.replace("/admin/blogs"); // optional
  }

  return (
    <div className="min-h-screen w-full mt-32">
      <form onSubmit={handleLogin} className="space-y-4 max-w-sm mx-auto p-6">
        <div className=" px-6 py-8 border rounded-2xl items-center">
          <h1 className="text-3xl font-bold text-center mt-4 mb-8">
            Welcome, Admin!
          </h1>
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
          <button className="btn w-full border mt-6 px-2 py-2 rounded-lg border-black/10 hover:bg-[#3A3282] hover:text-white">
            Login
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
