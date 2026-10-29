import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Button from "../button";
import { PERSONAL_PROJECTS } from "@/constants";

const HIDDEN_TOP = "polygon(0 0, 100% 0, 100% 0, 0 0)";
const FULL = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
const HIDDEN_BOTTOM = "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)";

const isDesktop = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(min-width: 768px)").matches;

const Projects = () => {
  const containerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const imageRefs = useRef<Array<HTMLImageElement | null>>([]);
  const xToRefs = useRef<Array<gsap.QuickToFunc | null>>([]);
  const yToRefs = useRef<Array<gsap.QuickToFunc | null>>([]);
  const activeRef = useRef<number | null>(null);

  const { contextSafe } = useGSAP(() => {
    containerRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { clipPath: HIDDEN_TOP, x: 0, y: 0 });
      xToRefs.current[i] = gsap.quickTo(el, "x", {
        duration: 0.5,
        ease: "power3",
      });
      yToRefs.current[i] = gsap.quickTo(el, "y", {
        duration: 0.5,
        ease: "power3",
      });
    });
    imageRefs.current.forEach((img) => {
      if (img) gsap.set(img, { scale: 1.4 });
    });
  });

  const handleEnter = contextSafe((index: number, x: number, y: number) => {
    if (!isDesktop()) return;
    const el = containerRefs.current[index];
    const img = imageRefs.current[index];
    if (!el) return;
    activeRef.current = index;
    // Freeze any in-flight exit/follow tweens, snap to cursor, then wipe open.
    gsap.killTweensOf(el);
    if (img) gsap.killTweensOf(img);
    gsap.set(el, { clipPath: HIDDEN_TOP, x: x * 0.25, y: y * 0.25 });
    gsap.to(el, {
      clipPath: FULL,
      duration: 0.7,
      ease: "expo.out",
      overwrite: "auto",
    });
    if (img) {
      gsap.fromTo(
        img,
        { scale: 1.4 },
        { scale: 1, duration: 0.7, ease: "expo.out", overwrite: "auto" },
      );
    }
  });

  const handleFollow = (index: number, x: number, y: number) => {
    if (!isDesktop()) return;
    if (activeRef.current !== index) return;
    xToRefs.current[index]?.(x * 0.25);
    yToRefs.current[index]?.(y * 0.25);
  };

  const handleLeave = contextSafe((index: number) => {
    if (!isDesktop()) return;
    const el = containerRefs.current[index];
    const img = imageRefs.current[index];
    if (!el) return;
    if (activeRef.current === index) activeRef.current = null;
    // Kill enter/follow tweens so the image stays put while it wipes away.
    gsap.killTweensOf(el);
    if (img) gsap.killTweensOf(img);
    gsap.to(el, {
      clipPath: HIDDEN_BOTTOM,
      duration: 0.45,
      ease: "power3.in",
      overwrite: "auto",
      onComplete: () => {
        // Reset to the top so the next enter always wipes downward.
        gsap.set(el, { clipPath: HIDDEN_TOP, x: 0, y: 0 });
      },
    });
    if (img) {
      gsap.to(img, {
        scale: 1.4,
        duration: 0.45,
        ease: "power3.in",
        overwrite: "auto",
      });
    }
  });

  const relativePos = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  return (
    <ul className="flex flex-col">
      {PERSONAL_PROJECTS.map((project, ind) => (
        <li
          key={project.name}
          onMouseEnter={(e) => {
            const { x, y } = relativePos(e);
            handleEnter(ind, x, y);
          }}
          onMouseLeave={() => {
            handleLeave(ind);
          }}
          onMouseMove={(e) => {
            const { x, y } = relativePos(e);
            handleFollow(ind, x, y);
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
            ref={(el) => {
              containerRefs.current[ind] = el;
            }}
            style={{ clipPath: HIDDEN_TOP }}
            className="pointer-events-none absolute top-0 right-8 z-10 hidden h-full overflow-hidden rounded-2xl will-change-[clip-path,transform] md:block"
          >
            <img
              ref={(el) => {
                imageRefs.current[ind] = el;
              }}
              src={project.image}
              alt={project.name}
              className="h-full w-full object-cover will-change-transform"
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Projects;
