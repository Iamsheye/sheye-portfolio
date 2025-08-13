import { useGSAP } from "@gsap/react";
import { Link, createFileRoute } from "@tanstack/react-router";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";
import { z } from "zod";

import FeSweLogo from "@/assets/FeSwe";
import Fire from "@/assets/Fire";
import Flowers from "@/assets/Flower";
import Mushroom from "@/assets/Mushroom";
import {
  StickerFour,
  StickerOne,
  StickerThree,
  StickerTwo,
} from "@/assets/stickers";
import Button from "@/components/button";
import Projects from "@/components/tab-content/projects";
import About from "@/components/tab-content/about";

const SearchSchema = z.object({
  tab: z.enum(["projects", "about"]).catch("projects"),
});

export const Route = createFileRoute("/")({
  component: App,
  validateSearch: SearchSchema,
});

function App() {
  const { tab } = Route.useSearch();

  const mainSectionRef = useRef<HTMLDivElement | null>(null);

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
      gsap.to("#fire", {
        xPercent: 50,
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
      gsap.registerPlugin(Draggable, InertiaPlugin);

      const tl = gsap.timeline({
        delay: 0.7,
      });

      SplitText.create("#name", {
        type: "words",
        mask: "lines",
        onSplit(splitText) {
          tl.to(splitText.words, {
            yPercent: 100,
            ease: "power2.out",
            duration: 0.75,
          });
        },
      });

      tl.to(".sticker", {
        autoAlpha: 1,
        duration: 1,
        ease: "power2.out",
        stagger: 0.35,
      });

      const container = document.querySelector("#name-sticker-container");
      if (!container) return;

      const stickers = document.querySelectorAll(".sticker");

      stickers.forEach((sticker, ind) => {
        switch (ind) {
          case 0:
            sticker.classList.add("top-[18%]", "-left-6");
            break;
          case 1:
            sticker.classList.add("bottom-1", "left-9");
            break;
          case 2:
            sticker.classList.add("right-[19%]", "bottom-0.5");
            break;
          case 3:
            sticker.classList.add("top-[12.5%]", "left-[calc(100%-30px)]");
            break;
        }

        Draggable.create(sticker, {
          type: "x,y",
          bounds: "#name-sticker-container",
          inertia: true,
          edgeResistance: 0.65,
          allowContextMenu: true,
          cursor: "grab",
          throwProps: {
            x: { velocity: "auto", max: 35 },
            y: { velocity: "auto", max: 35 },
          },
          onDragStart: function () {
            gsap.set(this.target, {
              cursor: "grabbing",
            });
          },
          onDrag: function () {
            gsap.set(this.target, {
              rotation: (this.x - this.startX) * 0.1,
            });
          },
          onDragEnd: function () {
            gsap.to(this.target, {
              cursor: "grab",
            });
          },
        });
      });

      SplitText.create("#bio", {
        type: "words",
        mask: "lines",
        onSplit(splitText) {
          gsap.set("#bio", {
            autoAlpha: 1,
          });
          gsap.set(splitText.words, {
            yPercent: 50,
            filter: "blur(8px)",
            autoAlpha: 0,
          });
          gsap.to(splitText.words, {
            delay: 1,
            yPercent: 0,
            filter: "blur(0px)",
            autoAlpha: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          });
        },
      });

      gsap.set(mainSectionRef.current, {
        autoAlpha: 0,
        yPercent: 25,
      });

      tl.to(
        mainSectionRef.current,
        {
          autoAlpha: 1,
          yPercent: 0,
        },
        "+=1.25",
      );
    },
    {
      dependencies: [],
    },
  );

  const TAB_COMPONENTS = {
    projects: <Projects />,
    about: <About />,
  };

  return (
    <div className="container-wrapper">
      <div
        id="name-sticker-container"
        className="mt-10 mb-2 flex justify-center overflow-hidden md:mb-10"
      >
        <div className="relative">
          {[StickerOne, StickerTwo, StickerThree, StickerFour].map(
            (Sticker, ind) => (
              <Sticker
                key={ind}
                className="sticker absolute z-5 scale-[45%] opacity-0 md:scale-100"
              />
            ),
          )}

          <h1
            id="name"
            className="font-permanent -translate-y-full text-[4rem] font-bold md:text-[8.75rem]"
          >
            Oluwaseye
          </h1>
        </div>
      </div>

      <div className="mb-12 flex justify-center">
        <p
          id="bio"
          className="max-w-[928px] text-center text-[1rem] tracking-[3%] opacity-0 md:text-[1.5rem]"
        >
          I'm a Software Engineer with over 5 years of experience, specialising
          in crafting scalable and user-friendly web applications. My expertise
          spans multiple languages and frameworks including TypeScript,
          React.js, React Native, Tanstack, Next.js, Nest.js and more.
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
          {["Projects", "About"].map((elem) => (
            <Link
              key={elem}
              replace
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

        {TAB_COMPONENTS[tab]}

        <Fire
          id="fire"
          className="absolute bottom-0 left-[5%] translate-y-1/4 scale-50 md:left-[10%] md:translate-y-0 md:scale-100"
        />

        <Mushroom className="absolute right-[5%] bottom-0 translate-y-1/4 scale-50 md:right-[15%] md:translate-y-0 md:scale-100" />
      </div>

      <footer className="mb-16 flex flex-col gap-14 sm:px-8 md:gap-10 md:px-16 lg:px-20">
        <div className="flex flex-col gap-6">
          <h2 className="text-[40px] font-bold md:text-[64px]">Get in touch</h2>

          <div className="flex flex-wrap items-start gap-4">
            {/* <Button bgColor="bg-purple">View resume</Button> */}
            <a href="mailto:seyepelumi@gmail.com">
              <Button bgColor="bg-purple">Send a mail</Button>
            </a>
            <a href="https://github.com/Iamsheye" target="_blank">
              <Button bgColor="bg-orange">GitHub</Button>
            </a>
            {/* <a href="https://x.com/sheye_majek" target="_blank">
              <Button bgColor="bg-orange">Twitter (X)</Button>
            </a> */}
            <a href="https://dev.to/iamsheye" target="_blank">
              <Button bgColor="bg-orange">Dev.to</Button>
            </a>
            <a href="https://dev.to/iamsheye" target="_blank">
              <Button bgColor="bg-orange">LinkedIn</Button>
            </a>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <p className="text-[20px] font-semibold md:text-2xl">Designed by:</p>
          <a href="https://mojola.notion.site/Mojola-Ojoniyi-5012964d6a1c4f958780a9d4e31a3cbe?pvs=4">
            <Button bgColor="bg-orange">mothecreator</Button>
          </a>
        </div>
      </footer>
    </div>
  );
}
