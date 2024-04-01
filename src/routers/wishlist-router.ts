import { TRPCError } from '@trpc/server'

import { getPayloadClient } from '../get-payload'
import { IdValidator } from '../lib/validators/id-validator'
import { WishlistDetailsValidator } from '../lib/validators/wishlist-details-validator'
import { router, userProcedure } from '../trpc/trpc'

export const wishlistRouter = router({
  getWishlistTickets: userProcedure.query(async ({ ctx }) => {
    const { user } = ctx

    const payload = await getPayloadClient()

    try {
      const tickets = await payload.find({
        collection: 'wishlist',
        user,
        overrideAccess: false,
      })

      return tickets.docs
    } catch (error: any) {
      console.error('Error getting wishlist data:', error)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error?.message || 'Failed to retrieve wishlist data.',
      })
    }
  }),

  addTicketsToWishlist: userProcedure
    .input(WishlistDetailsValidator)
    .mutation(async ({ input, ctx }) => {
      const { contest_id } = input

      const { user } = ctx

      const payload = await getPayloadClient()

      try {
        await payload.create({
          collection: 'wishlist',
          data: {
            contest: { relationTo: 'contest', value: contest_id },
          },
          user,
        })

        return { success: true }
      } catch (error: any) {
        console.error('Error adding tickets to wishlist:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error?.message || 'Failed to add tickets to wishlist.',
        })
      }
    }),

  deleteById: userProcedure.input(IdValidator).mutation(async ({ input }) => {
    const { id } = input

    const payload = await getPayloadClient()

    try {
      await payload.delete({
        collection: 'wishlist',
        id,
      })

      return { success: true }
    } catch (error: any) {
      console.error('Error deleting wishlist data by id:', error)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error?.message || 'Failed to delete wishlist data by id.',
      })
    }
  }),

  deleteAllTicketsOfUserFromWishlist: userProcedure.mutation(
    async ({ ctx }) => {
      const { user } = ctx

      const payload = await getPayloadClient()

      try {
        await payload.delete({
          collection: 'wishlist',
          where: {
            'user_id.value': {
              equals: user?.id,
            },
          },
        })

        return { success: true }
      } catch (error: any) {
        console.error('Error deleting wishlist data by user:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error?.message || 'Failed to delete wishlist data by user.',
        })
      }
    },
  ),
})
