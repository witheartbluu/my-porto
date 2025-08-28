// // 'use client'; // only if you need client hooks

// function Hero() {
//   return (
//     <section
//       id="about"
//       className="max-w-screen-xl px-6 md:px-[100px] py-12 mx-10 align-middle justify-center font-instrument-sans"
//     >
//       <div className="flex flex-col md:flex-row gap-16">
//         <div className="flex flex-col flex-1">
//           <h1 className="text-2xl font-bold py-2">Welcome to my page,</h1>
//           <h2 className="text-4xl font-bold">Hi I'm April</h2>

//           <div className="flex flex-row gap-10 py-2 mt-2">
//             <div className="flex flex-col">UI/UX DESIGNER</div>
//             <div className="flex flex-col">WEB DEVELOPER</div>
//           </div>
//           <div className="flex flex-row gap-4">
//             <div className="grid md:grid-cols-3 items-center justify-center gap-8 py-2">
//               <div className="border-2 rounded-lg py-6 px-2 border-[#3A328A]">
//                 <h3 className="font-bold text-3xl items-center">10+</h3>
//                 <p className="font-semibold items-center">Experiences</p>
//               </div>
//               <div className="border-2 rounded-lg py-6 px-2 border-[#3A328A]">
//                 <h3 className="font-bold text-3xl">5+</h3>
//                 <p className="font-semibold">Projects</p>
//               </div>
//               <div className="border-2 rounded-lg py-6 px-2 border-[#3A328A]">
//                 <h3 className="font-bold text-3xl">3+</h3>
//                 <p className="font-semibold">Awards</p>
//               </div>
//             </div>
//           </div>

//           <a
//             href="#"
//             className="text-[14px] font-medium bg-transparent py-2 hover:text-[#2274A5] hover:font-bold transition duration-300"
//           >
//             Find more about me
//           </a>
//         </div>
//         <div className="flex flex-col flex-1">
//           <h1 className="text-2xl font-bold">picture</h1>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Hero;

// app/page.tsx (Next.js 13+ with App Router)
// If using pages router, save this as pages/index.tsx

