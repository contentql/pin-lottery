import { TRPCError } from '@trpc/server'

import { getPayloadClient } from '../get-payload'
import { CartDetailsValidator } from '../lib/validators/cart-details-validator'
import { IdValidator } from '../lib/validators/id-validator'
import { TicketsCountValidator } from '../lib/validators/tickets-count-validator'
import { router, userProcedure } from '../trpc/trpc'

export const cartRouter = router({
  getCartTickets: userProcedure.query(async ({ ctx }) => {
    const { user } = ctx

    const payload = await getPayloadClient()

    try {
      const tickets = await payload.find({
        collection: 'cart',
        user,
        overrideAccess: false,
      })

      return tickets.docs
    } catch (error: any) {
      console.log('Get cart data: ', error)
      throw new TRPCError({ code: 'BAD_REQUEST', message: error?.message })
    }
  }),

  addTicketsToCart: userProcedure
    .input(CartDetailsValidator)
    .mutation(async ({ input, ctx }) => {
      const { contest_id, tickets, total_price } = input

      const { user } = ctx

      const payload = await getPayloadClient()

      try {
        await payload.create({
          collection: 'cart',
          data: {
            tickets,
            total_price,
            contest_id: { relationTo: 'contest', value: contest_id },
          },
          user,
        })

        return { success: true }
      } catch (error: any) {
        console.log('Add tickets to cart: ', error)
        throw new TRPCError({ code: 'BAD_REQUEST', message: error?.message })
      }
    }),

  updateTicketsOfUserFromCart: userProcedure
    .input(TicketsCountValidator)
    .mutation(async ({ input }) => {
      const { id, tickets, total_price } = input

      const payload = await getPayloadClient()

      try {
        await payload.update({
          collection: 'cart',
          id,
          data: {
            tickets,
            total_price,
          },
        })

        return { success: true }
      } catch (error: any) {
        console.log('Update cart tickets: ', error)
        throw new TRPCError({ code: 'BAD_REQUEST', message: error?.message })
      }
    }),

  deleteById: userProcedure
    .input(IdValidator)
    .mutation(async ({ input, ctx }) => {
      const { user } = ctx

      const { id } = input

      const payload = await getPayloadClient()

      try {
        await payload.delete({
          collection: 'cart',
          id,
        })

        return { success: true }
      } catch (error: any) {
        console.log('Delete cart data by id: ', error)
        throw new TRPCError({ code: 'BAD_REQUEST', message: error?.message })
      }
    }),

  deleteAllTicketsOfUserFromCart: userProcedure.mutation(async ({ ctx }) => {
    const { user } = ctx

    const payload = await getPayloadClient()

    try {
      await payload.delete({
        collection: 'cart',
        where: {
          'user_id.value': {
            equals: user?.id,
          },
        },
      })

      return { success: true }
    } catch (error: any) {
      console.log('Delete cart data by user: ', error)
      throw new TRPCError({ code: 'BAD_REQUEST', message: error?.message })
    }
  }),
})
