import { getPayloadClient } from '../get-payload'
import { WinnerDetailsValidator } from '../lib/validators/winner-details-validator'
import { publicProcedure, router } from '../trpc/trpc'
import { TRPCError } from '@trpc/server'

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

  getWinners: publicProcedure.query(async () => {
    const payload = await getPayloadClient()
    const winners = await payload.find({
      collection: 'winner',
      pagination: false,
      depth: 5,
    })
    return winners.docs
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
})
