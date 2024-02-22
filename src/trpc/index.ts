import { authRouter } from '../routers/auth-router';
import { publicProcedure, router, userProcedure } from './trpc';

export const appRouter = router({
  anyApiRoute: userProcedure.query(() => {
    return { name: 'akhil' };
  }),

  auth: authRouter,
});

export type AppRouter = typeof appRouter;
