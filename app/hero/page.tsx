"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

export default function Hero() {
  const [active, setActive] = useState<number | null>(null);
  const close = () => setActive(null);

  // Close modal on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const [open, setOpen] = useState<number | null>(null);

  const projects = [
    {
      title: "Planify (Find Event Organizer)",
      role: "UI DESIGNER",
      subtitle: "Mobile Application",
      img: "/images/planify-bg.png",
      desc: "Planify is a mobile application that helps everyone to find a trusted and perfect event organizer for their precious event. Planify links clients to professional event organizers. Users compare portfolios, packages, and reviews, request quotes, and confirm details in one place—reducing back-and-forth and speeding up bookings.",
    },
    {
      title: "SatuEdu (SkillUp)",
      role: "UI DESIGNER",
      subtitle: "Website",
      img: "/images/skillup-bg.png",
      desc: "SatuEdu Foundation is a non-profit organization committed to empowering individuals in Indonesia's most underdeveloped regions. The initiative connects learners to quality, inclusive learning resources and support, helping more people start, persist, and finish skill pathways. ",
    },
    // {
    //   title: "Wr. Hokky (Order & Inventory)",
    //   role: "UI DESIGNER",
    //   subtitle: "System",
    //   img: "/images/hokky-bg.png",
    //   desc: "Wr Hokky Order Record is a simple back-of-house system that logs every order, tallies daily sales, and highlights best-selling menu items. Dashboards help staff monitor income, expenses, and stock levels so they can reorder on time and cut waste.",
    // },
    {
      title: "Sushi Man (Digital Order Record)",
      role: "UI DESIGNER & FRONT-END",
      subtitle: "Mobile Application",
      img: "/images/sushiman-bg.png",
      desc: "Sushi Man is a mobile application that serves as a system to record customer orders. SushiMan centralizes customer orders in one mobile app so restaurants can log, track, and fulfill orders without manual slips. It reduces handoff errors, shortens time spent reconciling tickets, and gives staff a clear queue from intake to checkout. ",
    },
    {
      title: "ISSA (Students Achievement)",
      role: "UI DESIGNER",
      subtitle: "Website",
      img: "/images/issa-bg.png",
      desc: "ISSA or Information System Students Achievement is a web platform for submitting, verifying, and reporting student achievements within the Information Systems program. It replaces scattered spreadsheets with a searchable, reliable record and surfaces top achievers for awards and recognition. Faculty get cleaner data; students get visible credit for their work.",
    },
    // {
    //   title: "Baby Growth's Tracker (Digital Logbook)",
    //   role: "UI DESIGNER",
    //   subtitle: "System",
    //   img: "/images/babygrowth-bg.png",
    //   desc: "Baby’s Growth Tracker is a clinic-ready app that records weight, length, and head circumference, visualizes growth over time, and manages immunization schedules. Staff see due/overdue visits at a glance and generate simple reports to improve follow-up.",
    // },
    // {
    //   title: "Selingan (Event Organizer)",
    //   role: "UI DESIGNER & FRONT-END",
    //   subtitle: "Website",
    //   img: "/images/selingan-bg.png",
    //   desc: "Selingan is a web platform to discover and create casual, hands-on activities—bouquet arranging, cake decorating, and more. Built for no-plan weekends: browse nearby sessions, grab a spot, or list your own event in minutes. Less planning, more doing.",
    // },
  ];

  const experiences = [
    {
      title: "AMBITION 2025 – Supervisor",
      desc: "Project Leader (Supervisor) for AMBITION 2025—Teman Ambiss’s Business Plan Competition (June–August 2025), themed “Golden Generation 2045: Building Indonesia’s Economic Resilience Through Strategic Entrepreneurship and Innovation.” Led planning, operations, and marketing; attracted 23 teams (60+ participants) from Universitas Indonesia, Universitas Gadjah Mada, Universitas Airlangga, Universitas Brawijaya, Telkom University, BINUS, and others; retained 52% of registration & sponsorship revenue as net savings; also designed key campaign and event assets.",
      imgs: ["/images/TA-1.png", "/images/TA-2.png"],
      duration: "6 Months (February – September, 2025)",
    },
    {
      title: "HMJ Teknik Informatika – Finance",
      desc: "Treasurer or Finance of HMJ Teknik Information for two periods, from 2023/2024 and 2024/2025. I had responsible to write a cost budgeting for all events and the financial report after the events ended. Coordinated with the Head of Organization, Secretariat, and Division Coordinators to manage events involving 80+ members. Monitored all financial transactions, including the income of contributions from students every semester, and financial assistance from the department.",
      imgs: ["/images/TI-1.png", "/images/TI-2.png"],
      duration: "24 Months (May 2023 – April 2025)",
    },
    {
      title: "UKM HIKM – Chief Continent",
      desc: "Project Officer or the Head of Committee for “International Week 2025”, directed 93 committee members and coordinated activities for 100+ participants from 5 countries (Indonesia, Timor Leste, Netherlands, Taiwan, and Philippines). Supervised six sub-continent divisions, leading a team of 25 members with 3+ continent's events, such as Halloween Party, Poster Competition, Coswalk, Table Manner, and many more. Organized 5+ major events with 300+ attendees: International Night, Exchange Study Seminar, International Competitions. ",
      imgs: ["/images/HIKM-1.png", "/images/HIKM-2.png"],
      duration: "12 Months (June 2024 – May 2025)",
    },
    {
      title: "SatuEdu – UI/UX Designer",
      desc: "Designed the complete UI layout for Skill Up’s new website, improving user experience through intuitive navigation, clean visuals, and responsive design. Collaborated with the development team to ensure seamless integration of design into the final product.",
      imgs: ["/images/SE-1.png", "/images/SE-2.png"],
      duration: "10 Months (February – November, 2025)",
    },
  ];

  // --- Framer Motion: fade Projects section on scroll
  const projectsRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: projectsRef,
    offset: ["start 80%", "end start"], // fade after it enters the viewport
  });
  const projectsOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.55]);

  return (
    <div className="font-sans">
      {/* Home Section */}
      <motion.section
        id="home"
        className="grid md:grid-cols-2 gap-10 p-24 items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          <motion.h1
            className="text-3xl font-bold"
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
            }}
          >
            Welcome to my page,
          </motion.h1>

          <motion.h2
            className="text-6xl font-bold py-2"
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
            }}
          >
            I’m <span className="text-[#3A328A]">April</span>lia Kusuma
          </motion.h2>

          <motion.p
            className="mt-2"
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
            }}
          >
            UI/UX DESIGNER • FRONTEND DEVELOPER
          </motion.p>

          <motion.div
            className="flex gap-4 mt-4"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08 } },
            }}
          >
            {[
              { n: "10+", t: "Experiences" },
              { n: "5+", t: "Projects" },
              { n: "3+", t: "Awards" },
            ].map((s, i) => (
              <motion.div
                key={i}
                className="border border-[#3A328A] hover:shadow-xl shadow-xl w-32 h-30 px-4 py-5 rounded-md text-center items-center justify-center"
                variants={{
                  hidden: { opacity: 0, y: 8, scale: 0.98 },
                  show: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.35 },
                  },
                }}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
              >
                <p className="text-4xl font-bold text-[#3A328A]">{s.n}</p>
                <p className="text-sm">{s.t}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.a
            href="#projects"
            className="inline-block mt-4 underline text-sm"
            whileHover={{ x: 2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            Find more about me →
          </motion.a>
        </motion.div>

        <motion.div
          className="w-full h-88 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="text-gray-400">
            <Image
              src="/images/avatar.png"
              alt="Profile Avatar"
              width={720}
              height={800}
            />
          </span>
        </motion.div>
      </motion.section>

      {/* Projects */}
      <div>
        <motion.section
          id="projects"
          ref={projectsRef}
          style={{ opacity: projectsOpacity }}
          className="p-8 border-t"
        >
          <h2 className="text-5xl font-bold text-center mb-12 mt-4">
            Projects Showcase
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((p, i) => (
              <motion.button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.995 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="group relative rounded-lg overflow-hidden shadow text-left
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                         transform-gpu will-change-transform"
              >
                <Image
                  src={p.img}
                  alt={p.title}
                  width={600}
                  height={410}
                  className="w-full h-auto object-cover rounded-lg items-center"
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
              </motion.button>
            ))}
          </div>
        </motion.section>
        <div className="flex justify-center mb-10">
          <a
            href="/works"
            className="px-6 py-2 border font-medium rounded-full hover:scale-105 duration-200 hover:border-[#3A328A] hover:text-[#3A328A]"
          >
            More Projects
          </a>
        </div>
      </div>

      {/* Modal with mount/unmount animation */}
      <AnimatePresence>
        {active !== null && (
          <ProjectModal project={projects[active]} onClose={close} />
        )}
      </AnimatePresence>

      {/* Experiences */}
      <section id="experiences" className="p-8 border-t">
        <h2 className="text-5xl font-bold mb-6">Impact Through Services</h2>
        <div className="space-y-2">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="border rounded-lg p-4 cursor-pointer"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <p className="font-medium">{exp.title}</p>

              <AnimatePresence initial={false}>
                {open === i && exp.desc && (
                  <motion.div
                    className="mt-4 space-y-4 text-justify "
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    {exp.imgs && exp.imgs.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {exp.imgs.map((src, j) => (
                          <Image
                            key={j}
                            src={src}
                            alt={`${exp.title} image ${j + 1}`}
                            width={600}
                            height={400}
                            className="rounded-md object-cover"
                          />
                        ))}
                      </div>
                    )}

                    <p className="text-sm text-gray-600">{exp.desc}</p>
                    {exp.duration && (
                      <p className="text-xs text-gray-500">{exp.duration}</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* Contact (kept as-is, animations optional) */}
      <section
        id="experiences"
        className="p-4 border-t items-center justify-center"
      >
        <h1 className="text-5xl font-bold mb-6 text-center mt-16">
          Reach Me Out Through These
        </h1>
        <div className="space-x-16 flex justify-center mt-14">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=hi.aprilkusuma@gmail.com"
            target="_blank"
            rel="noreferrer"
            className="border rounded-full px-12 py-2 bg-[#CEC9FF] items-center hover:scale-105 duration-200"
          >
            Gmail
          </a>
          <a
            href="https://wa.me/6289697191353"
            target="_blank"
            rel="noreferrer"
            className="border rounded-full px-12 py-2 bg-[#1ACB58] border-black hover:scale-105 duration-200"
          >
            Whatsapp
          </a>
        </div>
        {/* <p className="text-center mt-16 italic">
          Let’s build something useful.
        </p> */}
        <div className="flex justify-center mt-6">
          <a
            href="/contact"
            className="hover:text-[#3A328A] underline underline-offset-3 text-center hover:scale-105 duration-200"
          >
            Get My Contact
          </a>
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
  // lock background scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[60] overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Wrapper to center the card */}
      <div className="relative z-10 mx-auto min-h-full p-4 md:p-8 flex items-start justify-center">
        {/* Card */}
        <motion.div
          className="relative w-full max-w-3xl rounded-2xl bg-white shadow-xl max-h-[90vh] overflow-hidden flex flex-col"
          initial={{ y: 20, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 10, opacity: 0, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 z-10 rounded-md border px-2 py-1 text-sm hover:bg-gray-50"
          >
            ✕
          </button>

          {/* Non-scrolling header/media */}
          <Image
            src={project.img}
            alt={project.title}
            width={1200}
            height={800}
            className="w-full h-64 md:h-80 object-cover flex-none"
          />

          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto p-6 overscroll-contain">
            <p className="text-sm font-medium text-indigo-600">
              {project.role}
            </p>
            <h3 className="text-2xl md:text-3xl font-semibold">
              {project.title}
            </h3>
            <p className="text-gray-600">{project.subtitle}</p>

            {project.desc && (
              <p className="mt-3 text-gray-700 whitespace-pre-line">
                {project.desc}
              </p>
            )}

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
        </motion.div>
      </div>
    </motion.div>
  );
}
