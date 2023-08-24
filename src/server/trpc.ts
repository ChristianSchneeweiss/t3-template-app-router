import { initTRPC, TRPCError } from "@trpc/server";

const t = initTRPC.create();

const middleware = t.middleware;

const isAuth = middleware(async (opts) => {
  const user = { id: "asdf" }; // TODO get user from authentication
  if (!user) throw new TRPCError({ code: "UNAUTHORIZED" });
  return opts.next({
    ctx: {
      user,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = publicProcedure.use(isAuth);
