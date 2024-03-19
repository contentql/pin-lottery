import { z } from 'zod'

export const TicketsCountValidator = z.object({
  id: z.string(),
  tickets: z.number(),
})

export type TTicketsCountValidator = z.infer<typeof TicketsCountValidator>
