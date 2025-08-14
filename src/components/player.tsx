import type { CurrentlyPlaying } from "@/spotify";

export function Player(props: CurrentlyPlaying) {
  return (
    <div className="flex w-full flex-col gap-4 rounded-md border border-neutral-200 bg-white/50 p-4 shadow-2xl backdrop-blur-lg dark:border-neutral-800/50 dark:bg-black/50">
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16">
          <img
            src={props.albumImageUrl}
            alt={props.album}
            className="h-16 w-16 rounded-md"
          />
          <div className="absolute -right-1 -bottom-1 h-6 w-6 rounded-full border-4 border-white bg-green-500 dark:border-black" />
        </div>
        <div className="flex flex-col">
          <a
            href={props.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto font-bold text-neutral-800 hover:underline dark:text-neutral-200"
          >
            {props.title}
          </a>
          <p className="text-neutral-600 dark:text-neutral-400">
            {props.artist}
          </p>
        </div>
      </div>
    </div>
  );
}
