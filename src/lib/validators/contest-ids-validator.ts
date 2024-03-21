import { z } from 'zod'

export const ContestIdsValidator = z.array(
  z.object({
    id: z.any(),
  }),
)

export type ContestIdsValidator = z.infer<typeof ContestIdsValidator>
