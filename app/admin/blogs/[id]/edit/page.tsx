"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiFetch } from "../../../../lib/api";
import Link from "next/link";

type Blog = {
  id: number;
  title: string;
  content: string;
  author?: string;
  image?: string | null;
  category?: string | number;
};

function extractBlog(raw: any): any {
  // try common wrappers
  const candidates = [
    raw,
    raw?.data,
    raw?.blog,
    raw?.post,
    raw?.result,
    raw?.item,
  ];
  for (const c of candidates) {
    if (c && (c.id || c.title || c.content || c.body)) return c;
  }
  // sometimes APIs return an array
  if (Array.isArray(raw) && raw.length) return raw[0];
  return null;
}

function normalizeBlog(raw: any): Blog | null {
  const b = extractBlog(raw);
  if (!b) return null;

  // map many possible server keys
  const title = b.title ?? "";
  const content = b.content ?? b.body ?? "";
  const author =
    b.author ??
    b.author_name ??
    b.user_name ??
    (typeof b.user === "object" ? b.user?.name : undefined);
  const image = b.image ?? b.image_url ?? b.thumbnail ?? "";
  const category =
    b.category ??
    b.category_name ??
    (typeof b.category === "object" ? b.category?.name : b.category_id);

  return {
    id: Number(b.id ?? b.blog_id),
    title,
    content,
    author,
    image,
    category,
  };
}

export default function EditBlog() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState<string>("News");

  useEffect(() => {
    if (!id) return;
    (async () => {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        router.replace("/admin/login");
        return;
      }

      setLoading(true);
      setError("");

      const r = await apiFetch(`/api/blogs/${encodeURIComponent(String(id))}`);
      if (r.status === 401) {
        router.replace("/admin/login");
        return;
      }
      const text = await r.text(); // read once
      let json: any;
      try {
        json = JSON.parse(text);
      } catch {
        json = text;
      }

      console.log("GET /api/blogs/:id raw ->", json); // <--- LOOK HERE in console

      if (!r.ok) {
        setError(
          typeof json === "string"
            ? json
            : json?.message || `Failed to load blog #${id}`
        );
        setLoading(false);
        return;
      }

      const b = normalizeBlog(json);
      if (!b) {
        setError("Unable to parse blog payload. See console for raw response.");
        setLoading(false);
        return;
      }

      // prefill
      setTitle(b.title ?? "");
      setContent(b.content ?? "");
      setAuthor(b.author ?? "");
      setImage((b.image as string) ?? "");
      setCategory(String(b.category ?? "News"));

      setLoading(false);
    })();
  }, [id, router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const payload = { title, content, author, image, category };
    const r = await apiFetch(`/api/blogs/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    const resp = await r.json().catch(() => ({}));
    if (r.status === 401) {
      router.replace("/admin/login");
      return;
    }
    if (!r.ok) {
      setError(resp.message || JSON.stringify(resp) || "Update failed");
      return;
    }

    router.replace("/admin/blogs");
  }

  if (loading) return <div className="p-6">Loading…</div>;

  return (
    <div className="px-16 py-8">
      <Link
        href="/admin/blogs"
        className="inline-flex items-center gap-2 text-sm rounded-full border hover:scale-105 duration-100 px-3 py-2 mb-8"
      >
        ← Back
      </Link>
      <h1 className="text-4xl font-bold mb-6">Edit Blog ID: {id}</h1>
      {error && <p className="text-red-500 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="">
        <h1 className="font-semibold text-md opacity-75">Title</h1>
        <input
          className="border px-3 py-2 w-full rounded mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <h1 className="font-semibold text-md opacity-75">Description</h1>
        <textarea
          className="border px-3 py-2 w-full rounded mb-4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          required
        />
        <h1 className="font-semibold text-md opacity-75">Author</h1>
        <input
          className="border px-3 py-2 w-full rounded mb-4"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
          required
        />
        <h1 className="font-semibold text-md opacity-75">Image URL</h1>
        <input
          className="border px-3 py-2 w-full rounded mb-4"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL (optional)"
          required
        />
        <h1 className="font-semibold text-md opacity-75">Category</h1>
        <select
          className="border px-3 py-2 w-full rounded mb-4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>News</option>
          <option>Education</option>
          <option>Other</option>
        </select>

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 hover:scale-102 duration-200 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="border px-4 py-2 rounded hover:bg-red-600 hover:text-white hover:scale-102 duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
