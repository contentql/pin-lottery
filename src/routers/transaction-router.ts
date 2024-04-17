import { getPayloadClient } from '../get-payload'
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
    } catch (error: any) {
      console.error('Error getting transaction data:', error)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error?.message || 'Failed to retrieve transactions data.',
      })
    }
  }),
})
