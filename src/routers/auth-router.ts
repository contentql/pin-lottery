import { TRPCError } from '@trpc/server';

import { publicProcedure, router } from '../trpc/trpc';
import { getPayloadClient } from '../get-payload';
import { AuthCredentialsValidator } from '../lib/validators/auth-router/account-credentials-validator';
import { TokenValidator } from '../lib/validators/auth-router/token-validator';

export const authRouter = router({
  createUser: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input }) => {
      const { email, password } = input;

      const payload = await getPayloadClient();

      const { totalDocs: userExisted } = await payload.find({
        collection: 'users',
        where: {
          email: {
            equals: email,
          },
        },
      });

      if (!!userExisted) {
        throw new TRPCError({
          code: 'CONFLICT',
        });
      }

      const { id, email: newUserEmail } = await payload.create({
        collection: 'users',
        data: {
          email,
          password,
        },
      });

      return { succuss: true, sentEmailTo: newUserEmail };
    }),

  verifyEmail: publicProcedure
    .input(TokenValidator)
    .query(async ({ input }) => {
      const { token } = input;

      const payload = await getPayloadClient();

      const isVerified = await payload.verifyEmail({
        collection: 'users',
        token,
      });

      if (!isVerified) throw new TRPCError({ code: 'UNAUTHORIZED' });

      return { success: true };
    }),

  signIn: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const { res } = ctx;

      const payload = await getPayloadClient();

      try {
        await payload.login({
          collection: 'users',
          data: {
            email,
            password,
          },
          res,
        });

        return { success: true };
      } catch (err) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }
    }),
});
