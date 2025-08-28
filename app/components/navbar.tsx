"use client";
import { useState } from "react";

const NavLinks = [
  { id: 1, title: "About", link: "#about" },
  { id: 2, title: "Projects", link: "#projects" },
  { id: 3, title: "Experiences", link: "#experiences" },
  { id: 4, title: "Contact", link: "#contact" },
  { id: 5, title: "Blog", link: "/blog" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Desktop: center the list. Mobile: grid so the toggle sits on the left */}
      <div className="container mx-auto grid grid-cols-3 items-center py-3 md:flex md:justify-center">
        {/* Bars icon (mobile only) on the left with ml-4 */}
        <button
          className="navbar-toggle justify-self-start ml-4"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((open) => !open)}
        >
          {open ? (
            /* X icon */
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6L18 18M6 18L18 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            /* bars icon */
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 6h18M3 12h18M3 18h18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>

        {/* Centered list on desktop */}
        <ul className="navbar-list">
          {NavLinks.map((l) => (
            <li key={l.id}>
              <a href={l.link} className="navbar-link">
                {l.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile dropdown panel */}
      <div className={`navbar-panel ${open ? "block" : "hidden"}`}>
        <ul className="navbar-list-mobile">
          {NavLinks.map((l) => (
            <li key={l.id}>
              <a
                href={l.link}
                className="navbar-link w-full text-center"
                onClick={() => setOpen(false)}
              >
                {l.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
