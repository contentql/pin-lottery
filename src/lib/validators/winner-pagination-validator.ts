import { z } from 'zod'
export const WinnerPaginationValidator = z.object({
  pageNumber: z.number(),
  ticketNumber: z.string(),
  contestIds: z.array(z.string()),
})

export type TWinnerPaginationValidator = z.infer<
  typeof WinnerPaginationValidator
>
