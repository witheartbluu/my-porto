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

// /lib/api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://127.0.0.1:8080";

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token"); // same key you just saved
}

export async function apiFetch(path: string, opts: RequestInit = {}) {
  const headers = new Headers(opts.headers || {});
  headers.set("Accept", "application/json");

  // Only set JSON header when NOT sending FormData
  if (!(opts.body instanceof FormData))
    headers.set("Content-Type", "application/json");

  const token = getToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_BASE}${path}`, {
    ...opts,
    headers,
    mode: "cors",
  });
  return res;
}
