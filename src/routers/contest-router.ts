import { getPayloadClient } from '../get-payload'
import { ContestIdValidator } from '../lib/validators/contest-id-validator'
import { ContestPaginationValidator } from '../lib/validators/contest-pagination-validator'
import { ContestWinnerValidator } from '../lib/validators/contest-winner-validator'
import { publicProcedure, router } from '../trpc/trpc'
export const contestRouter = router({
  getContests: publicProcedure
    .input(ContestPaginationValidator)
    .query(async ({ input }) => {
      const { pageNumber, filterByName, filterByPrice, filterByTitle } = input
      const payload = await getPayloadClient()

      const contest = await payload.find({
        collection: 'contest',
        limit: 9,
        page: pageNumber,
        where: {
          ...(filterByName !== 'all' && {
            product_type: {
              equals: filterByName,
            },
          }),
          and: [
            {
              ...(filterByPrice !== 0 && {
                ticket_price: {
                  less_than_equal: filterByPrice,
                },
              }),
            },
            {
              ...(filterByTitle !== '' && {
                title: {
                  contains: filterByTitle,
                },
              }),
            },
          ],
        },
      })
      const totalContests = contest?.totalDocs
      const allContests = contest.docs.map(
        ({
          id,
          title,
          contest_no,
          day_remain,
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
            ticket_price: ticket_price,
            img: img,
            contest_status: contest_status,
            winner_ticket: winner_ticket,
            updatedAt: updatedAt,
            createdAt: createdAt,
          }
        },
      )
      return { allContests, totalContests }
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
      const { id, contest_status, winner_id } = input

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
  getContestIds: publicProcedure
    .input(ContestIdValidator)
    .query(async ({ input }) => {
      const { id } = input

      const payload = await getPayloadClient()

      const contestIds = await payload.find({
        collection: 'contest',
        pagination: false,
        depth: 0,
        where: {
          product_type: {
            equals: id,
          },
        },
      })
      return contestIds.docs
    }),
})
