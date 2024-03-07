import { z } from 'zod'

export const ContestIdValidator = z.object({
  id: z.string(),
})

export type TContestIdValidator = z.infer<typeof ContestIdValidator>
