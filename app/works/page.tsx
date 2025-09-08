"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { works as ALL_WORKS, type Work, type Category } from "@/app/lib/work";

type FilterCat = "all" | Category;

// Card ------------------------------------------------------
function Card({
  title,
  cover,
  description,
  href,
}: {
  title: string;
  cover: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-3xl"
    >
      <div className="group h-full overflow-hidden rounded-3xl border border-gray-200 bg-white transition duration-250 hover:shadow-md hover:scale-102">
        <div className="relative aspect-[16/9]">
          <Image
            src={cover}
            alt={title}
            fill
            className="object-cover"
            sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
          />
        </div>
        <div className="h-[2px] bg-gray-100" />
        <div className="p-6">
          <h3 className="text-xl md:text-2xl font-semibold leading-tight">
            {title}
          </h3>
          <p className="mt-2 text-gray-600 text-sm md:text-base leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function Works() {
  const [activeCat, setActiveCat] = useState<FilterCat>("all");

  const seg = (k: FilterCat) =>
    `px-4 py-2 text-sm md:text-base focus:outline-none
     focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500
     ${
       activeCat === k ? "bg-[#3A3282] text-white" : "bg-white hover:bg-gray-50"
     }`;

  const filtered = useMemo<Work[]>(() => {
    if (activeCat === "all") return ALL_WORKS;
    return ALL_WORKS.filter((p) => p.category === activeCat);
  }, [activeCat]);

  return (
    <div className="min-h-screen">
      {/* Title */}
      <section className="px-6 md:px-10 mt-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 mt-4">
          Projects Showcase
        </h2>
      </section>

      {/* Segmented control */}
      <section className="px-6 md:px-10 mt-6">
        <div className="mx-auto max-w-5xl flex items-center justify-center">
          <div className="overflow-x-auto">
            <div
              role="tablist"
              aria-label="Filter works"
              className="inline-flex rounded-full border overflow-hidden divide-x"
            >
              {/* All Design Btn */}
              <button
                role="tab"
                aria-selected={activeCat === "all"}
                className={seg("all")}
                onClick={() => setActiveCat("all")}
              >
                <span className="flex items-center gap-2">
                  {/* Icon (inline SVG) */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                    />
                  </svg>
                  {/* Text */}
                  All Designs
                </span>
              </button>

              <button
                role="tab"
                aria-selected={activeCat === "Website"}
                className={seg("Website")}
                onClick={() => setActiveCat("Website")}
              >
                <span className="flex items-center gap-2">
                  {/* Icon (inline SVG) */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
                    />
                  </svg>
                  {/* Text */}
                  Website
                </span>
              </button>
              <button
                role="tab"
                aria-selected={activeCat === "Mobile Application"}
                className={seg("Mobile Application")}
                onClick={() => setActiveCat("Mobile Application")}
              >
                <span className="flex items-center gap-2">
                  {/* Icon (inline SVG) */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                    />
                  </svg>
                  {/* Text */}
                  Mobile Application
                </span>
              </button>
              <button
                role="tab"
                aria-selected={activeCat === "Others"}
                className={seg("Others")}
                onClick={() => setActiveCat("Others")}
              >
                <span className="flex items-center gap-2">
                  {/* Icon (inline SVG) */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z"
                    />
                  </svg>
                  {/* Text */}
                  Others
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <main className="px-6 py-4 md:px-10 mt-12 mb-16">
        <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch text-justify">
          {filtered.map((p) => (
            <Link
              key={p.details}
              href={`/works/${p.details}`}
              className="rounded-2xl shadow-md overflow-hidden flex flex-col border border-black/25 hover:scale-102 duration-300 cursor-pointer"
            >
              {/* Cover image */}
              <img
                src={p.cover}
                alt={p.title}
                className="w-full h-48 object-cover object-center"
              />

              {/* Card body */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg font-semibold mb-2">{p.title}</h3>

                <p className="text-gray-600 line-clamp-3 mb-4 md:text-justify sm:text-justify text-justify">
                  {p.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
