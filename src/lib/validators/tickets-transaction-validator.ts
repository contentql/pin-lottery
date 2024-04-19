import { z } from 'zod'

export const TicketsTransactionValidator = z.object({
  amount: z.number(),
  transactionDate: z.string(),
  paymentStatus: z.string(),
  paymentMethod: z.string(),
  transactionBody: z.any(),
})

export type TTicketsTransactionValidator = z.infer<
  typeof TicketsTransactionValidator
>
