import { useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Button from "../button";
import { PERSONAL_PROJECTS } from "@/constants";

const Projects = () => {
  const [hoverProjectIndex, setHoverProjectIndex] = useState<number | null>(
    null,
  );
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

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

  return (
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
                  <Button hasStroke={false} bgColor="bg-white">
                    {link.title}
                  </Button>
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
  );
};

export default Projects;
