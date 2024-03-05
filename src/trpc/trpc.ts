import { User } from '@/payload-types'
import { ExpressContext } from '@/server'
import { TRPCError, initTRPC } from '@trpc/server'
import { PayloadRequest } from 'payload/types'

const t = initTRPC.context<ExpressContext>().create()
const middleware = t.middleware

const isAuthenticatedWithRoles = (roles: User['roles'], verify: 'or' | 'and') =>
  middleware(async ({ ctx, next }) => {
    const req = ctx.req as PayloadRequest

    const { user } = req as { user: User | null }

    // If user not logged in, throw error
    if (!user || !user.id) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Login before you proceed',
      })
    }

    // if all roles doesn't match throw error
    if (verify === 'and') {
      if (!roles?.every(role => user.roles?.includes(role))) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: "you don't have the right access",
        })
      }
    }

    // if not even a single role matches, throw error
    if (verify === 'or') {
      if (!roles?.some(role => user.roles?.includes(role))) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: "you don't have the right access",
        })
      }
    }

    return next({
      ctx: {
        user,
      },
    })
  })

export const router = t.router
export const publicProcedure = t.procedure
export const userProcedure = t.procedure.use(
  isAuthenticatedWithRoles(['user', 'admin', 'seller'], 'or'),
)
export const adminProcedure = t.procedure.use(
  isAuthenticatedWithRoles(['admin'], 'or'),
)
export const sellerProcedure = t.procedure.use(
  isAuthenticatedWithRoles(['seller'], 'or'),
)
export const sellersAndAdminsProcedure = t.procedure.use(
  isAuthenticatedWithRoles(['seller', 'admin'], 'or'),
)
