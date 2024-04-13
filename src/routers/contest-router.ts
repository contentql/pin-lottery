import { getPayloadClient } from '../get-payload'
import { ContestIdValidator } from '../lib/validators/contest-id-validator'
import { ContestPaginationValidator } from '../lib/validators/contest-pagination-validator'
import { ContestWinnerValidator } from '../lib/validators/contest-winner-validator'
import { publicProcedure, router } from '../trpc/trpc'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const contestRouter = router({
  getContests: publicProcedure
    .input(ContestPaginationValidator)
    .query(async ({ input }) => {
      const {
        pageNumber,
        filterByName,
        filterByPrice,
        filterByTitle,
        filterByContestStatus,
      } = input

      const payload = await getPayloadClient()

      try {
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
                ...(filterByContestStatus === 'ongoingContests' && {
                  reached_threshold: {
                    equals: false,
                  },
                }),
              },
              {
                ...(filterByContestStatus === 'thresholdReached' && {
                  reached_threshold: {
                    equals: true,
                  },
                  and: [
                    {
                      contest_status: {
                        equals: false,
                      },
                    },
                  ],
                }),
              },
              {
                ...(filterByContestStatus === 'winnerAnnounced' && {
                  contest_status: {
                    equals: true,
                  },
                }),
              },
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
      } catch (error: any) {
        console.error('Error getting contests:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error?.message || 'Failed to get contests.',
        })
      }
    }),

  getContestById: publicProcedure
    .input(ContestIdValidator)
    .query(async ({ input }) => {
      const payload = await getPayloadClient()

      try {
        const { id } = input
        const contestById = await payload.findByID({
          collection: 'contest',
          id: id,
          depth: 5,
        })
        return contestById
      } catch (error: any) {
        console.error('Error getting contest by ID:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error?.message || 'Failed to get contest by ID.',
        })
      }
    }),

  updateContestTimerStatus: publicProcedure
    .input(ContestWinnerValidator)
    .mutation(async ({ input }) => {
      const { id, contest_timer_status } = input

      const payload = await getPayloadClient()

      try {
        if (contest_timer_status) {
          await payload.update({
            collection: 'contest',
            id: id,
            data: {
              contest_timer_status,
            },
          })
        }

        return { status: 'success' }
      } catch (error: any) {
        console.error('Error updating contest timer status:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error?.message || 'Failed to update contest timer status.',
        })
      }
    }),

  getContestIds: publicProcedure
    .input(ContestIdValidator)
    .query(async ({ input }) => {
      const { id } = input

      const payload = await getPayloadClient()

      try {
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
      } catch (error: any) {
        console.error('Error fetching contest IDs:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error?.message || 'Failed to fetch contest IDs.',
        })
      }
    }),
  getSimilarContests: publicProcedure
    .input(z.object({ productType: z.string() }))
    .query(async ({ input }) => {
      const payload = await getPayloadClient()
      const { productType } = input
      try {
        const similarContests = await payload.find({
          collection: 'contest',
          depth: 3,
          limit: 3,
          where: {
            product_type: {
              equals: productType,
            },
            and: [
              {
                contest_status: {
                  equals: false,
                },
              },
            ],
          },
        })
        return similarContests.docs
      } catch (error: any) {
        console.error('Error fetching contests:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error?.message || 'Failed to fetch contests.',
        })
      }
    }),
  getOngoingContests: publicProcedure.query(async () => {
    const payload = await getPayloadClient()
    try {
      const ongoingContests = await payload.find({
        collection: 'contest',
        depth: 3,
        limit: 6,
        where: {
          contest_status: {
            equals: false,
          },
        },
      })
      return ongoingContests.docs
    } catch (error: any) {
      console.error('Error fetching contests:', error)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error?.message || 'Failed to fetch contests.',
      })
    }
  }),
  getHeroContests: publicProcedure
    .input(z.object({ id: z.any() }))
    .query(async () => {
      const payload = await getPayloadClient()
      try {
        const heroContests = await payload.find({
          collection: 'contest',
          depth: 6,
          pagination: false,
          where: {
            show_in_hero: {
              equals: true,
            },
          },
        })
        return heroContests.docs
      } catch (error: any) {
        console.error('Error fetching contests:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error?.message || 'Failed to fetch contests.',
        })
      }
    }),
})
