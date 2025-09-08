// // simple localStorage + (optional) cookie for middleware redirects
// export function getToken() {
//   if (typeof window === "undefined") return null;
//   return localStorage.getItem("token");
// }
// export function setToken(token: string) {
//   if (typeof window === "undefined") return;
//   localStorage.setItem("token", token);
//   // optional non-HttpOnly cookie so middleware can read it
//   document.cookie = `token=${token}; path=/; SameSite=Lax`;
// }
// export function clearToken() {
//   if (typeof window === "undefined") return;
//   localStorage.removeItem("token");
//   document.cookie = "token=; Max-Age=0; path=/; SameSite=Lax";
// }

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}
export function setToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem("token", token);
}
export function clearToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("token");
}
