import { TRPCError } from '@trpc/server'
import { customAlphabet } from 'nanoid'

import { z } from 'zod'
import { getPayloadClient } from '../get-payload'
import { ContestIdValidator } from '../lib/validators/contest-id-validator'
import { PageNumberValidator } from '../lib/validators/page-number-validator'
import { TicketValidator } from '../lib/validators/ticket-validator'
import { publicProcedure, router, userProcedure } from '../trpc/trpc'

export const ticketRouter = router({
  getUpcomingDrawsTickets: userProcedure
    .input(PageNumberValidator)
    .query(async ({ ctx, input }) => {
      const { user } = ctx
      const { page = 1 } = input

      const payload = await getPayloadClient()
      const pageSize = 10

      try {
        const tickets = await payload.find({
          collection: 'tickets',
          user,
          overrideAccess: false,
          page,
          limit: page * pageSize,
          // where: {
          //   'contest_id.value.contest_status': {
          //     equals: false,
          //   },
          // },
        })

        return tickets.docs
      } catch (error: any) {
        console.log('Get upcoming draws tickets: ', error)
        throw new TRPCError({ code: 'BAD_REQUEST', message: error?.message })
      }
    }),

  getPastDrawsTickets: userProcedure
    .input(PageNumberValidator)
    .query(async ({ ctx, input }) => {
      const { user } = ctx
      const { page = 1 } = input

      const payload = await getPayloadClient()
      const pageSize = 10

      try {
        const tickets = await payload.find({
          collection: 'tickets',
          user,
          overrideAccess: false,
          page,
          limit: page * pageSize,
          // where: {
          //   'contest_id.value.contest_status': {
          //     equals: true,
          //   },
          // },
        })

        return tickets.docs
      } catch (error: any) {
        console.log('Get past draws tickets: ', error)
        throw new TRPCError({ code: 'BAD_REQUEST', message: error?.message })
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
                ticket_price,
                contest_id: { relationTo: 'contest', value: contest_id },
              },
              user,
            })
          }),
        )

        return { success: true }
      } catch (error: any) {
        console.log('Add tickets: ', error)
        throw new TRPCError({ code: 'BAD_REQUEST', message: error?.message })
      }
    }),

  getContestTickets: publicProcedure
    .input(ContestIdValidator)
    .query(async ({ input }) => {
      const { id } = input

      const payload = await getPayloadClient()

      try {
        const tickets = await payload.find({
        collection: 'tickets',
          where: {
            'contest_id.value': {
              equals: id,
            },
          },
        })
        
      return tickets?.docs
      } catch (error: any) {
        console.log('Get tickets by contest: ', error)
        throw new TRPCError({ code: 'BAD_REQUEST', message: error?.message })
      }
    }),

  deleteTickets: publicProcedure
    .input(ContestIdValidator)
    .mutation(async ({ input }) => {
      const { id } = input

      const payload = await getPayloadClient()

      try {
        await payload.delete({
          collection: 'tickets',
          where: {
            'contest_id.value': {
              equals: id,
            },
          },
        })

        return { success: true }
      } catch (error: any) {
        console.log('Delete Tickets: ', error)
        throw new TRPCError({ code: 'BAD_REQUEST', message: error?.message })
      }
    }),

  getTicketId: publicProcedure
    .input(
      z.object({
        ticket_no: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { ticket_no } = input

      const payload = await getPayloadClient()

      const ticket = await payload.find({
        collection: 'tickets',
        depth: 0,
        where: {
          ticket_number: {
            equals: ticket_no,
          },
        },
      })
      return ticket.docs.at(0)
    }),
})
