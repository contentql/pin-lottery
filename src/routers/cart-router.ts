import { TRPCError } from '@trpc/server'

import { getPayloadClient } from '../get-payload'
import { CartDetailsValidator } from '../lib/validators/cart-details-validator'
import { TicketsCountValidator } from '../lib/validators/tickets-count-validator'
import { router, userProcedure } from '../trpc/trpc'

export const cartRouter = router({
  getCartTickets: userProcedure.query(async ({ ctx }) => {
    const { user } = ctx

    const payload = await getPayloadClient()

    try {
      const tickets = await payload.find({
        collection: 'cart',
        user,
        overrideAccess: false,
      })

      return tickets.docs
    } catch (err) {
      throw new TRPCError({ code: 'BAD_REQUEST' })
    }
  }),

  addTicketsToCart: userProcedure
    .input(CartDetailsValidator)
    .mutation(async ({ input, ctx }) => {
      const { contest_id, tickets, total_price } = input

      const { user } = ctx

      const payload = await getPayloadClient()

      try {
        await payload.create({
          collection: 'cart',
          data: {
            tickets,
            total_price,
            contest_id: { relationTo: 'contest', value: contest_id },
            user_id: { relationTo: 'users', value: user?.id },
          },
        })

        return { success: true }
      } catch (err) {
        throw new TRPCError({ code: 'BAD_REQUEST' })
      }
    }),

  updateTicketsOfUserFromCart: userProcedure
    .input(TicketsCountValidator)
    .mutation(async ({ input }) => {
      const { id, tickets } = input

      const payload = await getPayloadClient()

      try {
        await payload.update({
          collection: 'cart',
          id,
          data: {
            tickets,
          },
        })

        return { success: true }
      } catch (err) {
        throw new TRPCError({ code: 'BAD_REQUEST' })
      }
    }),

  deleteAllTicketsOfUserFromCart: userProcedure.mutation(async ({ ctx }) => {
    const { user } = ctx

    const payload = await getPayloadClient()

    try {
      await payload.delete({
        collection: 'cart',
        where: {
          'user_id.value': {
            equals: user?.id,
          },
        },
      })

      return { success: true }
    } catch (err) {
      throw new TRPCError({ code: 'BAD_REQUEST' })
    }
  }),
})
