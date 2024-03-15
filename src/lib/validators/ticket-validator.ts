import { z } from 'zod'

export const TicketValidator = z.object({
  ticket_price: z.number(),
})

export type TTicketValidator = z.infer<typeof TicketValidator>
