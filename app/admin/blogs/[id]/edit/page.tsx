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
  const candidates = [
    raw,
    raw?.data,
    raw?.blog,
    raw?.post,
    raw?.result,
    raw?.item,
  ];
  for (const c of candidates)
    if (c && (c.id || c.title || c.content || c.body)) return c;
  if (Array.isArray(raw) && raw.length) return raw[0];
  return null;
}

function normalizeBlog(raw: any): Blog | null {
  const b = extractBlog(raw);
  if (!b) return null;

  return {
    id: Number(b.id ?? b.blog_id),
    title: b.title ?? "",
    content: b.content ?? b.body ?? "",
    author:
      b.author ??
      b.author_name ??
      b.user_name ??
      (typeof b.user === "object" ? b.user?.name : undefined),
    image: b.image ?? b.image_url ?? b.thumbnail ?? "",
    category:
      b.category ??
      b.category_name ??
      (typeof b.category === "object" ? b.category?.name : b.category_id),
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
  const [submitting, setSubmitting] = useState(false);

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

      const text = await r.text();
      let json: any;
      try {
        json = JSON.parse(text);
      } catch {
        json = text;
      }

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
        setError("Unable to parse blog payload.");
        setLoading(false);
        return;
      }

      setTitle(b.title);
      setContent(b.content);
      setAuthor(b.author ?? "");
      setImage((b.image as string) ?? "");
      setCategory(String(b.category ?? "News"));
      setLoading(false);
    })();
  }, [id, router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    // backend unchanged
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
      setError(resp.message || "Update failed");
      setSubmitting(false);
      return;
    }
    router.replace("/admin/blogs");
  }

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading…
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        {/* Back link (left within centered column) */}
        <div className="mb-4">
          <Link
            href="/admin/blogs"
            className="text-sm rounded-full border px-3 py-2 hover:bg-gray-50"
          >
            ← Back
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-center mb-6">Edit Blog</h1>

        {error && (
          <p className="mb-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-red-700 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm text-gray-700">Title</span>
            <input
              className="mt-1 w-full rounded border px-3 py-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-700">Content</span>
            <textarea
              className="mt-1 w-full min-h-[160px] rounded border px-3 py-2"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write here…"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-700">Author</span>
            <input
              className="mt-1 w-full rounded border px-3 py-2"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Your name"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-700">Image URL (optional)</span>
            <input
              className="mt-1 w-full rounded border px-3 py-2"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://…"
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-700">Category</span>
            <select
              className="mt-1 w-full rounded border px-3 py-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>News</option>
              <option>Education</option>
              <option>Other</option>
            </select>
          </label>

          <div className="pt-2 flex gap-2 justify-center">
            <button
              type="submit"
              disabled={submitting}
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {submitting ? "Saving…" : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded border px-4 py-2 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { apiFetch } from "../../../../lib/api";
// import Link from "next/link";

// type Blog = {
//   id: number;
//   title: string;
//   content: string;
//   author?: string;
//   image?: string | null;
//   category?: string | number;
// };

// function extractBlog(raw: any): any {
//   // try common wrappers
//   const blog = [raw, raw?.data, raw?.blog, raw?.post, raw?.result, raw?.item];
//   for (const b of blog) {
//     if (b && (b.id || b.title || b.content || b.body)) return b;
//   }
//   // sometimes APIs return an array
//   if (Array.isArray(raw) && raw.length) return raw[0];
//   return null;
// }

// function normalizeBlog(raw: any): Blog | null {
//   const b = extractBlog(raw);
//   if (!b) return null;

//   // map many possible server keys
//   const title = b.title ?? "";
//   const content = b.content ?? b.body ?? "";
//   const author =
//     b.author ??
//     b.author_name ??
//     b.user_name ??
//     (typeof b.user === "object" ? b.user?.name : undefined);
//   const image = b.image ?? b.image_url ?? b.thumbnail ?? "";
//   const category =
//     b.category ??
//     b.category_name ??
//     (typeof b.category === "object" ? b.category?.name : b.category_id);

//   return {
//     id: Number(b.id ?? b.blog_id),
//     title,
//     content,
//     author,
//     image,
//     category,
//   };
// }

// export default function EditBlog() {
//   const router = useRouter();
//   const params = useParams<{ id: string }>();
//   const id = params?.id;

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [author, setAuthor] = useState("");
//   const [image, setImage] = useState("");
//   const [category, setCategory] = useState<string>("News");

//   useEffect(() => {
//     if (!id) return;
//     (async () => {
//       const token =
//         typeof window !== "undefined" ? localStorage.getItem("token") : null;
//       if (!token) {
//         router.replace("/admin/login");
//         return;
//       }

//       setLoading(true);
//       setError("");

//       const r = await apiFetch(`/api/blogs/${encodeURIComponent(String(id))}`);
//       if (r.status === 401) {
//         router.replace("/admin/login");
//         return;
//       }
//       const text = await r.text(); // read once
//       let json: any;
//       try {
//         json = JSON.parse(text);
//       } catch {
//         json = text;
//       }

//       console.log("GET /api/blogs/:id raw ->", json); // <--- LOOK HERE in console

//       if (!r.ok) {
//         setError(
//           typeof json === "string"
//             ? json
//             : json?.message || `Failed to load blog #${id}`
//         );
//         setLoading(false);
//         return;
//       }

//       const b = normalizeBlog(json);
//       if (!b) {
//         setError("Unable to parse blog payload. See console for raw response.");
//         setLoading(false);
//         return;
//       }

//       // prefill
//       setTitle(b.title ?? "");
//       setContent(b.content ?? "");
//       setAuthor(b.author ?? "");
//       setImage((b.image as string) ?? "");
//       setCategory(String(b.category ?? "News"));

//       setLoading(false);
//     })();
//   }, [id, router]);

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     setError("");

//     const payload = { title, content, author, image, category };
//     const r = await apiFetch(`/api/blogs/${id}`, {
//       method: "PUT",
//       body: JSON.stringify(payload),
//     });
//     const resp = await r.json().catch(() => ({}));
//     if (r.status === 401) {
//       router.replace("/admin/login");
//       return;
//     }
//     if (!r.ok) {
//       setError(resp.message || JSON.stringify(resp) || "Update failed");
//       return;
//     }

//     router.replace("/admin/blogs");
//   }

//   if (loading) return <div className="p-6">Loading…</div>;

//   return (
//     <div className="px-6 md:px-10 py-8">
//       {/* Header */}
//       <div className="mb-6 flex items-center justify-between">
//         <Link
//           href="/admin/blogs"
//           className="inline-flex items-center gap-2 text-sm rounded-full border px-3 py-2 hover:scale-105 transition"
//         >
//           ← Back
//         </Link>
//         <h1 className="text-3xl md:text-4xl font-bold">Edit Blog ID: {id}</h1>
//         <div className="w-16" />
//       </div>

//       {/* Error */}
//       {error && (
//         <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-red-700">
//           {error}
//         </div>
//       )}

//       {/* Content */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Left: Form Card */}
//         <form
//           onSubmit={handleSubmit}
//           className="lg:col-span-2 rounded-2xl border border-black/10 bg-white shadow-sm"
//         >
//           <div className="p-5 md:p-6 space-y-5">
//             {/* Title */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Title
//               </label>
//               <input
//                 className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 placeholder="Write a clear, compelling headline"
//                 required
//               />
//             </div>

//             {/* Content */}
//             <div>
//               <div className="flex items-center justify-between">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Content
//                 </label>
//                 <span className="text-xs text-gray-400">
//                   {content.length} chars
//                 </span>
//               </div>
//               <textarea
//                 className="mt-1 min-h-[200px] w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
//                 value={content}
//                 onChange={(e) => setContent(e.target.value)}
//                 placeholder="Write your post…"
//                 required
//               />
//             </div>

//             {/* Author & Category */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Author
//                 </label>
//                 <input
//                   className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
//                   value={author}
//                   onChange={(e) => setAuthor(e.target.value)}
//                   placeholder="Your name"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Category
//                 </label>
//                 <select
//                   className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                 >
//                   <option>News</option>
//                   <option>Education</option>
//                   <option>Other</option>
//                 </select>
//               </div>
//             </div>

//             {/* Image */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Image URL
//               </label>
//               <input
//                 className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
//                 value={image}
//                 onChange={(e) => setImage(e.target.value)}
//                 placeholder="https://… (optional)"
//               />
//             </div>
//           </div>

//           {/* Sticky actions */}
//           <div className="sticky bottom-0 border-t bg-white/80 backdrop-blur rounded-b-2xl">
//             <div className="flex items-center justify-end gap-2 p-4">
//               <button
//                 type="button"
//                 onClick={() => router.back()}
//                 className="rounded-lg border px-4 py-2 hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
//               >
//                 Save Changes
//               </button>
//             </div>
//           </div>
//         </form>

//         {/* Right: Live Preview */}
//         <aside className="rounded-2xl border border-black/10 bg-white shadow-sm">
//           <div className="p-5 md:p-6">
//             <h3 className="text-sm font-semibold text-gray-700 mb-3">
//               Live Preview
//             </h3>
//             <div className="overflow-hidden rounded-xl border">
//               <div className="relative aspect-[16/9] bg-gray-100">
//                 {image ? (
//                   <img
//                     src={image}
//                     alt={title || "Preview image"}
//                     className="h-full w-full object-cover"
//                   />
//                 ) : (
//                   <div className="flex h-full items-center justify-center text-gray-400 text-sm">
//                     No image
//                   </div>
//                 )}
//                 <div className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-1 text-xs text-gray-700">
//                   {category || "Uncategorized"}
//                 </div>
//               </div>

//               <div className="p-4">
//                 <h4 className="line-clamp-2 text-lg font-semibold">
//                   {title || "Your title will appear here"}
//                 </h4>
//                 <p className="mt-1 line-clamp-3 text-sm text-gray-600">
//                   {content || "Your content preview will appear here."}
//                 </p>
//                 <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
//                   <span className="font-medium text-gray-700">
//                     {author || "Author"}
//                   </span>
//                   <span>{new Date().toLocaleDateString()}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// }
