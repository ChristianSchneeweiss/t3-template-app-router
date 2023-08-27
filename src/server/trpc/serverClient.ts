import { appRouter } from "@/server";
import { auth } from "@clerk/nextjs";
import { db } from "@/db/db";

export const serverClient = () => appRouter.createCaller({ auth: auth(), db });
