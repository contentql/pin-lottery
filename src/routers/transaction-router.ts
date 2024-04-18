import { getPayloadClient } from '../get-payload'
import { TicketsTransactionValidator } from '../lib/validators/tickets-transaction-validator'
import { router, userProcedure } from '../trpc/trpc'
import { TRPCError } from '@trpc/server'

export const transactionRouter = router({
  getUserTransactions: userProcedure.query(async ({ ctx }) => {
    const { user } = ctx

    const payload = await getPayloadClient()

    try {
      const transactions = await payload.find({
        collection: 'transaction',
        user,
        overrideAccess: false,
        pagination: false,
      })

      return transactions.docs
    } catch (error: unknown) {
      // Changed type from any to unknown
      console.error('Error getting transaction data:', error)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        // Added a type assertion for error to have a 'message' property
        message:
          (error as { message?: string })?.message ||
          'Failed to retrieve transactions data.',
      })
    }
  }),
  addTicketsTransaction: userProcedure
    .input(TicketsTransactionValidator)
    .mutation(async ({ input, ctx }) => {
      const payload = await getPayloadClient()

      try {
        const {
          amount,
          paymentMethod,
          paymentStatus,
          transactionBody,
          transactionDate,
        } = input
        const { user } = ctx
        payload.create({
          collection: 'transaction',
          data: {
            user: {
              relationTo: 'users',
              value: user.id,
            },
            amount: amount,
            date: transactionDate,
            type_of_transaction: 'tickets_purchased',
            status: paymentStatus,
            payment_method: paymentMethod,
            tickets_transactions: { ...[transactionBody] },
          },
        })
      } catch (error: unknown) {
        // Changed type from any to unknown
        console.error('Error while creating transaction:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          // Added a type assertion for error to have a 'message' property
          message:
            (error as { message?: string })?.message ||
            'Failed to create transaction.',
        })
      }
    }),
})
