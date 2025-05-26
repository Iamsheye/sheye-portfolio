// import { TRPCError } from '@trpc/server'
import { createTRPCRouter, publicProcedure } from "./init";
import type { TRPCRouterRecord } from "@trpc/server";
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
});
export type TRPCRouter = typeof trpcRouter;
