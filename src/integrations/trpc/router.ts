// import { TRPCError } from '@trpc/server'
import { createTRPCRouter, publicProcedure } from "./init";
import type { TRPCRouterRecord } from "@trpc/server";
import { getCurrentlyPlaying } from "@/spotify";
// import { z } from 'zod'

const peopleRouter = {
  list: publicProcedure.query(() => [
    {
      name: "John Doe",
    },
    {
      name: "Jane Doe",
    },
  ]),
} satisfies TRPCRouterRecord;

const spotifyRouter = {
  getNowPlaying: publicProcedure.query(async () => {
    return await getCurrentlyPlaying();
  }),
} satisfies TRPCRouterRecord;

export const trpcRouter = createTRPCRouter({
  people: peopleRouter,
  spotify: spotifyRouter,
});
export type TRPCRouter = typeof trpcRouter;
