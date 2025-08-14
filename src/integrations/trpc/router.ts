// import { TRPCError } from '@trpc/server'
import { createTRPCRouter, publicProcedure } from "./init";
import type { TRPCRouterRecord } from "@trpc/server";
import { getNowPlaying } from "@/api";
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

export const trpcRouter = createTRPCRouter({
  people: peopleRouter,
  getNowPlaying: publicProcedure.query(({ ctx }) => getNowPlaying(ctx.req)),
});
export type TRPCRouter = typeof trpcRouter;
