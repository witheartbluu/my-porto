"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "../../lib/api";
import { useRouter } from "next/navigation";

type Blog = {
  id: number;
  title: string;
  author: string;
  category: string;
  created_at: string;
};

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  async function load() {
    setLoading(true);
    setError("");
    const r = await apiFetch("/api/blogs"); // token optional for GET
    if (r.status === 401) {
      router.replace("/admin/login");
      return;
    }
    if (!r.ok) {
      setError("Failed to load blogs");
      setLoading(false);
      return;
    }
    const data = await r.json();
    setBlogs(Array.isArray(data) ? data : data.data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    // guard: require token for admin routes
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      router.replace("/admin/login");
      return;
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Delete this blog?")) return;
    const r = await apiFetch(`/api/blogs/${id}`, { method: "DELETE" });
    if (r.status === 401) {
      router.replace("/admin/login");
      return;
    }
    if (!r.ok) {
      const msg = await r.text();
      alert(msg || "Delete failed");
      return;
    }
    // refresh list
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  }

  if (loading) return <div className="p-6">Loading…</div>;

  return (
    <div className="px-16 py-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-4xl font-bold">Admin Blog Dashboard</h1>
        <Link
          href="/admin/blogs/create"
          className=" text-green-700 font-semibold px-4 py-2 rounded-xl hover:scale-101 duration-200 border-green-600 border hover:shadow-medium"
        >
          + Create New Blog
        </Link>
      </div>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Author</th>
              <th className="p-3 border">Category</th>
              <th className="p-3 border">Created</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((b) => (
              <tr key={b.id} className="border-b">
                <td className="p-3 border">{b.id}</td>
                <td className="p-3 border">{b.title}</td>
                <td className="p-3 border">{b.author}</td>
                <td className="p-3 border">{b.category}</td>
                <td className="p-3 border">
                  {new Date(b.created_at).toLocaleDateString()}
                </td>
                <td className="p-3 border space-x-2">
                  <Link
                    href={`/admin/blogs/${b.id}/edit`}
                    className="border border-blue-600 text-blue-800 hover:bg-blue-500 hover:text-white px-3 py-1 rounded"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(b.id)}
                    className="border border-red-600 text-red-800 hover:bg-red-500 hover:text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {blogs.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-center">
                  No blogs yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
