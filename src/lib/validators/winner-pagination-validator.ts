import { z } from 'zod'
export const WinnerPaginationValidator = z.object({
  filterWinnerByTag: z.string(),
  ticketNumber: z.string(),
})

export type TWinnerPaginationValidator = z.infer<
  typeof WinnerPaginationValidator
>
