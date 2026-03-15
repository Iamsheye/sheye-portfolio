import { useGSAP } from "@gsap/react";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import {
  // TanStackRouterDevtools,
  TanStackRouterDevtoolsPanel,
} from "@tanstack/react-router-devtools";
import { Analytics } from "@vercel/analytics/react";
import gsap from "gsap";
import { Suspense, useState } from "react";
import { z } from "zod";

import { TanstackDevtools } from "@tanstack/react-devtools";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";

import appCss from "../global.css?url";
import type { TRPCRouter } from "@/integrations/trpc/router";
import type { QueryClient } from "@tanstack/react-query";
import type { TRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { NowPlaying } from "@/components/now-playing.tsx";
import PixelTrail from "@/components/pixel-trail.tsx";
import { cn } from "@/lib/utils.ts";

interface MyRouterContext {
  queryClient: QueryClient;
  trpc: TRPCOptionsProxy<TRPCRouter>;
}

const spotifyErrorSearchSchema = z.object({
  error: z.string().optional(),
  error_details: z.string().optional(),
});

interface BarProps {
  bgFirst: string;
  bgSecond: string;
  className?: string;
}
const Bars = ({ bgFirst, bgSecond, className }: BarProps) => (
  <div className={cn("bars flex flex-1 flex-col", className)}>
    <div className={cn("h-3/4", bgFirst)}></div>
    <div className={cn("h-1/4", bgSecond)}></div>
  </div>
);

export const Route = createRootRouteWithContext<MyRouterContext>()({
  validateSearch: spotifyErrorSearchSchema,
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
        title: "Oluwaseye's Portfolio",
      },
      {
        name: "description",
        content: "Oluwaseye Majekodunmi's Portfolio",
      },
      {
        property: "og:title",
        content: "Oluwaseye's Portfolio",
      },
      {
        property: "og:description",
        content: "Oluwaseye Majekodunmi's Portfolio",
      },
      {
        property: "og:image",
        content: "https://oluwaseye.dev/og-image.webp",
      },
      {
        property: "og:site_name",
        content: "Oluwaseye's Portfolio",
      },
      {
        property: "og:url",
        content: "https://oluwaseye.dev",
      },
      {
        property: "twitter:card",
        content: "summary_large_image",
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
        href: "https://fonts.googleapis.com/css2?family=Parkinsans:wght@300..800&family=Permanent+Marker&display=swap",
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
  loader: async ({ context }) => {
    await context.queryClient.prefetchQuery(
      context.trpc.getNowPlaying.queryOptions(),
    );
  },
  component: () => {
    const [animationsDone, setAnimationsDone] = useState(false);

    useGSAP(
      () => {
        const tl = gsap.timeline({
          onComplete: () => setAnimationsDone(true),
        });
        tl.to(".bars", {
          yPercent: -100,
          duration: 0.75,
          stagger: 0.025,
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

        <div className="pointer-events-none fixed inset-0 z-20 flex h-full w-full">
          <Bars bgFirst="bg-[#E6E6E6]" bgSecond="bg-black" />
          <Bars bgFirst="bg-[#E6E6A0]" bgSecond="bg-white" />
          <Bars bgFirst="bg-[#A0E6E6]" bgSecond="bg-black" />
          <Bars bgFirst="bg-[#A0E6A0]" bgSecond="bg-black" />
          <Bars bgFirst="bg-[#E6A0E6]" bgSecond="bg-black" />
          <Bars bgFirst="bg-[#E6A0A0]" bgSecond="bg-black" />
          <Bars bgFirst="bg-[#A0A0E6]" bgSecond="bg-black" />
        </div>

        <Outlet />

        {/* <TanStackRouterDevtools /> */}
        {/* <TanStackQueryLayout /> */}
        {animationsDone && (
          <Suspense>
            <NowPlaying />
          </Suspense>
        )}
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

        {import.meta.env.DEV && (
          <TanstackDevtools
            config={{
              position: "bottom-left",
            }}
            plugins={[
              {
                name: "Tanstack Router",
                render: <TanStackRouterDevtoolsPanel />,
              },
              TanStackQueryDevtools,
            ]}
          />
        )}

        <Scripts />
        <Analytics />
      </body>
    </html>
  );
}
