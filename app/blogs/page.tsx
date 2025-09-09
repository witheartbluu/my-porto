"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
// import type { LottiePlayer } from 'lottie-web';

interface Blog {
  id: number;
  title: string;
  content: string;
  author: string;
  image?: string;
  category?: string;
  created_at: string;
  updated_at: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null); // <-- add this
  const base = "https://aprillia-porto.up.railway.app"; // TEMP
  const url = `${base}/api/blogs`;

  // useEffect(() => {
  //   fetch("http://127.0.0.1:8080/api/blogs")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setBlogs(data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching blogs:", err);
  //       setLoading(false);
  //     });
  // }, []);

  useEffect(() => {
    const base = (process.env.NEXT_PUBLIC_API_BASE || "").replace(/\/+$/, "");
    const url = `${base}/api/blogs`;
    console.log("NEXT_PUBLIC_API_BASE =", base);
    console.log("Fetching URL          =", url);

    fetch(url, { headers: { Accept: "application/json" }, mode: "cors" })
      .then(async (res) => {
        console.log("Status                =", res.status);
        console.log("Content-Type          =", res.headers.get("content-type"));
        const raw = await res.text();
        console.log("Raw body              =", raw);

        try {
          const json = JSON.parse(raw);
          setBlogs(Array.isArray(json) ? json : json?.data ?? []);
        } catch {
          setBlogs([]);
          setErr("Response was not JSON");
        }
      })
      .catch((e) => {
        console.error("Fetch ERROR:", e);
        setErr(String(e?.message || e));
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center">Loading blogs...</p>;

  return (
    <div className="min-h-screen">
      {/* Title */}
      <section className="px-6 md:px-10 mt-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 mt-4">
          Latest Insights and Trends
        </h2>
      </section>

      {/* Grid of Cards */}
      <div className="px-6 py-4 md:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <Link
            key={blog.id}
            href={`/blogs/details/${blog.id}`}
            className="group flex flex-col border border-black/25 rounded-2xl overflow-hidden hover:scale-102 transition duration-300 hover:shadow-md"
            aria-label={`Open blog: ${blog.title}`}
          >
            <div className="relative">
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-64 object-cover"
                />
              )}
              <div className="px-2 py-1 bg-gray-100 rounded-full text-black/75 text-[12px] absolute top-2 right-2">
                {blog.category || "Uncategorized"}
              </div>
            </div>

            <div className="flex flex-col p-4">
              <h1 className="text-lg font-semibold mb-1 line-clamp-1">
                {blog.title}
              </h1>
              <p className="text-sm text-black/50 line-clamp-2">
                {blog.content}
              </p>
              <hr className="mt-2 opacity-15" />
              <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
                <p className="text-sm mt-1 font-medium text-black/75">
                  {blog.author}
                </p>
                <span>{new Date(blog.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* View More Button */}
      <div className="flex justify-center mt-12">
        <button className="px-6 py-2 border border-black rounded-full hover:bg-black hover:text-white transition">
          View More
        </button>
      </div>
    </div>
  );
}
