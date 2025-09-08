// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { apiFetch } from "../../lib/api";
// import { useRouter } from "next/navigation";

// type Blog = {
//   id: number;
//   title: string;
//   author: string;
//   category: string;
//   created_at: string;
// };

// export default function AdminBlogs() {
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const router = useRouter();

//   async function load() {
//     setLoading(true);
//     setError("");
//     const r = await apiFetch("/api/blogs"); // token optional for GET
//     if (r.status === 401) {
//       router.replace("/admin/login");
//       return;
//     }
//     if (!r.ok) {
//       setError("Failed to load blogs");
//       setLoading(false);
//       return;
//     }
//     const data = await r.json();
//     setBlogs(Array.isArray(data) ? data : data.data ?? []);
//     setLoading(false);
//   }

//   useEffect(() => {
//     // guard: require token for admin routes
//     const token =
//       typeof window !== "undefined" ? localStorage.getItem("token") : null;
//     if (!token) {
//       router.replace("/admin/login");
//       return;
//     }
//     load();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   async function handleDelete(id: number) {
//     if (!confirm("Delete this blog?")) return;
//     const r = await apiFetch(`/api/blogs/${id}`, { method: "DELETE" });
//     if (r.status === 401) {
//       router.replace("/admin/login");
//       return;
//     }
//     if (!r.ok) {
//       const msg = await r.text();
//       alert(msg || "Delete failed");
//       return;
//     }
//     // refresh list
//     setBlogs((prev) => prev.filter((b) => b.id !== id));
//   }

//   if (loading) return <div className="p-6">Loading…</div>;

//   return (
//     <div className="px-16 py-8">
//       <div className="flex items-center justify-between mb-4">
//         <h1 className="text-4xl font-bold">Admin Blog Dashboard</h1>
//         <Link
//           href="/admin/blogs/create"
//           className=" text-green-700 font-semibold px-4 py-2 rounded-xl hover:scale-101 duration-200 border-green-600 border hover:shadow-medium"
//         >
//           + Create New Blog
//         </Link>
//       </div>

//       {error && <p className="text-red-500 mb-3">{error}</p>}

//       <div className="overflow-x-auto">
//         <table className="min-w-full border">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3 border">ID</th>
//               <th className="p-3 border">Title</th>
//               <th className="p-3 border">Author</th>
//               <th className="p-3 border">Category</th>
//               <th className="p-3 border">Created</th>
//               <th className="p-3 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {blogs.map((b) => (
//               <tr key={b.id} className="border-b">
//                 <td className="p-3 border">{b.id}</td>
//                 <td className="p-3 border">{b.title}</td>
//                 <td className="p-3 border">{b.author}</td>
//                 <td className="p-3 border">{b.category}</td>
//                 <td className="p-3 border">
//                   {new Date(b.created_at).toLocaleDateString()}
//                 </td>
//                 <td className="p-3 border space-x-2">
//                   <Link
//                     href={`/admin/blogs/${b.id}/edit`}
//                     className="border border-blue-600 text-blue-800 hover:bg-blue-500 hover:text-white px-3 py-1 rounded"
//                   >
//                     Edit
//                   </Link>
//                   <button
//                     onClick={() => handleDelete(b.id)}
//                     className="border border-red-600 text-red-800 hover:bg-red-500 hover:text-white px-3 py-1 rounded"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {blogs.length === 0 && (
//               <tr>
//                 <td colSpan={6} className="p-6 text-center">
//                   No blogs yet.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "../../lib/api";
import { useRouter } from "next/navigation";

type Blog = {
  id: number;
  title: string;
  author: string;
  category?: string;
  created_at: string;
  image?: string | null; // <- used by the card
  content?: string | null; // <- short preview
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
    if (!confirm("Are you sure you want to delete this blog?")) return;
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
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  }

  if (loading) return <div className="p-6">Loading…</div>;

  return (
    <div className="min-h-screen">
      {/* Title + Create */}
      <section className="px-6 md:px-10 mt-6 mb-6 grid grid-cols-1 md:grid-cols-2 items-center gap-4">
        <h2 className="text-4xl md:text-5xl font-bold">
          Latest Insights and Trends
        </h2>

        <div className="flex md:justify-end">
          <Link
            href="/admin/blogs/create"
            className="inline-flex gap-2 border border-green-700 text-green-800 px-4 py-2 rounded-full hover:bg-green-600 hover:text-white transition"
          >
            + Create New Blog
          </Link>
        </div>

        {error && <p className="text-red-500 md:col-span-2">{error}</p>}
      </section>

      {/* Grid of Cards */}
      <div className="px-6 py-4 md:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="group flex flex-col border border-black/25 rounded-2xl overflow-hidden hover:scale-102 transition duration-300 hover:shadow-md"
          >
            <Link
              href={`/blogs/details/${blog.id}`}
              aria-label={`Open blog: ${blog.title}`}
              className="relative block"
            >
              {blog.image ? (
                // Using <img> since you're fetching external URLs. If using next/image, be sure to whitelist domains.
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-64 object-cover"
                />
              ) : (
                <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                  No image
                </div>
              )}
              <div className="px-2 py-1 bg-gray-100 rounded-full text-black/75 text-[12px] absolute top-2 right-2">
                {blog.category || "Uncategorized"}
              </div>
            </Link>

            <div className="flex flex-col p-4">
              <h1 className="text-lg font-semibold mb-1 line-clamp-1">
                {blog.title}
              </h1>
              <p className="text-sm text-black/50 line-clamp-2">
                {blog.content || ""}
              </p>
              <hr className="mt-2 opacity-15" />
              <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
                <p className="text-sm mt-1 font-medium text-black/75">
                  {blog.author}
                </p>
                <span>{new Date(blog.created_at).toLocaleDateString()}</span>
              </div>

              {/* Admin actions inside the card */}
              <div className="mt-3 flex items-center gap-2">
                <Link
                  href={`/admin/blogs/${blog.id}/edit`}
                  className="border border-yellow-600 text-yellow-800 hover:bg-yellow-600 hover:text-white px-3 py-1 rounded-full text-sm"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="border border-red-600 text-red-800 hover:bg-red-600 hover:text-white px-3 py-1 rounded-full text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {blogs.length === 0 && (
          <div className="col-span-full text-center py-16 text-gray-500">
            No blogs yet.
          </div>
        )}
      </div>

      {/* View More (optional, can wire to pagination later) */}
      {/* <div className="flex justify-center mt-12 mb-10">
        <button
          onClick={load}
          className="px-6 py-2 border border-black rounded-full hover:bg-black hover:text-white transition"
        >
          View More
        </button>
      </div> */}
    </div>
  );
}
