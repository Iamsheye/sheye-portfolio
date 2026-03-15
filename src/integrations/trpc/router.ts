import { createTRPCRouter, publicProcedure } from "./init";
import { getNowPlaying } from "@/spotify";

export const trpcRouter = createTRPCRouter({
  getNowPlaying: publicProcedure.query(({ ctx }) => getNowPlaying(ctx.request)),
});

export type TRPCRouter = typeof trpcRouter;
