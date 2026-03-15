import { createTRPCRouter, publicProcedure } from "./init";
import { getNowPlaying } from "@/spotify";

export const trpcRouter = createTRPCRouter({
  getNowPlaying: publicProcedure.query(() => getNowPlaying()),
});

export type TRPCRouter = typeof trpcRouter;
