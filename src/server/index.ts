import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "./trpc";

import { todos } from "@/db/schema";
import { db } from "@/db/db";
import { randomInt } from "crypto";

export const appRouter = createTRPCRouter({
  getTodos: publicProcedure.query(async ({ ctx }) => {
    return db.select().from(todos);
  }),
  addTodo: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    await db
      .insert(todos)
      .values({ content: input, done: 0, id: randomInt(100000) });
    return true;
  }),
  setDone: publicProcedure
    .input(
      z.object({
        id: z.number(),
        done: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      await db
        .update(todos)
        .set({ done: input.done })
        .where(eq(todos.id, input.id));
      return true;
    }),
});

export type AppRouter = typeof appRouter;
