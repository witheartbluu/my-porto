// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// export default function CreateBlogPage() {
//   const router = useRouter();

//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [author, setAuthor] = useState("");
//   const [image, setImage] = useState("");
//   const [category, setCategory] = useState("News");
//   const [error, setError] = useState("");
//   const [submitting, setSubmitting] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setSubmitting(true);

//     const token = localStorage.getItem("token");
//     if (!token) {
//       setSubmitting(false);
//       setError("You must be logged in");
//       return;
//     }

//     // backend unchanged
//     const res = await fetch("http://127.0.0.1:8080/api/blogs", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ title, content, author, image, category }),
//     });

//     if (res.ok) {
//       router.replace("/admin/blogs");
//     } else {
//       setError("Failed to create blog");
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="font-sans min-h-screen flex items-center justify-center px-4">
//       {/* Centered column */}
//       <div className="w-full max-w-2xl mt-10">
//         {/* Back link sits left within centered column */}
//         <div className="mb-4 ">
//           <Link
//             href="/admin/blogs"
//             className="text-sm rounded-full border px-3 py-2 hover:bg-gray-50"
//           >
//             ← Back
//           </Link>
//         </div>

//         <h1 className="text-4xl font-bold text-center mb-6">Create Blog</h1>

//         {error && (
//           <p className="mb-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-red-700 text-center">
//             {error}
//           </p>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <label className="block">
//             <span className="text-sm text-gray-700">Title</span>
//             <input
//               className="mt-1 w-full rounded border px-3 py-2"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               placeholder="Title"
//               required
//             />
//           </label>

//           <label className="block">
//             <span className="text-sm text-gray-700">Content</span>
//             <textarea
//               className="mt-1 w-full min-h-[160px] rounded border px-3 py-2"
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               placeholder="Write here…"
//               required
//             />
//           </label>

//           <label className="block">
//             <span className="text-sm text-gray-700">Author</span>
//             <input
//               className="mt-1 w-full rounded border px-3 py-2"
//               value={author}
//               onChange={(e) => setAuthor(e.target.value)}
//               placeholder="Your name"
//               required
//             />
//           </label>

//           <label className="block">
//             <span className="text-sm text-gray-700">Image URL (optional)</span>
//             <input
//               className="mt-1 w-full rounded border px-3 py-2"
//               value={image}
//               onChange={(e) => setImage(e.target.value)}
//               placeholder="https://…"
//             />
//           </label>

//           <label className="block">
//             <span className="text-sm text-gray-700">Category</span>
//             <select
//               className="mt-1 w-full rounded border px-3 py-2"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//             >
//               <option>News</option>
//               <option>Education</option>
//               <option>Other</option>
//             </select>
//           </label>

//           <div className="pt-2 flex gap-2 justify-center">
//             <button
//               type="submit"
//               disabled={submitting}
//               className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-60"
//             >
//               {submitting ? "Creating…" : "Create"}
//             </button>
//             <button
//               type="button"
//               onClick={() => router.back()}
//               className="rounded border px-4 py-2 hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
// app/admin/blogs/create/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/app/lib/api";

export default function CreateBlogPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("News");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      setSubmitting(false);
      setError("You must be logged in");
      return;
    }

    try {
      const res = await apiFetch("/api/blogs", {
        method: "POST",
        body: JSON.stringify({ title, content, author, image, category }),
      });

      if (res.status === 401) {
        router.replace("/admin/login");
        return;
      }

      if (!res.ok) {
        const msg = (await res.text()) || "Failed to create blog";
        setError(msg.slice(0, 300));
        setSubmitting(false);
        return;
      }

      router.replace("/admin/blogs");
    } catch (err: any) {
      setError(err?.message || "Failed to create blog");
      setSubmitting(false);
    }
  };

  return (
    <div className="font-sans min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-2xl mt-10">
        <div className="mb-4 ">
          <Link
            href="/admin/blogs"
            className="text-sm rounded-full border px-3 py-2 hover:bg-gray-50"
          >
            ← Back
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-center mb-6">Create Blog</h1>

        {error && (
          <p className="mb-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-red-700 text-center break-words">
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
              className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-60"
            >
              {submitting ? "Creating…" : "Create"}
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
