import { TRPCError } from '@trpc/server'
import { customAlphabet } from 'nanoid'

import { getPayloadClient } from '../get-payload'
import { TicketValidator } from '../lib/validators/ticket-validator'
import { router, userProcedure } from '../trpc/trpc'

export const ticketRouter = router({
  addTickets: userProcedure
    .input(TicketValidator)
    .mutation(async ({ input, ctx }) => {
      const payload = await getPayloadClient()

      const { user } = ctx

      const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      const nanoid = customAlphabet(alphabet, 14)

      try {
        await Promise.all(
          input.map(async ({ ticket_price, contest_id }) => {
            await payload.create({
              collection: 'tickets',
              data: {
                ticket_number: nanoid(),
                ticket_price,
                contest_id: { relationTo: 'contest', value: contest_id },
                purchased_by: { relationTo: 'users', value: user?.id },
              },
            })
          }),
        )

        return { success: true }
      } catch (err) {
        throw new TRPCError({ code: 'BAD_REQUEST' })
      }
    }),
})
