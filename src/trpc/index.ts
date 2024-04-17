import { authRouter } from '../routers/auth-router'
import { cartRouter } from '../routers/cart-router'
import { contestRouter } from '../routers/contest-router'
import { publicRouter } from '../routers/public-router'
import { ticketRouter } from '../routers/ticket-router'
import { transactionRouter } from '../routers/transaction-router'
import { WinnerRouter } from '../routers/winner-router'
import { wishlistRouter } from '../routers/wishlist-router'

import { router, userProcedure } from './trpc'

export const appRouter = router({
  anyApiRoute: userProcedure.query(() => {
    return { name: 'akhil' }
  }),

  auth: authRouter,
  contest: contestRouter,
  cart: cartRouter,
  ticket: ticketRouter,
  public: publicRouter,
  winner: WinnerRouter,
  wishlist: wishlistRouter,
  transaction: transactionRouter,
})

export type AppRouter = typeof appRouter
