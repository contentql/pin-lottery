import { TRPCError } from '@trpc/server'

import { getPayloadClient } from '../get-payload'
import { TicketValidator } from '../lib/validators/ticket-validator'
import { router, userProcedure } from '../trpc/trpc'

export const ticketRouter = router({
  addTickets: userProcedure
    .input(TicketValidator)
    .mutation(async ({ input, ctx }) => {
      const payload = await getPayloadClient()

      const { user } = ctx

      try {
        await Promise.all(
          input.map(async ({ ticket_price, contest_id }) => {
            await payload.create({
              collection: 'tickets',
              data: {
                ticket_number: '',
                ticket_price,
                contest_id: { relationTo: 'contest', value: contest_id },
                purchased_by: { relationTo: 'users', value: user?.id },
              },
            })
          }),
        )

        return { success: true }
      } catch (err) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }
    }),
})
