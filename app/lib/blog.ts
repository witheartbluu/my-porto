export type Blog = {
  id: number;
  title: string;
  content: string;
  image: string;
  created_at: string;
  updated_at: string;
};
import { apiFetch } from "./api";

export async function getBlogs() {
  const r = await apiFetch("/api/blogs");
  return r.json();
}
export async function createBlog(payload: any) {
  const r = await apiFetch("/api/blogs", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return r.json();
}
export async function updateBlog(id: number | string, payload: any) {
  const r = await apiFetch(`/api/blogs/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  return r.json();
}
export async function deleteBlog(id: number | string) {
  const r = await apiFetch(`/api/blogs/${id}`, { method: "DELETE" });
  return r.json();
}
