import { useGSAP } from "@gsap/react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useRef, useState } from "react";
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
} from "@/assets/tsx-icons";
import FeSweLogo from "@/assets/FeSwe";
import Flowers from "@/assets/Flower";
import Button from "@/components/button";
import Mushroom from "@/assets/Mushroom";
import Fire from "@/assets/Fire";

const SearchSchema = z.object({
  tab: z.enum(["projects", "experience", "about"]).catch("projects"),
});

export const Route = createFileRoute("/")({
  component: App,
  validateSearch: SearchSchema,
});

const PERSONAL_PROJECTS = [
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

function App() {
  const { tab } = Route.useSearch();

  const mainSectionRef = useRef<HTMLDivElement | null>(null);
  const [hoverProjectIndex, setHoverProjectIndex] = useState<number | null>(
    null,
  );
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useGSAP(
    () => {
      gsap.to("#fe-swe", {
        rotate: 360,
        duration: 6,
        repeat: -1,
        ease: "none",
      });

      const flowerWidth = document.querySelector("#flowers")?.clientWidth;
      const width = mainSectionRef.current?.clientWidth;

      const tl = gsap.timeline({
        repeat: -1,
        ease: "power2.inOut",
        delay: 1.25,
      });

      tl.to("#flowers", {
        duration: 12,
        x: width ? width - (flowerWidth ? flowerWidth : 0) + 40 : 0,
        rotate: 2160,
      }).to("#flowers", {
        duration: 12,
        x: 0,
        rotation: -1080,
      });
    },
    {
      scope: mainSectionRef.current!,
    },
  );

  useGSAP(
    () => {
      const GSAP_DESKTOP = gsap.matchMedia();

      if (hoverProjectIndex !== null) {
        PERSONAL_PROJECTS.forEach((_, ind) => {
          if (ind !== hoverProjectIndex) {
            GSAP_DESKTOP.add(`(min-width: 768px)`, () => {
              gsap.to(`#img-container-${ind}`, {
                clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
                duration: 0.3,
                ease: "power3.in",
              });
            });
          }
        });

        GSAP_DESKTOP.add(`(min-width: 768px)`, () => {
          gsap.to(`#img-container-${hoverProjectIndex}`, {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 0.8,
            ease: "power3.out",
          });
        });
      } else {
        PERSONAL_PROJECTS.forEach((_, ind) => {
          GSAP_DESKTOP.add(`(min-width: 768px)`, () => {
            // gsap.to(`#img-container-${ind}`, {
            //   clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            //   duration: 0.3,
            //   ease: "power3.out",
            // });
            gsap.to(`#img-container-${ind}`, {
              clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
              duration: 0.3,
              ease: "power3.out",
              x: 0,
              y: 0,
            });
          });
        });
      }
    },
    { dependencies: [hoverProjectIndex] },
  );

  useGSAP(
    () => {
      if (hoverProjectIndex !== null) {
        gsap.to(`#img-container-${hoverProjectIndex}`, {
          x: cursorPosition.x * 0.25,
          y: cursorPosition.y * 0.25,
          duration: 0.35,
          ease: "power1.out",
        });
      }
    },
    { dependencies: [cursorPosition, hoverProjectIndex] },
  );

  useGSAP(
    () => {
      gsap.to("#fire", {
        xPercent: 50,
        // rotate: -10,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
    {
      dependencies: [],
    },
  );

  useGSAP(
    () => {
      const tl = gsap.timeline({
        delay: 0.7,
      });

      SplitText.create("#name", {
        type: "words",
        mask: "lines",
        onSplit(splitText) {
          tl.from(splitText.words, {
            yPercent: -100,
            ease: "power2.out",
            duration: 0.75,
          });
        },
      });

      SplitText.create("#bio", {
        type: "words",
        mask: "lines",
        onSplit(splitText) {
          gsap.from(splitText.words, {
            delay: 1,
            yPercent: 50,
            filter: "blur(8px)",
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          });
        },
      });

      tl.from(
        mainSectionRef.current,
        {
          autoAlpha: 0,
          yPercent: 25,
        },
        "+=2.5",
      );
    },
    {
      dependencies: [],
    },
  );

  return (
    <div className="container-wrapper">
      <div className="mt-10 mb-2 flex justify-center overflow-hidden md:mb-10">
        <h1 id="name" className="text-[3.5rem] font-bold md:text-[8rem]">
          Oluwaseye
        </h1>
      </div>

      <div className="mb-12 flex justify-center">
        <p
          id="bio"
          className="max-w-[928px] text-center text-[1rem] tracking-[3%] md:text-[1.5rem]"
        >
          I'm a Frontend Engineer with over 5 years of experience, specialising
          in crafting efficient, scalable, and user-friendly web applications.
          My expertise spans multiple languages and frameworks including
          JavaScript, TypeScript, React.js, Next.js, and more.
        </p>
      </div>

      <div
        ref={mainSectionRef}
        className="bg-purple relative mb-10 rounded-[40px] border-r-[10px] border-b-[10px] border-black px-6 pt-5 pb-[84px] md:rounded-[60px] md:border-r-[20px] md:border-b-[20px] md:pb-[168px] lg:px-20 lg:pt-16"
      >
        <div className="absolute top-0 left-0 -translate-y-1/2">
          <Flowers id="flowers" className="scale-50 md:scale-100" />
        </div>

        <div className="absolute top-4 right-8 hidden md:block">
          <FeSweLogo id="fe-swe" />
        </div>

        <div className="flex items-center gap-3 sm:gap-6 lg:gap-10">
          {["Projects", "Experience", "About"].map((elem) => (
            <Link
              key={elem}
              to="/"
              search={{
                tab: elem.toLowerCase(),
              }}
            >
              <Button
                bgColor={elem.toLowerCase() === tab ? "bg-white" : "bg-purple"}
              >
                {elem}
              </Button>
            </Link>
          ))}
        </div>

        {tab === "projects" && (
          <ul className="flex flex-col">
            {PERSONAL_PROJECTS.map((project, ind) => (
              <li
                key={project.name}
                onMouseEnter={() => {
                  setHoverProjectIndex(ind);
                }}
                onMouseLeave={() => {
                  setHoverProjectIndex(null);
                }}
                onMouseMove={(e) => {
                  // Track cursor position relative to the list item
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  setCursorPosition({ x, y });
                }}
                className="relative border-dashed py-6 not-last:border-b-2 not-last:border-[#1311111F] md:py-8"
              >
                <div className="mb-3 flex flex-wrap items-center gap-3 md:gap-5">
                  <h2 className="text-[1.25rem] font-bold text-white md:text-[2.5rem]">
                    {project.name}
                  </h2>

                  <div className="md:hidden">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full rounded-2xl object-cover"
                    />
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {project.links.map((link, i) => (
                      <a key={i} href={link.url} target="_blank">
                        <Button bgColor="bg-white">{link.title}</Button>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 md:mr-[25%]">
                  {project.skills.map((skill, i) => {
                    const Icon = skill.icon;
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-1 rounded-[4px] p-1"
                      >
                        <Icon className="h-6 w-6" />
                        <span className="text-xs font-medium text-white">
                          {skill.name}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div
                  id={`img-container-${ind}`}
                  className="absolute top-0 right-8 z-10 hidden h-full overflow-hidden rounded-2xl md:block"
                >
                  <img
                    src={project.image}
                    alt={project.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </li>
            ))}
          </ul>
        )}

        <Fire
          id="fire"
          className="absolute bottom-0 left-[5%] translate-y-1/4 scale-50 md:left-[10%] md:translate-y-0 md:scale-100"
        />

        <Mushroom className="absolute right-[5%] bottom-0 translate-y-1/4 scale-50 md:right-[15%] md:translate-y-0 md:scale-100" />
      </div>

      <div className="mb-16 flex flex-col gap-14 sm:px-8 md:gap-10 md:px-16 lg:px-20">
        <div className="flex flex-col gap-6 md:gap-8">
          <h2 className="text-[40px] font-bold md:text-[64px]">Get in touch</h2>

          <div className="flex flex-wrap items-start gap-4 md:gap-6">
            <Button bgColor="bg-purple">View resume</Button>
            <a href="mailto:seyepelumi@gmail.com">
              <Button bgColor="bg-purple">Send a mail</Button>
            </a>
            <a href="https://github.com/Iamsheye" target="_blank">
              <Button bgColor="bg-orange">GitHub</Button>
            </a>
            <a href="https://x.com/sheye_majek" target="_blank">
              <Button bgColor="bg-orange">Twitter (X)</Button>
            </a>
            <a href="https://www.linkedin.com/in/majek-sheye/" target="_blank">
              <Button bgColor="bg-orange">LinkedIn</Button>
            </a>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <p className="text-[20px] font-semibold md:text-2xl">Designed by:</p>
          <a href="">
            <Button bgColor="bg-orange">mothecreator</Button>
          </a>
        </div>
      </div>
    </div>
  );
}
