import { publicProcedure, router } from './trpc';

export const appRouter = router({
  // TODO: Note 2
  anyApiRoute: publicProcedure.query(() => {
    return 'hello';
  }),
});

export type AppRouter = typeof appRouter;
