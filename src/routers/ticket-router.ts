import { TRPCError } from '@trpc/server'

import { getPayloadClient } from '../get-payload'
import { TicketValidator } from '../lib/validators/ticket-validator'
import { router, userProcedure } from '../trpc/trpc'

export const ticketRouter = router({
  getTickets: userProcedure.query(async () => {
    const payload = await getPayloadClient()

    try {
      const tickets = await payload.find({ collection: 'tickets' })

      return tickets.docs
    } catch (err) {
      throw new TRPCError({ code: 'UNAUTHORIZED' })
    }
  }),

  addTickets: userProcedure
    .input(TicketValidator)
    .mutation(async ({ input, ctx }) => {
      const { ticket_price } = input

      const payload = await getPayloadClient()

      try {
        await payload.create({
          collection: 'tickets',
          data: {
            ticket_price,
          },
        })

        return { success: true }
      } catch (err) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }
    }),
})
