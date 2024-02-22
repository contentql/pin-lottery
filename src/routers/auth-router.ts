import { TRPCError } from '@trpc/server';
import { getPayloadClient } from '../get-payload';
import { AuthCredentialsValidator } from '../lib/validators/account-credentials-validator';
import { publicProcedure, router } from '../trpc/trpc';

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
});
