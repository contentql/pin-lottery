import { z } from 'zod'

export const WishlistDetailsValidator = z.object({
  contest_id: z.string(),
})

export type TWishlistDetailsValidator = z.infer<typeof WishlistDetailsValidator>
