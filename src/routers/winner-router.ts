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

      const winner = await payload.create({
        collection: 'winner',
        data: {
          ticket: { relationTo: 'tickets', value: ticket_id },
          contest: { relationTo: 'contest', value: contest_id },
        },
      })
      return { winner: winner }
    }),

  // getWinnerByTicketNumber: publicProcedure
  //   .input(TicketNumberValidator)
  //   .query(async ({ input }) => {
  //     const { ticketNumber } = input
  //     const payload = await getPayloadClient()

  //     const winners = await payload.find({
  //       collection: 'winner',
  //       depth: 5,
  //       where: {
  //         'ticket.value': {
  //           equals: ticketNumber,
  //         },
  //       },
  //     })

  //     return winners?.docs
  //   }),

  getWinners: publicProcedure
    .input(WinnerPaginationValidator)
    .query(async ({ input }) => {
      const { pageNumber, ticketNumber, contestIds } = input

      const whereClauses = contestIds.map(contestId => ({
        'contest.value': {
          equals: contestId,
        },
      }))
      const payload = await getPayloadClient()

      const winners = await payload.find({
        collection: 'winner',
        limit: 9,
        depth: 5,
        page: pageNumber,
        where: {
          ...(ticketNumber !== '' && {
            'ticket.value': {
              equals: ticketNumber,
            },
          }),
          or: [...whereClauses],
        },
      })

      return { Winners: winners?.docs, totalDocs: winners?.totalDocs }
    }),
})
