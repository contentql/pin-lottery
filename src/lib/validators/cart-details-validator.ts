import { z } from 'zod'

export const CartDetailsValidator = z.object({
  contest_id: z.string(),
  tickets: z.number(),
  total_price: z.number(),
})

export type TCartDetailsValidator = z.infer<typeof CartDetailsValidator>
