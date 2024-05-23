import { TRPCError } from '@trpc/server'
import { produce } from 'immer'
import { z } from 'zod'
import { getPayloadClient } from '../get-payload'
import { AuthCredentialsValidator } from '../lib/validators/auth-router/account-credentials-validator'
import { ForgotPasswordValidator } from '../lib/validators/auth-router/forgot-password-validator'
import { LoginValidator } from '../lib/validators/auth-router/login-validator'
import { ResetPasswordValidator } from '../lib/validators/auth-router/reset-password-validator'
import { TokenValidator } from '../lib/validators/auth-router/token-validator'
import {
  UserEmailValidator,
  UserPasswordValidator,
  UserPersonalDetailsValidator,
} from '../lib/validators/auth-router/user-details-validator'
import { publicProcedure, router, userProcedure } from '../trpc/trpc'

import { Media } from '@/payload-types'

export const authRouter = router({
  createUser: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input }) => {
      const { user_name, email, password } = input

      const payload = await getPayloadClient()

      try {
        const { totalDocs: userExisted } = await payload.find({
          collection: 'users',
          where: {
            email: {
              equals: email,
            },
          },
        })

        if (!!userExisted) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'User already exists.',
          })
        }
      } catch (error: any) {
        console.error('Error checking user existence:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error?.message,
        })
      }

      try {
        const { id, email: newUserEmail } = await payload.create({
          collection: 'users',
          data: {
            user_name,
            email,
            password,
            amount: 0,
          },
        })

        return { success: true, sentEmailTo: newUserEmail }
      } catch (error: any) {
        console.error('Error creating user:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error?.message,
        })
      }
    }),

  verifyEmail: publicProcedure
    .input(TokenValidator)
    .query(async ({ input }) => {
      const { token } = input

      const payload = await getPayloadClient()

      try {
        const isVerified = await payload.verifyEmail({
          collection: 'users',
          token,
        })

        if (!isVerified) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Email verification failed.',
          })
        }

        return { success: true }
      } catch (error: any) {
        console.error('Error verifying email:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error?.message,
        })
      }
    }),

  signIn: publicProcedure
    .input(LoginValidator)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input
      const { res } = ctx

      const payload = await getPayloadClient()

      try {
        await payload.login({
          collection: 'users',
          data: {
            email,
            password,
          },
          res,
        })

        return { success: true }
      } catch (error: any) {
        console.error('Error signing in:', error)
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: error?.message || 'Unauthorized access.',
        })
      }
    }),

  resetPassword: publicProcedure
    .input(ResetPasswordValidator)
    .mutation(async ({ input }) => {
      const { password, token } = input

      const payload = await getPayloadClient()

      try {
        await payload.resetPassword({
          collection: 'users',
          data: {
            token,
            password,
          },
          overrideAccess: true,
        })
        return { success: true }
      } catch (error: any) {
        console.error('Error resetting password:', error)
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: error?.message || 'Unauthorized access.',
        })
      }
    }),

  forgotPassword: publicProcedure
    .input(ForgotPasswordValidator)
    .mutation(async ({ input, ctx }) => {
      const { email } = input
      const { req } = ctx

      const payload = await getPayloadClient()

      try {
        const { totalDocs: emailExisted } = await payload.find({
          collection: 'users',
          where: {
            email: {
              equals: email,
            },
          },
        })

        if (!!!emailExisted) {
          throw new TRPCError({
            code: 'CONFLICT',
          })
        }

        const result=await payload.forgotPassword({
          collection: 'users',
          data: {
            email,
          },
        })

        return { success: true,token:result }
      } catch (error: any) {
        console.error('Error sending forgot password email:', error)
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: error?.message || 'Unauthorized access.',
        })
      }
    }),

  updateUserPersonalDetails: userProcedure
    .input(UserPersonalDetailsValidator)
    .mutation(async ({ input, ctx }) => {
      const { user_name, dob, address, phone_number } = input
      const { user } = ctx

      const payload = await getPayloadClient()

      try {
        await payload.update({
          collection: 'users',
          id: user.id,
          data: {
            user_name,
            dob,
            address,
            phone_number,
          },
        })
      } catch (error: any) {
        console.error('Error updating user personal details:', error)
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: error?.message || 'Unauthorized access.',
        })
      }
    }),

  currentUser: userProcedure.query(async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (!res.ok) {
        throw new Error('Failed to fetch current user data.')
      }

      const currentUser = await res.json()

      return currentUser
    } catch (error: any) {
      console.error('Error fetching current user:', error)
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: error?.message || 'Unauthorized access.',
      })
    }
  }),

  changePassword: userProcedure
    .input(UserPasswordValidator)
    .mutation(async ({ input, ctx }) => {
      const { password } = input
      const { user } = ctx

      const payload = await getPayloadClient()

      try {
        await payload.update({
          collection: 'users',
          id: user.id,
          data: {
            password,
          },
        })

        return { success: true }
      } catch (error) {
        console.error('Error changing password:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to change password.',
        })
      }
    }),

  changeEmail: userProcedure
    .input(UserEmailValidator)
    .mutation(async ({ input, ctx }) => {
      const { email } = input
      const { user } = ctx

      const payload = await getPayloadClient()

      try {
        await payload.update({
          collection: 'users',
          id: user.id,
          data: {
            email,
          },
        })

        return { success: true }
      } catch (error: any) {
        console.error('Error updating email:', error)
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: error?.message || 'Unauthorized access.',
        })
      }
    }),

  updateUserImage: userProcedure
    .input(
      z.object({
        id: z.any(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { id } = input

      const payload = await getPayloadClient()

      try {
        const updatedData = produce(ctx.user, draft => {
          draft.image = id
        })

        const user = await payload.update({
          collection: 'users',
          id: ctx.user.id,
          data: updatedData,
        })

        await payload.delete({
          collection: 'media',
          id: (ctx.user.image as Media).id,
        })

        return { data: user }
      } catch (error: any) {
        console.error('Error updating user image:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error?.message || 'Internal server error occurred.',
        })
      }
    }),
})
