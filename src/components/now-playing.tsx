import { useSuspenseQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Player } from "./player";
import { useTRPC } from "@/integrations/trpc/react";

export const NowPlaying = () => {
  const trpc = useTRPC();
  const { data: nowPlaying } = useSuspenseQuery({
    ...trpc.getNowPlaying.queryOptions(),
    refetchInterval: 30_000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchIntervalInBackground: false,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 100,
        duration: 0.5,
      });
    },
    { scope: containerRef },
  );

  if (!nowPlaying) return null;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed right-4 bottom-4 z-50"
    >
      <Player {...nowPlaying} />
    </div>
  );
};
