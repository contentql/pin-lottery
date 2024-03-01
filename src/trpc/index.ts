import { authRouter } from '../routers/auth-router';
import { contestRouter } from '../routers/contest-router';
import { router, userProcedure } from './trpc';

export const appRouter = router({
  anyApiRoute: userProcedure.query(() => {
    return { name: 'akhil' };
  }),

  auth: authRouter,
  contest: contestRouter,
});

export type AppRouter = typeof appRouter;
