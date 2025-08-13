import {
  Chrome,
  GSAP,
  Google,
  NestJS,
  NextJS,
  Playwright,
  PostgreSQL,
  Prisma,
  RadixUI,
  React,
  SQLite,
  TailwindCSS,
  TanStack,
  TypeScript,
  Vitest,
  Zod,
  tRPC,
} from "./assets/skills-icons";
import Nextjs from "./assets/skills-icons/next-js";

export const PERSONAL_PROJECTS = [
  {
    name: "Scrapper",
    image: "/project-imgs/scrapper.webp",
    links: [
      {
        title: "Live",
        url: "https://jobs-scrapper-fe.vercel.app/",
      },
      {
        title: "GitHub/FE",
        url: "https://github.com/Iamsheye/scrapper-fe",
      },
      {
        title: "GitHub/BE",
        url: "https://github.com/Iamsheye/google-jobs-crawler",
      },
    ],
    skills: [
      { icon: React, name: "React" },
      { icon: TypeScript, name: "TypeScript" },
      { icon: TailwindCSS, name: "Tailwind CSS" },
      { icon: TanStack, name: "Router" },
      { icon: GSAP, name: "GSAP" },
      { icon: Google, name: "OAuth" },
      { icon: NestJS, name: "Nest.js" },
      { icon: Prisma, name: "Prisma" },
      { icon: PostgreSQL, name: "PostgreSQL" },
      { icon: Playwright, name: "Playwright" },
    ],
  },
  {
    name: "Olusegun Ayodele Portfolio",
    image: "/project-imgs/oa-portfolio.webp",
    links: [
      {
        title: "Live",
        url: "https://drayowhyte.com",
      },
    ],
    skills: [
      { icon: NextJS, name: "Next.js" },
      { icon: TypeScript, name: "TypeScript" },
      { icon: TailwindCSS, name: "Tailwind CSS" },
      { icon: GSAP, name: "GSAP" },
    ],
  },
  {
    name: "Crypto Stats Table",
    image: "/project-imgs/crypto-stats-table.webp",
    links: [
      {
        title: "Live",
        url: "https://aratus.vercel.app/",
      },
      {
        title: "GitHub",
        url: "https://github.com/Iamsheye/aratus",
      },
    ],
    skills: [
      { icon: React, name: "React" },
      { icon: Nextjs, name: "Next.js" },
      { icon: TypeScript, name: "TypeScript" },
      { icon: TailwindCSS, name: "Tailwind CSS" },
      { icon: TanStack, name: "TanStack Query, Table" },
      { icon: RadixUI, name: "Radix UI" },
    ],
  },
  {
    name: "Social Detox",
    image: "/project-imgs/social-detox.webp",
    links: [
      {
        title: "Chrome Store",
        url: "https://chromewebstore.google.com/detail/social-detox/ebnlimbphgnkajonhihaneeeldjebpnm",
      },
      {
        title: "Edge Add-ons",
        url: "https://microsoftedge.microsoft.com/addons/detail/social-detox/mbaopldognjphkclpnjhngkdddbmkbaa?hl=en-US",
      },
      {
        title: "GitHub",
        url: "https://github.com/Iamsheye/social-detox",
      },
    ],
    skills: [
      { icon: Chrome, name: "Web Extension" },
      { icon: React, name: "React" },
      { icon: TypeScript, name: "TypeScript" },
      { icon: TailwindCSS, name: "Tailwind CSS" },
    ],
  },
  {
    name: "Assessment #1",
    image: "/project-imgs/assessment-1.webp",
    links: [
      {
        title: "Live",
        url: "https://lema-task-production.up.railway.app/",
      },
      {
        title: "GitHub",
        url: "https://github.com/Iamsheye/lema-task",
      },
    ],
    skills: [
      { icon: React, name: "React" },
      { icon: TypeScript, name: "TypeScript" },
      { icon: TailwindCSS, name: "Tailwind CSS" },
      { icon: TanStack, name: "TanStack Query, Router, Table" },
      { icon: RadixUI, name: "Radix UI" },
      { icon: tRPC, name: "tRPC" },
      { icon: Zod, name: "Zod" },
      { icon: SQLite, name: "SQLite" },
    ],
  },
  {
    name: "Assessment #2",
    image: "/project-imgs/assessment-2.webp",
    links: [
      {
        title: "Live",
        url: "https://savannah-test.vercel.app/",
      },
      {
        title: "GitHub",
        url: "https://github.com/Iamsheye/savannah-test",
      },
    ],
    skills: [
      { icon: React, name: "React" },
      { icon: TypeScript, name: "TypeScript" },
      { icon: TailwindCSS, name: "Tailwind CSS" },
      { icon: RadixUI, name: "Radix UI" },
      { icon: Zod, name: "Zod" },
      { icon: TanStack, name: "TanStack Query, Router" },
      { icon: Vitest, name: "Vitest" },
    ],
  },
  {
    name: "Assessment #3",
    image: "/project-imgs/assessment-3.webp",
    links: [
      {
        title: "Live",
        url: "https://astsec-assessment.vercel.app/",
      },
      {
        title: "GitHub",
        url: "https://github.com/Iamsheye/astsec-assessment",
      },
    ],
    skills: [
      { icon: React, name: "React" },
      { icon: Nextjs, name: "Next.js" },
      { icon: TypeScript, name: "TypeScript" },
      { icon: TailwindCSS, name: "Tailwind CSS" },
      { icon: RadixUI, name: "Radix UI" },
      { icon: Zod, name: "Zod" },
    ],
  },
];