"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export default function Hero() {
  const [active, setActive] = useState<number | null>(null);
  const close = () => setActive(null);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const [open, setOpen] = useState<number | null>(null);

  const projects = [
    {
      title: "Planify (Event Organizer)",
      role: "UI DESIGNER",
      subtitle: "Mobile Application",
      img: "/images/planify-bg.png",
    },
    {
      title: "Wr. Hokky (Order Taker)",
      role: "UI DESIGNER",
      subtitle: "System",
      img: "/images/hokky-bg.png",
    },
    {
      title: "ISSA (Student Achievement System)",
      role: "UI DESIGNER",
      subtitle: "Website",
      img: "/images/issa-bg.png",
    },
    {
      title: "Baby Growth's Tracker (System Tracker)",
      role: "UI DESIGNER",
      subtitle: "System",
      img: "/images/babygrowth-bg.png",
    },
    {
      title: "Sushi Man (Order Taker)",
      role: "UI DESIGNER & FRONT-END",
      subtitle: "Mobile Application",
      img: "/images/sushiman-bg.png",
    },
    {
      title: "Selingan (Event Organizer)",
      role: "UI DESIGNER & FRONT-END",
      subtitle: "Website",
      img: "/images/selingan-bg.png",
    },
  ];

  const experiences = [
    {
      title: "P2M – Panitia",
      desc: "Lorem ipsum dolor sit amet consectetur. Urna diam rhoncus facilisis commodo consectetur aliquet diam facilisis leo. Quis ut urna odio urna suspendisse nulla volutpat. Augue placerat erat non sit amet. Cras id ligula sit ipsum eu nunc. Pellentesque lacinia ut convallis tellus varius consequat.",
      img: "/experience.jpg",
      duration: "9 Months (February – November, 2025)",
    },
    {
      title: "AMBITION 2025 – Supervisor",
      desc: "Lorem ipsum dolor sit amet consectetur. Urna diam rhoncus facilisis commodo consectetur aliquet diam facilisis leo. Quis ut urna odio urna suspendisse nulla volutpat. Augue placerat erat non sit amet. Cras id ligula sit ipsum eu nunc. Pellentesque lacinia ut convallis tellus varius consequat.",
      img: "/experience.jpg",
      duration: "9 Months (February – November, 2025)",
    },
    {
      title: "HMJ Teknik Informatika – Finance",
      desc: "Lorem ipsum dolor sit amet consectetur. Urna diam rhoncus facilisis commodo consectetur aliquet diam facilisis leo. Quis ut urna odio urna suspendisse nulla volutpat. Augue placerat erat non sit amet. Cras id ligula sit ipsum eu nunc. Pellentesque lacinia ut convallis tellus varius consequat.",
      img: "/experience.jpg",
      duration: "9 Months (February – November, 2025)",
    },
    {
      title: "UKM HIKM – Chief Continent",
      desc: "Lorem ipsum dolor sit amet consectetur. Urna diam rhoncus facilisis commodo consectetur aliquet diam facilisis leo. Quis ut urna odio urna suspendisse nulla volutpat. Augue placerat erat non sit amet. Cras id ligula sit ipsum eu nunc. Pellentesque lacinia ut convallis tellus varius consequat.",
      img: "/experience.jpg",
      duration: "9 Months (February – November, 2025)",
    },
    {
      title: "SatuEdu – UI/UX Designer",
      desc: "Lorem ipsum dolor sit amet consectetur. Urna diam rhoncus facilisis commodo consectetur aliquet diam facilisis leo. Quis ut urna odio urna suspendisse nulla volutpat. Augue placerat erat non sit amet. Cras id ligula sit ipsum eu nunc. Pellentesque lacinia ut convallis tellus varius consequat.",
      img: "/experience.jpg",
      duration: "9 Months (February – November, 2025)",
    },
  ];

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section
        id="about"
        className="grid md:grid-cols-2 gap-10 p-24 items-center"
      >
        <div>
          <h1 className="text-2xl font-bold">Welcome to my page,</h1>
          <h2 className="text-5xl font-bold">
            I’m <span className="text-purple-700">April</span>
          </h2>
          <p className="mt-2">UI/UX DESIGNER • WEB DEVELOPER</p>

          <div className="flex gap-4 mt-4">
            <div className="border p-2 rounded-md text-center">
              <p className="text-lg font-bold">10+</p>
              <p className="text-sm">Experiences</p>
            </div>
            <div className="border p-2 rounded-md text-center">
              <p className="text-lg font-bold">5+</p>
              <p className="text-sm">Projects</p>
            </div>
            <div className="border p-2 rounded-md text-center">
              <p className="text-lg font-bold">3+</p>
              <p className="text-sm">Awards</p>
            </div>
          </div>

          <a
            href="#experiences"
            className="inline-block mt-4 underline text-sm"
          >
            Find more about me →
          </a>
        </div>

        <div className="border rounded-lg w-full h-64 flex items-center justify-center">
          <span className="text-gray-400">[Image Placeholder]</span>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="p-8 border-t">
        <h2 className="text-5xl font-bold text-center mb-12 mt-4">
          My Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className="group relative rounded-lg overflow-hidden shadow text-left
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Image
                src={p.img} // "call this /images/planify-cover.png"
                alt={p.title}
                width={600}
                height={410} // 600 * 700 / 1024 ≈ 410
                className="w-full h-auto object-cover rounded-lg"
                sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
              />
              <span className="absolute top-4 left-4 z-20 text-3xl font-semibold text-white drop-shadow">
                {p.role}
              </span>

              {/* Dim overlay */}
              <div className="absolute inset-0 z-10 bg-black/20 group-hover:bg-black/30 transition-colors" />

              {/* Bottom text block */}
              <div className="absolute inset-x-0 bottom-0 z-20 p-4 text-white">
                <h3 className="text-4xl font-semibold">{p.title}</h3>
                <p className="text-md">{p.subtitle}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Mount the modal when a card is active */}
      {active !== null && (
        <ProjectModal project={projects[active]} onClose={close} />
      )}

      {/* Experiences */}
      <section id="experiences" className="p-8 border-t">
        <h2 className="text-5xl font-bold mb-6">My Experiences</h2>
        <div className="space-y-2">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="border rounded-lg p-4 cursor-pointer"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <p className="font-medium">{exp.title}</p>
              {open === i && exp.desc && (
                <div className="mt-4 space-y-2">
                  {exp.img && (
                    <Image
                      src={exp.img}
                      alt={exp.title}
                      width={600}
                      height={400}
                      className="rounded-md"
                    />
                  )}
                  <p className="text-sm text-gray-600">{exp.desc}</p>
                  {exp.duration && (
                    <p className="text-xs text-gray-500">{exp.duration}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="experiences" className="p-8 border-t">
        <h2 className="text-5xl font-bold mb-6">Contact Me</h2>
        <div className="space-y-2">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="border rounded-lg p-4 cursor-pointer"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <p className="font-medium">{exp.title}</p>
              {open === i && exp.desc && (
                <div className="mt-4 space-y-2">
                  {exp.img && (
                    <Image
                      src={exp.img}
                      alt={exp.title}
                      width={600}
                      height={400}
                      className="rounded-md"
                    />
                  )}
                  <p className="text-sm text-gray-600">{exp.desc}</p>
                  {exp.duration && (
                    <p className="text-xs text-gray-500">{exp.duration}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: {
    title: string;
    role: string;
    subtitle: string;
    img: string;
    desc?: string;
    link?: string;
  };
  onClose: () => void;
}) {
  // lock scroll while modal is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-[60]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Card */}
      <div className="relative z-10 mx-auto mt-16 w-[92vw] max-w-3xl overflow-hidden rounded-2xl bg-white shadow-xl">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 rounded-md border px-2 py-1 text-sm hover:bg-gray-50"
        >
          ✕
        </button>

        <Image
          src={project.img}
          alt={project.title}
          width={1200}
          height={700}
          className="w-full h-64 md:h-80 object-cover"
        />

        <div className="p-6">
          <p className="text-sm font-medium text-indigo-600">{project.role}</p>
          <h3 className="text-2xl md:text-3xl font-semibold">
            {project.title}
          </h3>
          <p className="text-gray-600">{project.subtitle}</p>

          {project.desc && <p className="mt-3 text-gray-700">{project.desc}</p>}

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
              View details
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
