import { authRouter } from '../routers/auth-router'
import { contestRouter } from '../routers/contest-router'
import { publicRouter } from '../routers/public-router'
import { WinnerRouter } from '../routers/winner-router'
import { router, userProcedure } from './trpc'

export const appRouter = router({
  anyApiRoute: userProcedure.query(() => {
    return { name: 'akhil' }
  }),

  auth: authRouter,
  contest: contestRouter,
  public: publicRouter,
  winner: WinnerRouter
})

export type AppRouter = typeof appRouter
