import { publicProcedure, router } from '../trpc/trpc';
import { z } from 'zod';

export const authRouter = router({
  createUser: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { email, password } = input;

      return { email, password };
    }),
});
