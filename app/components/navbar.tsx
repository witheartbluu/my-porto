"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const NavLinks = [
  { id: 1, title: "Home", link: "/" },
  { id: 2, title: "About", link: "/about" },
  { id: 3, title: "Works", link: "/works" },
  { id: 4, title: "Contact", link: "/contact" },
  { id: 5, title: "Blog", link: "/blogs" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const OpenResume = () => {
    const pdfUrl = "/CV-Aprillia-Kusuma.pdf";
    window.open(pdfUrl, "_blank");
  };

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;

      if (y < 10) {
        setHidden(false);
      } else if (!open) {
        if (delta > 6) setHidden(true);
        else if (delta < -6) setHidden(false);
      }

      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  return (
    <motion.nav
      initial={{ y: -12, opacity: 0 }}
      animate={hidden ? { y: -80, opacity: 0 } : { y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur"
    >
      <div className="relative mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-md"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6L18 18M6 18L18 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 6h18M3 12h18M3 18h18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>

        {/* Brand */}
        <Link href="/" className="hidden md:block font-semibold tracking-tight">
          Aprillia Kusuma
        </Link>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-6 absolute left-1/2 -translate-x-1/2">
          {NavLinks.map((l) => (
            <li key={l.id}>
              <Link
                href={l.link}
                className="inline-block border hover:bg-black/2 hover:text-[#3A328A] hover:border-[#3A328A] 
                transition-transform duration-200 ease-out hover:scale-105 px-5 py-1 rounded-full"
              >
                {l.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* CV button */}
        <button
          onClick={OpenResume}
          className="hidden md:inline-flex items-center rounded-full border hover:bg-[#3A328A] text-black hover:text-white px-5 py-1 text-smtransition"
        >
          Resume
        </button>
      </div>

      {/* Mobile dropdown */}
      <div className={`md:hidden ${open ? "block" : "hidden"} border-t`}>
        <div className="px-4 py-3">
          <ul className="space-y-2">
            {NavLinks.map((l) => (
              <li key={l.id}>
                <Link
                  href={l.link}
                  className="block py-2 px-4 border rounded-full hover:font-semibold hover:bg-gray-100 hover:opacity-75"
                  onClick={() => setOpen(false)}
                >
                  {l.title}
                </Link>
              </li>
            ))}
          </ul>
          <button
            className="mt-3 inline-flex w-full justify-center rounded-full hover:bg-[#3A328A] text-black border hover:text-white px-5 py-2 text-sm transition"
            onClick={OpenResume}
          >
            Resume
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
