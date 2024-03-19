import { getPayloadClient } from '../get-payload'
import { ContestIdValidator } from '../lib/validators/contest-id-validator'
import { ContestWinnerValidator } from '../lib/validators/contest-winner-validator'
import { publicProcedure, router } from '../trpc/trpc'
export const contestRouter = router({
  getContests: publicProcedure.query(async () => {
    const payload = await getPayloadClient()

    const contest = await payload.find({ collection: 'contest' })

    const allcontests = contest.docs.map(
      ({
        id,
        title,
        contest_no,
        day_remain,
        tag,
        ticket_price,
        img,
        contest_status,
        winner_ticket,
        updatedAt,
        createdAt,
      }) => {
        return {
          id: id,
          title: title,
          contest_no: contest_no,
          day_remain: day_remain,
          tag: tag,
          ticket_price: ticket_price,
          img: img,
          contest_status: contest_status,
          winner_ticket: winner_ticket,
          updatedAt: updatedAt,
          createdAt: createdAt,
        }
      },
    )
    return allcontests
  }),

  getContestById: publicProcedure
    .input(ContestIdValidator)
    .query(async ({ input }) => {
      const payload = await getPayloadClient()

      const { id } = input

      const contestById = await payload.findByID({
        collection: 'contest',
        id: id,
        depth: 5,
      })

      return contestById
    }),

  updateContest: publicProcedure
    .input(ContestWinnerValidator)
    .mutation(async ({ input }) => {
      const { id,contest_status,winner_id} = input

      const payload = await getPayloadClient()

      await payload.update({
        collection: 'contest',
        id: id,
        data: {
          contest_status,
          winner_ticket: { relationTo: 'winner', value: winner_id },
        },
      })
      return { status: 'success' }
    }),
})
