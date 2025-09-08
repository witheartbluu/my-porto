"use client";
import { useState } from "react";
import Link from "next/link";

export default function CreateBlogPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("News");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You must be logged in");
      return;
    }

    const res = await fetch("http://127.0.0.1:8080/api/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content, author, image, category }),
    });

    if (res.ok) {
      window.location.href = "/admin/blogs";
    } else {
      setError("Failed to create blog");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <Link
        href="/admin/blogs"
        className="inline-flex items-center gap-2 text-sm rounded-full border hover:scale-105 duration-100 px-3 py-2 mb-6"
      >
        ← Back
      </Link>
      <h1 className="text-4xl font-bold mb-6">Create Blog</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          className="w-full border p-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          className="w-full border p-2"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          className="w-full border p-2"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <select
          className="w-full border p-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>News</option>
          <option>Education</option>
          <option>Other</option>
        </select>
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Create
        </button>
      </form>
    </div>
  );
}
