import {
  GSAP,
  Google,
  NestJS,
  NextJS,
  Playwright,
  PostgreSQL,
  Prisma,
  React,
  TailwindCSS,
  TanStack,
  TypeScript,
} from "./assets/skills-icons";

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
];
