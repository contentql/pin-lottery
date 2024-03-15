import { z } from 'zod'

export const TicketValidator = z.array(
  z.object({
    ticket_price: z.number(),
    contest_id: z.string(),
  }),
)

export type TTicketValidator = z.infer<typeof TicketValidator>
