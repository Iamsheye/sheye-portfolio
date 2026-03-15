import type { NowPlayingData } from "@/spotify";
import { cn } from "@/lib/utils";

export function Player(props: NowPlayingData) {
  return (
    <div className="border-orange/20 flex items-center gap-3 rounded-full border bg-white/20 py-2 pr-5 pl-2 shadow-2xl backdrop-blur-lg">
      <div className="relative h-12 w-12 shrink-0">
        <div
          className={cn(
            "border-purple/50 h-12 w-12 overflow-hidden rounded-full border-2",
            props.isPlaying && "animate-spin-disc",
          )}
        >
          <img
            src={props.albumImageUrl}
            alt={props.album}
            className={cn(
              "h-full w-full object-cover transition-[filter] duration-300",
              !props.isPlaying && "brightness-50",
            )}
          />
        </div>
        <div className="border-black/40 absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border bg-white/80 backdrop-blur-lg" />
        {!props.isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="size-4 drop-shadow-md"
            >
              <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
            </svg>
          </div>
        )}
      </div>
      <div className="flex min-w-0 flex-col">
        <a
          href={props.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto truncate text-sm font-bold text-orange hover:underline"
        >
          {props.title}
        </a>
        <p className="text-grey truncate text-xs">{props.artist}</p>
      </div>
    </div>
  );
}
