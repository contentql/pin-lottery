import { authRouter } from '../routers/auth-router';
import { publicProcedure, router } from './trpc';

export const appRouter = router({
  // TODO: Note 2
  anyApiRoute: publicProcedure.query(() => {
    return { name: 'akhil' };
  }),

  auth: authRouter,
});

export type AppRouter = typeof appRouter;
