"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import Footer from "./footer";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideChrome = pathname === "/admin/login";

  return (
    <>
      {!hideChrome && <Navbar />}
      {children}
      {!hideChrome && <Footer />}
    </>
  );
}
