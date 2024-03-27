import { z } from 'zod'

export const WinnerPaginationValidator = z.object({
  pageNumber: z.number(),
  ticketNumber: z.string(),
  tag: z.string(),
})

export type TWinnerPaginationValidator = z.infer<
  typeof WinnerPaginationValidator
>
