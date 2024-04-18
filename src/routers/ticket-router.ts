import { getPayloadClient } from '../get-payload'
import { ContestIdValidator } from '../lib/validators/contest-id-validator'
import { PageNumberValidator } from '../lib/validators/page-number-validator'
import { TicketValidator } from '../lib/validators/ticket-validator'
import { publicProcedure, router, userProcedure } from '../trpc/trpc'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const ticketRouter = router({
  getTickets: userProcedure.query(async ({ ctx }) => {
    const { user } = ctx

    const payload = await getPayloadClient()

    try {
      const tickets = await payload.find({
        collection: 'tickets',
        user,
        overrideAccess: false,
        pagination: false,
      })

      return tickets?.docs
    } catch (error: any) {
      console.log('Error getting tickets:', error)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error?.message || 'Failed to get tickets.',
      })
    }
  }),

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
          // where clause is not working for 'contest_id.value.contest_status'
          where: {
            'contest_id.value.contest_status': {
              equals: false,
            },
          },
        })

        return tickets?.docs
      } catch (error: any) {
        console.log('Error getting upcoming draws tickets:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error?.message || 'Failed to get upcoming draws tickets.',
        })
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
          // where clause is not working for 'contest_id.value.contest_status'
          where: {
            'contest_id.value.contest_status': {
              equals: true,
            },
          },
        })

        return tickets?.docs
      } catch (error: any) {
        console.log('Error getting past draws tickets:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error?.message || 'Failed to get past draws tickets.',
        })
      }
    }),

  addTickets: userProcedure
    .input(TicketValidator)
    .mutation(async ({ input, ctx }) => {
      const payload = await getPayloadClient()

      const { user } = ctx

      try {
        const ticketsData = await Promise.all(
          input.map(async ({ ticket_price, contest_id }) => {
            return payload.create({
              collection: 'tickets',
              data: {
                ticket_price,
                contest_id: { relationTo: 'contest', value: contest_id },
              },
              user,
              context: {
                chargeAmount: true,
              },
            })
          }),
        )
        return ticketsData
      } catch (error: any) {
        console.log('Error adding tickets:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error?.message || 'Failed to add tickets.',
        })
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
        console.log('Error getting tickets by contest:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error?.message || 'Failed to get tickets by contest.',
        })
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
        console.log('Error deleting tickets:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error?.message || 'Failed to delete tickets.',
        })
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

      try {
        const ticket = await payload.find({
          collection: 'tickets',
          depth: 0,
          where: {
            ticket_number: {
              equals: ticket_no,
            },
          },
        })

        return ticket?.docs.at(0)
      } catch (error: any) {
        console.log('Error getting ticket by id:', error)
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: error?.message || 'Failed to get ticket by id.',
        })
      }
    }),
})
