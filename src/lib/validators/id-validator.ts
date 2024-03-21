import { z } from 'zod'

export const IdValidator = z.object({
  id: z.string(),
})

export type TIdValidator = z.infer<typeof IdValidator>
