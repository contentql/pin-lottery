import { z } from 'zod'

export const CartDetailsValidator = z.object({
  contest_id: z.string(),
  contest_no: z.string(),
  tickets: z.number(),
  each_ticket_price: z.number(),
  total_price: z.number(),
})

export type TCartDetailsValidator = z.infer<typeof CartDetailsValidator>
