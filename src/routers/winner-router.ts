import { TRPCError } from '@trpc/server'
import { getPayloadClient } from '../get-payload'
import { WinnerDetailsValidator } from '../lib/validators/winner-details-validator'
import { WinnerPaginationValidator } from '../lib/validators/winner-pagination-validator'
import { publicProcedure, router } from '../trpc/trpc'

export const WinnerRouter = router({
  addWinner: publicProcedure
    .input(WinnerDetailsValidator)
    .mutation(async ({ input }) => {
      const { contest_id, ticket_id } = input

      const payload = await getPayloadClient()

      try {
        const winner = await payload.create({
          collection: 'winner',
          data: {
            ticket: { relationTo: 'tickets', value: ticket_id },
            contest: { relationTo: 'contest', value: contest_id },
          },
        })

        return { winner }
      } catch (error: any) {
        console.log('Error adding winner:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error?.message || 'Failed to add winner.',
        })
      }
    }),

  // getWinners: publicProcedure
  //   .input(WinnerPaginationValidator)
  //   .query(async ({ input }) => {
  //     const { pageNumber, ticketNumber, contestIds } = input

  //     const whereClauses = contestIds.map(contestId => ({
  //       'contest.value': {
  //         equals: contestId,
  //       },
  //     }))
  //     const payload = await getPayloadClient()

  //     try {
  //       const winners = await payload.find({
  //         collection: 'winner',
  //         limit: 9,
  //         depth: 5,
  //         page: pageNumber,
  //         where: {
  //           or: [...whereClauses],
  //           and: [
  //             {
  //               ...(ticketNumber !== '' && {
  //                 'ticket.value': {
  //                   equals: ticketNumber,
  //                 },
  //               }),
  //             },
  //           ],
  //         },
  //       })

  //       return { Winners: winners?.docs, totalDocs: winners?.totalDocs }
  //     } catch (error: any) {
  //       console.log('Error getting winners:', error)
  //       throw new TRPCError({
  //         code: 'INTERNAL_SERVER_ERROR',
  //         message: error?.message || 'Failed to get winners.',
  //       })
  //     }
  //   }),

  getWinnersByAggregations: publicProcedure
    .input(WinnerPaginationValidator)
    .query(async ({ input }) => {
      const { tag, pageNumber, ticketNumber } = input
      const payload = await getPayloadClient()
      const totalDocs = await (payload.db as any).collections[
        'winner'
      ].countDocuments()
      const data = await (payload.db as any).collections['winner'].aggregate([
        {
          $addFields: {
            contest_id: {
              $toObjectId: '$contest.value',
            },
          },
        },
        {
          $addFields: {
            ticket_id: {
              $toObjectId: '$ticket.value',
            },
          },
        },
        {
          $lookup: {
            from: 'contests',
            localField: 'contest_id',
            foreignField: '_id',
            as: 'contest_data',
          },
        },
        {
          $lookup: {
            from: 'tickets',
            localField: 'ticket_id',
            foreignField: '_id',
            as: 'ticket_data',
          },
        },
        {
          $addFields: {
            contest_data: {
              $arrayElemAt: ['$contest_data', 0],
            },
          },
        },
        {
          $addFields: {
            ticket_data: {
              $arrayElemAt: ['$ticket_data', 0],
            },
          },
        },
        {
          $set: {
            'contest.details': '$contest_data',
          },
        },
        {
          $set: {
            'ticket.details': '$ticket_data',
          },
        },
        {
          $unset: 'contest_data',
        },
        {
          $unset: 'ticket_data',
        },
        {
          $unset: 'contest_id',
        },
        {
          $unset: 'ticket_id',
        },
        {
          $match: {
            $and: [
              { 'contest.details.product_type': { $eq: tag } },
              { 'ticket.details.ticket_number': { $eq: ticketNumber } },
            ],
          },
        },
      ])
      return { winners: data, totalDocs }
    }),
})
