import { z } from 'zod'

export const CartDetailsValidator = z.object({
  contest_no: z.string(),
  tickets: z.number(),
})

export type TCartDetailsValidator = z.infer<typeof CartDetailsValidator>
