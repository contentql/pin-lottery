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

  getWinners: publicProcedure
    .input(WinnerPaginationValidator)
    .query(async ({ input }) => {
      const { filterWinnerByTag } = input
      const payload = await getPayloadClient()

      const winners = await payload.find({
        collection: 'winner',
        depth: 5,
        limit: 6,
        // where: {
        //   'contest?.value?.contest_no': {
        //     equals: '121',
        //   },
        // },
      })

      return winners?.docs
    }),
})
