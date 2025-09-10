// import { Blog } from "./blog";

// const API_BASE = "http://127.0.0.1:8080/api";

// export async function getBlogs(): Promise<Blog[]> {
//   const res = await fetch(`${API_BASE}/blogs`);
//   if (!res.ok) throw new Error("Failed to fetch blogs");
//   return res.json();
// }

// export async function createBlog(
//   blog: Omit<Blog, "id" | "created_at" | "updated_at">
// ): Promise<Blog> {
//   const res = await fetch(`${API_BASE}/blogs`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(blog),
//   });
//   if (!res.ok) throw new Error("Failed to create blog");
//   return res.json();
// }

// /BACK TO THIS ANYTIME
// const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://127.0.0.1:8080";

// function getToken() {
//   if (typeof window === "undefined") return null;
//   return localStorage.getItem("token"); // same key you just saved
// }

// export async function apiFetch(path: string, opts: RequestInit = {}) {
//   const headers = new Headers(opts.headers || {});
//   headers.set("Accept", "application/json");

//   // Only set JSON header when NOT sending FormData
//   if (!(opts.body instanceof FormData))
//     headers.set("Content-Type", "application/json");

//   const token = getToken();
//   if (token) headers.set("Authorization", `Bearer ${token}`);

//   const res = await fetch(`${API_BASE}${path}`, {
//     ...opts,
//     headers,
//     mode: "cors",
//   });
//   return res;
// }
// /lib/api.ts

// Resolve API base for browser calls without breaking localhost.
function resolveApiBase(): string {
  // Highest priority: explicit env (works in both dev & prod)
  const envBase =
    process.env.NEXT_PUBLIC_API_BASE || process.env.NEXT_PUBLIC_API_BASE_URL;

  if (envBase) return envBase;

  // Client-side hostname check
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    const port = window.location.port;

    // Local Next dev server -> use Laragon API
    if (
      host === "localhost" ||
      host === "127.0.0.1" ||
      (host === "[::1]" && port === "3000")
    ) {
      return "http://127.0.0.1:8080";
    }
  }

  // Default to Railway in production if nothing else is set
  return "https://aprillia-porto.up.railway.app";
}

const API_BASE = resolveApiBase();

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

// Public helper
export async function apiFetch(path: string, opts: RequestInit = {}) {
  const headers = new Headers(opts.headers || {});
  headers.set("Accept", "application/json");

  // Only set JSON header when sending a body and it's not FormData
  if (
    typeof opts.body !== "undefined" &&
    !(opts.body instanceof FormData) &&
    !headers.has("Content-Type")
  ) {
    headers.set("Content-Type", "application/json");
  }

  // Attach bearer if present
  const token = getToken();
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // Ensure leading slash handling
  const url = `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;

  // Use CORS for cross-origin (local dev → Laragon / prod → Railway)
  return fetch(url, { ...opts, headers, mode: "cors" });
}
