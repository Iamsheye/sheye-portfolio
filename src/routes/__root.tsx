import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Fragment } from "react";
import appCss from "../global.css?url";
import TanStackQueryLayout from "../integrations/tanstack-query/layout.tsx";
import type { TRPCRouter } from "@/integrations/trpc/router";
import type { QueryClient } from "@tanstack/react-query";
import type { TRPCOptionsProxy } from "@trpc/tanstack-react-query";
import PixelTrail from "@/components/pixel-trail.tsx";

interface MyRouterContext {
  queryClient: QueryClient;
  trpc: TRPCOptionsProxy<TRPCRouter>;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Oluwaseye Portfolio",
      },
      {
        description: "Oluwaseye Majekodunmi's Portfolio",
      },
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Parkinsans:wght@300..800&display=swap",
      },
      {
        rel: "icon",
        href: "/favicon.ico",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  component: () => {
    useGSAP(
      () => {
        gsap.to(".bars", {
          yPercent: -100,
          duration: 0.75,
          stagger: 0.025,
          // ease: "back.out",
        });
      },
      { dependencies: [] },
    );

    return (
      <RootDocument>
        <div className="pointer-events-none fixed inset-0 h-full w-full">
          <PixelTrail
            pixelSize={16}
            fadeDuration={750}
            pixelClassName="bg-[#797979]"
          />
        </div>

        <div className="pointer-events-none fixed inset-0 z-20 flex h-full w-full flex-row-reverse">
          {[1, 2, 3, 4].map(() => (
            <Fragment key={Math.random()}>
              <div className="bars w-[5vw] bg-black"></div>
              <div className="bars bg-purple w-[5vw]"></div>
              <div className="bars bg-pink w-[5vw]"></div>
              <div className="bars bg-orange w-[5vw]"></div>
              <div className="bars bg-grey w-[5vw]"></div>
            </Fragment>
          ))}
        </div>

        <Outlet />

        <TanStackRouterDevtools />
        <TanStackQueryLayout />
      </RootDocument>
    );
  },
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>

      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
