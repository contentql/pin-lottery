// import { ExpressContext } from '@/server'
import { TRPCError, initTRPC } from '@trpc/server';

// const t = initTRPC.context<ExpressContext>().create()
const t = initTRPC.context().create();

export const router = t.router;
export const publicProcedure = t.procedure;
