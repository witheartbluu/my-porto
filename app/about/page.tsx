"use client";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

const images = [
  "/images/img-1.jpeg",
  "/images/img-2.jpeg",
  // "/images/img-3.jpeg",
  "/images/img-4.jpeg",
  "/images/planify-bg.png",
  "/images/planify-bg.png",
  "/images/planify-bg.png",
  "/images/planify-bg.png",
  "/images/planify-bg.png",
];

export default function About() {
  const x = useMotionValue(0);
  const [paused, setPaused] = useState(false);

  const speed = 1; // pixels per frame

  // Animate frame by frame instead of restart
  useAnimationFrame(() => {
    if (!paused) {
      const current = x.get();
      x.set(current - speed); // move left
    }
  });

  return (
    <section id="about" className="items-center justify-center">
      <div className="flex items-center justify-center">
        <span className="text-gray-400">
          <Image
            src="/images/me.png"
            alt="Profile Picture"
            width={720}
            height={640}
          />
        </span>
      </div>

      <h1 className="text-4xl font-semibold text-center items-center mt-2">
        <span className="text-[#3A328A]">April</span>lia Kusuma
      </h1>

      <div className="flex items-center justify-center gap-4 mt-4 mb-8">
        <div className="border rounded-xl px-4 py-1 bg-[#f9f9f9] font-semibold">
          UI Design
        </div>
        <div className="border rounded-xl px-4 py-1 bg-[#f9f9f9] font-semibold">
          UX Design
        </div>
        <div className="border rounded-xl px-4 py-1 bg-[#f9f9f9] font-semibold">
          Frontend Dev
        </div>
      </div>

      {/* Escalator / Carousel */}
      <div className="overflow-hidden w-full border-t py-10">
        <motion.div
          className="flex gap-6"
          style={{ x }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {[...images, ...images].map((src, i) => (
            <div
              key={i}
              className="min-w-[250px] h-[300px] rounded-xl bg-gray-200 overflow-hidden flex-shrink-0 hover:scale-110 duration-200"
            >
              <Image
                src={src}
                alt={`Project ${i}`}
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </motion.div>
      </div>
      <div className="flex items-center justify-center text-center mt-4">
        <h1 className="text-3xl font-semibold py-2">
          I’m an undergraduate majoring in Information Systems at Universitas
          Pendidikan Ganesha. I design interactive, accessible user interfaces
          and have contributed to several UI/UX projects from research and flows
          to polished UI.
        </h1>
      </div>

      {/* Related Courses */}
      <div className="mt-8 mx-16 rounded-xl border border-[#C9C9C9] bg-[#F9F9F9] p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 items-start">
          <h3 className="text-2xl font-semibold md:col-span-1">
            Related
            <br />
            Courses
          </h3>
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ul className="list-disc pl-5 space-y-2 text-sm md:text-base">
              <li>Mobile Programming</li>
              <li>Web Framework Programming</li>
              <li>Data Mining</li>
            </ul>
            <ul className="list-disc pl-5 space-y-2 text-sm md:text-base">
              <li>Database Management</li>
              <li>UI/UX Design</li>
              <li>IT Project Management</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center text-center mt-16">
        <h1 className="text-3xl font-semibold py-2">
          What am I Currently Working On
        </h1>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-10 px-12 py-8">
        {/* Cards */}
        {/* Taksu Tech */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col items-center text-center px-8 py-10">
            <Image
              src="/images/taksu-logo.png"
              alt="Taksu Tech logo"
              width={160}
              height={48}
              className="h-12 w-auto object-contain"
              priority
            />

            <h2 className="mt-6 text-2xl font-semibold tracking-tight">
              Intern at Taksu Tech
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              August 2025 – <span className="italic">present</span>
            </p>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-600">
              Currently building my portfolio site as an onboarding
              project—aligning with the studio’s stack and code standards—before
              rotating onto a client team project.
            </p>
            <a
              href="https://taksu.tech/"
              className="inline-flex items-center gap-1.5 mt-8 text-blue-800 hover:scale-110 duration-150 underline underline-offset-3 decoration-1"
            >
              Taksu Tech
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </a>
          </div>
        </div>
        {/* Cards */}
        {/* SatuEdu */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col items-center text-center px-8 py-10">
            <Image
              src="/images/satuedu-logo.png"
              alt="Satu Edu logo"
              width={160}
              height={48}
              className="h-12 w-auto object-contain"
              priority
            />

            <h2 className="mt-6 text-2xl font-semibold tracking-tight">
              UI/UX Designer at SatuEdu Foundation
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              February 2025 – <span className="italic">present</span>
            </p>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-600">
              Designed the main website dashboard and SatuEdu’s MLS
              (e-learning). Focus on accessible navigation, clear progress cues,
              and low-bandwidth performance; MLS is preparing for release.
            </p>
            <a
              href="https://www.satuedu.id/en"
              className="inline-flex items-center gap-1.5 mt-8 text-blue-800 hover:scale-110 duration-150 underline underline-offset-3 decoration-1"
            >
              Satu Edu Foundation
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
