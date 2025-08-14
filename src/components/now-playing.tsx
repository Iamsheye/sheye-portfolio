import { useRef } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Player } from "./player";
import { useTRPC } from "@/integrations/trpc/react";

export const NowPlaying = () => {
  const trpc = useTRPC();
  const { data: nowPlaying } = useSuspenseQuery(
    trpc.spotify.getNowPlaying.queryOptions(),
  );
  const playingRef = useRef<HTMLDivElement>(null);
  const notPlayingRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!playingRef.current) return;
      gsap.from(playingRef.current, {
        opacity: 0,
        y: -100,
        duration: 0.5,
      });
    },
    { dependencies: [nowPlaying], scope: playingRef },
  );

  useGSAP(
    () => {
      if (!notPlayingRef.current) return;
      gsap.from(notPlayingRef.current, {
        opacity: 0,
        y: 100,
        duration: 0.5,
      });
    },
    { dependencies: [nowPlaying], scope: notPlayingRef },
  );

  return (
    <>
      {nowPlaying ? (
        <div
          ref={playingRef}
          id="now-playing"
          className="pointer-events-none fixed right-4 bottom-4 z-50 flex w-72 items-center justify-center"
        >
          <Player {...nowPlaying} />
        </div>
      ) : (
        <div
          ref={notPlayingRef}
          id="not-playing"
          className="pointer-events-none fixed right-4 bottom-4 z-50 flex w-72 items-center justify-center"
        >
          <div className="flex w-full flex-col gap-4 rounded-md border border-neutral-200 bg-white/50 p-4 text-center text-lg font-semibold text-neutral-500 shadow-2xl backdrop-blur-lg dark:border-neutral-800/50 dark:bg-black/50 dark:text-neutral-300">
            <p>Not playing anything right now.</p>
          </div>
        </div>
      )}
    </>
  );
};
