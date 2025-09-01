export type Category = "Website" | "Mobile Application" | "Others";

export type Work = {
  details: string;
  title: string;
  role: string;
  duration: string;
  cover: string;
  image: string;
  description: string;
  category: Category;
  content?: string; // optional long body for details page
};

export const works: Work[] = [
  {
    details: "satuedu-skillup",
    title: "SatuEdu (SkillUp)",
    role: "UI/UX Designer",
    duration: "1 Week (February 2025)",
    cover: "/images/satuedu-1.png",
    image: "/images/satuedu-2.png",
    description:
      "SatuEdu Foundation is a non-profit organization committed to empowering individuals in Indonesia's most underdeveloped regions. The initiative connects learners to quality, inclusive learning resources and support.",
    category: "Website",
    content:
      "As UI/UX Designer for SatuEdu (SkillUp), I addressed fragmented access and low-bandwidth constraints faced by learners in underserved Indonesian regions. I interviewed students and mentors, mapped device/offline habits, and designed a lightweight, text-first experience with a single-screen onboarding and a clear Browse → Enroll → Start path. I specified tokens, reusable components, and state behavior (empty/error/loading), with accessibility details like alt text and keyboard focus. Clickable prototypes informed copy tweaks and simpler forms. Key choices—single-screen onboarding, compressed assets, and consistent progress cues—reduced early exits and made it easier for mentors to guide first-time users. Result: clearer paths to content and smoother onboarding (final metrics to be added: completion rate and time to first lesson). Next: offline reading, SMS/WhatsApp reminders, and learning streaks.",
  },
  {
    details: "planify",
    title: "Planify (EO Finder)",
    role: "UI/UX Designer & Front End Developer",
    duration: "2 Weeks (January - February 2024)",
    cover: "/images/planify-1.png",
    image: "/images/planify-2.png",
    description:
      "Planify is a mobile application that helps everyone to find a trusted and perfect event organizer for their precious event. Planify links clients to professional event organizers. Users compare portfolios, packages, and reviews, request quotes, and confirm details in one place—reducing back-and-forth and speeding up bookings.",
    category: "Mobile Application",
    content:
      "In Year 2, Semester 4 of my mobile programming course, I built a small practice prototype to help clients discover and compare event organizers. In a lean Product/UX role, I designed only a few core screens: EO profile with portfolio and standardized package cards for apples-to-apples comparison, a simple compare view, and a templated RFQ form with lightweight in-app messaging to cut back-and-forth. The scope was intentionally limited (no full booking/contract flows), but it clarified key decision criteria and demonstrated the core UX patterns for discovery and comparison. If extended, next steps would add calendar sync, deposits, and standardized contracts.",
  },
  {
    details: "sushiman",
    title: "Sushi Man",
    role: "UI/UX Designer & Front End Developer",
    duration: "4 Months (February - June 2024)",
    cover: "/images/sushiman-1.png",
    image: "/images/sushiman-2.png",
    description:
      "Sushi Man is a mobile application that serves as a system to record customer orders. SushiMan centralizes customer orders in one mobile app so restaurants can log, track, and fulfill orders without manual slips. It reduces handoff errors, shortens time spent reconciling tickets, and gives staff a clear queue from intake to checkout. ",
    category: "Mobile Application",
    content:
      "In a three-person team, we built SushiMan, a mobile app for recording and tracking restaurant orders. I led UI/UX—turning our brainstorm into flows, wireframes, and high-fidelity screens (using licensed Freepik assets with proper credits). I defined clear order states (e.g., new/sent/paid/void) and a simple item-plus-modifier pattern to speed entry and reduce mistakes. On the frontend, I implemented several admin views—most notably the payment-notification page—covering form validation, status updates, and navigation. I also helped standardize component names and basic design tokens (spacing, type, color) and ensured accessible tap targets.",
  },
  {
    details: "issa",
    title: "ISSA",
    role: "UI/UX Designer",
    duration: "4 Months (February - June 2023)",
    cover: "/images/issa-1.png",
    image: "/images/issa-2.png",
    description:
      "ISSA or Information System Students Achievement is a web platform for submitting, verifying, and reporting student achievements within the Information Systems program. It replaces scattered spreadsheets with a searchable, reliable record and surfaces top achievers for awards and recognition. Faculty get cleaner data; students get visible credit for their work.",
    category: "Website",
    content:
      "As UI/UX Designer for ISSA (Information System Students Achievement), my team and I replaced scattered spreadsheets/forms with a centralized achievements system. This was a project offered directly by our Head of Study Program, Mr. Dendi Maysanjaya in a program called PIM (Project Independen Mandiri). After mapping the current workflow and edge cases, I designed a guided submission form with status tracking, a reviewer queue (search/filter), and simple roles (student and admin) plus exportable reports. I standardized evidence fields and file limits to cut back-and-forth, added duplicate detection and a read-only audit trail for traceability, and ran test data passes to refine uploads. Result: cleaner records, faster verification and award shortlists, and fewer lost submissions. Next: bulk import, email notifications, and analytics on volume/categories.",
  },
  {
    details: "wrhokky",
    title: "Wr. Hokky (Digital Tracker)",
    role: "UI/UX Designer",
    duration: "1 Month (March 2023)",
    cover: "/images/wrhokky-1.png",
    image: "/images/wrhokky-2.png",
    description:
      "Wr Hokky Order Record is a simple back-of-house system that logs every order, tallies daily sales, and highlights best-selling menu items. Dashboards help staff monitor income, expenses, and stock levels so they can reorder on time and cut waste.",
    category: "Others",
    content:
      "As part of my Software Analysis & Design course (Semester 2, 2023), I created the SRS and UI prototype for Wr Hokky Order Record, a proposal to digitize a restaurant’s paper-based ordering and reconciliation. I interviewed the owner, mapped AS-IS workflows (lost tickets, slow close-of-day, stock-outs) and defined TO-BE flows with clear order states and back-of-house dashboards (daily sales, best-sellers, income/expenses, stock). Deliverables included the SRS (scope, use cases, non-functional requirements), a data model and user stories, plus high-fidelity mockups for one-screen order capture and BOH analytics. Note: this was a UI/analysis project only (no implementation), but the design outlined a feasible MVP and was informally validated with the business. Next: implement the MVP, add low-stock alerts, role permissions, and printable summaries.",
  },
  {
    details: "babygrowth",
    title: "Baby's Growth Tracker (Digital Tracker)",
    role: "UI/UX Designer",
    duration: "1 Month (March 2023)",
    cover: "/images/babygrowth-1.png",
    image: "/images/babygrowth-2.png",
    description:
      "Baby’s Growth Tracker is a clinic-ready app that records weight, length, and head circumference, visualizes growth over time, and manages immunization schedules. Staff see due/overdue visits at a glance and generate simple reports to improve follow-up.",
    category: "Others",
    content:
      "For our Software Engineering course, my team partnered with a Puskesmas in Buleleng that still tracked growth and immunization schedules on paper (easy to lose/damage). We documented the AS-IS workflow, defined the TO-BE process, and produced an SRS (scope, use cases, data model, non-functional requirements such as privacy, low-bandwidth, and offline-first). I helped design the UI prototype: child profiles with weight/length/head-circumference entries, simple growth-over-time charts, color-coded due/overdue immunization states, printable daily/weekly visit lists, and lightweight reporting. We minimized required fields for speed at reception and kept print-friendly outputs so clinics could transition gradually. Outcome: validated flows with staff, clarified data rules, and prioritized an MVP for digitizing records. Note: analysis/UI only (no implementation). Next: implement the MVP, add SMS reminders, role-based access and audit logs, and optional multi-clinic sync.",
  },
  {
    details: "selingan",
    title: "Selingan",
    role: "UI/UX Designer & Front End Developer",
    duration: "4 Months (September 2024 - January 2025)",
    cover: "/images/selingan-1.png",
    image: "/images/selingan-2.png",
    description:
      "Selingan is a web platform to discover and create casual, hands-on activities—bouquet arranging, cake decorating, and more. Built for no-plan weekends: browse nearby sessions, grab a spot, or list your own event in minutes. Less planning, more doing.",
    category: "Website",
    content:
      "A project that my team and I did in September 2024 until January 2025 in the Web Framework Programming course. Selingan helps connect people and event creators to offer them fun ragam (events) such as bouquet arranging, cake decorating, etc. It is easy to find and host, solving scattered discovery and clunky bookings. In a UI/UX + frontend role, I designed key flows and shipped the Ragam (browse by category) and Create Ragam pages, with light backend work for create-flow validation and data handling. We used status filter (upcoming ragam and past ragam), standardized listing fields, and clear “materials included” badges to speed decisions. Despite a heavy semester, the team delivered core flows—browse, view, create—with mobile-first layouts, strong empty/error/loading states, and a draft-save for hosts. Next: payments/refunds, host dashboards/ratings, reminders, and moderation tools.",
  },
  {
    details: "music-player",
    title: "Music Player",
    role: "UI/UX Designer & Front End Developer",
    duration: "2 Months (November - December 2024)",
    cover: "/images/musicplayer-1.png",
    image: "/images/musicplayer-2.png",
    description:
      "Music Player is a coursework project implementing full CRUD for playlists and tracks with in-app playback. Users create playlists, add or remove tracks, and update details via clean, form-based flows.",
    category: "Website",
    content:
      "Built alongside Selingan, this midterm challenge was a small web app that implements full CRUD for playlists and tracks with embedded YouTube links for audio/video playback. I led UI/UX (overall look, layout, and clear empty/loading/error states) and handled frontend for the music and song pages—routing, forms, list/detail views, and embed-based playback—plus a bit of backend wiring for data handling. The result was a focused prototype that demonstrated working CRUD and reliable in-app playback under tight exam timelines.",
  },
];
