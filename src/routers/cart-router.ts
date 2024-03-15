import { TRPCError } from '@trpc/server'
import { getPayloadClient } from '../get-payload'
import { CartDetailsValidator } from '../lib/validators/cart-details-validator'
import { router, userProcedure } from '../trpc/trpc'

export const cartRouter = router({
  getTickets: userProcedure.query(async () => {
    const payload = await getPayloadClient()

    try {
      const tickets = await payload.find({ collection: 'cart' })

      return tickets.docs
    } catch (err) {
      throw new TRPCError({ code: 'UNAUTHORIZED' })
    }
  }),

  addTickets: userProcedure
    .input(CartDetailsValidator)
    .mutation(async ({ input, ctx }) => {
      const {
        contest_id,
        contest_no,
        tickets,
        each_ticket_price,
        total_price,
      } = input
      const { user } = ctx

      const payload = await getPayloadClient()

      try {
        await payload.create({
          collection: 'cart',
          data: {
            contest_id,
            contest_no,
            tickets,
            each_ticket_price,
            total_price,
            user: { relationTo: 'users', value: user.id },
          },
        })

        return { success: true }
      } catch (err) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }
    }),
})
