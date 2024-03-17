import { TRPCError } from '@trpc/server'
import { customAlphabet } from 'nanoid'

import { getPayloadClient } from '../get-payload'
import { ContestIdValidator } from '../lib/validators/contest-id-validator'
import { TicketValidator } from '../lib/validators/ticket-validator'
import { publicProcedure, router, userProcedure } from '../trpc/trpc'

export const ticketRouter = router({
  getTickets: userProcedure.query(async ({ ctx }) => {
    const { user } = ctx

    const payload = await getPayloadClient()

    try {
      const tickets = await payload.find({
        collection: 'tickets',
        user,
        overrideAccess: false,
        depth: 1,
      })

      return tickets.docs
    } catch (err) {
      throw new TRPCError({ code: 'BAD_REQUEST' })
    }
  }),

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

  getContestTickets: publicProcedure.input(ContestIdValidator).query(async({input}) => {
    const {id }=input
    const payload = await getPayloadClient();

   const tickets = await payload.find({
     collection: 'tickets',
     where: {
       'contest_id.value': {
         equals: id,
       },
     },
   })
    return tickets?.docs
  }),

  deleteTickets: publicProcedure.input(ContestIdValidator).mutation(async ({input}) => {
    
    const { id } = input
    
    const payload = await getPayloadClient()
    
    await payload.delete({
      collection: 'tickets',
      where: {
        'contest_id.value': {
          equals:id
        }
      }
    })
    return true;
  })
})
