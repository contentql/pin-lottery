import { z } from 'zod'

export const TicketNumberValidator = z.object({
  ticketNumber: z.string(),
})

export type TTicketNumberValidator = z.infer<typeof TicketNumberValidator>
