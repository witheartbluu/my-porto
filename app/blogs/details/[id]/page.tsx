"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { style } from "framer-motion/client";

type Blog = {
  id: number;
  title: string;
  content: string;
  author?: string;
  category?: string;
  image?: string | null;
  created_at?: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://127.0.0.1:8080";

function normalize(raw: any): Blog | null {
  const b = raw?.data ?? raw?.blog ?? raw?.post ?? raw;
  if (!b) return null;
  return {
    id: Number(b.id),
    title: b.title ?? "",
    content: b.content ?? b.body ?? "",
    author: b.author ?? b.author_name ?? "",
    category:
      b.category ??
      b.category_name ??
      (typeof b.category === "object" ? b.category?.name : undefined),
    image: b.image ?? b.image_url ?? null,
    created_at: b.created_at,
  };
}

export default function BlogDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!id) return;

    const ac = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setErr("");

        // Try /blogs/:id first
        const r = await fetch(
          `${API_BASE}/api/blogs/${encodeURIComponent(String(id))}`,
          { headers: { Accept: "application/json" }, signal: ac.signal }
        );

        const txt = await r.text();
        let json: any;
        try {
          json = JSON.parse(txt);
        } catch {
          json = txt;
        }

        // Some backends return [] for not found
        let b =
          Array.isArray(json) && json.length === 0 ? null : normalize(json);

        // Fallback: fetch list and find the item
        if (!b) {
          const r2 = await fetch(`${API_BASE}/api/blogs`, {
            headers: { Accept: "application/json" },
            signal: ac.signal,
          });
          const list = await r2.json();
          const found = Array.isArray(list)
            ? list.find((x: any) => String(x.id) === String(id))
            : null;
          b = found ? normalize(found) : null;
        }

        if (!b) setErr(`Blog ${id} not found`);
        setBlog(b);
      } catch (e: any) {
        if (e?.name !== "AbortError") setErr("Failed to load blog.");
      } finally {
        setLoading(false);
      }
    })();

    return () => ac.abort();
  }, [id]);

  if (loading)
    return <div className="mx-auto max-w-4xl px-6 py-10">Loading…</div>;

  if (err)
    return (
      <div className="mx-auto max-w-4xl px-6 py-10">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-sm rounded-full border px-3 py-2"
        >
          ← Back
        </Link>
        <p className="mt-6 text-red-600">{err}</p>
      </div>
    );

  if (!blog) return null;

  return (
    <article className="mx-auto max-w-4xl px-6 py-10 font-sans">
      <Link
        href="/blogs"
        className="inline-flex items-center gap-2 text-sm rounded-full border hover:scale-105 duration-100 px-3 py-2"
      >
        ← Back
      </Link>

      <h1 className="mt-4 mb-8 text-4xl md:text-6xl font-bold">{blog.title}</h1>
      <hr className="opacity-10" />
      <div className="mt-8 flex flex-wrap items-center gap-12 text-sm text-black/50">
        {blog.author && (
          <span>
            Author <div className="font-semibold text-lg">{blog.author}</div>
          </span>
        )}
        {blog.category && (
          <span>
            Category
            <div className="font-semibold text-lg">{blog.category}</div>
          </span>
        )}
        {blog.created_at && (
          <span>
            Published on
            <div className="font-semibold text-lg">
              {new Date(blog.created_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </span>
        )}
      </div>

      {blog.image && (
        <div className="mt-6">
          <img
            src={blog.image}
            alt={blog.title}
            className="object-cover object-center w-full "
            onError={(e) => {
              // optional fallback if the URL is broken
              (e.currentTarget as HTMLImageElement).src = "/fallback.jpg";
            }}
            referrerPolicy="no-referrer" // optional, helps for some CDNs
          />
        </div>
      )}

      <div className="mt-8 prose max-w-none">
        <p className="whitespace-pre-line leading-6 text-justify">
          {blog.content}
        </p>
      </div>
    </article>
  );
}
