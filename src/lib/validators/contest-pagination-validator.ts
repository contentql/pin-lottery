import { z } from 'zod'

export const ContestPaginationValidator = z.object({
  pageNumber: z.number(),
  filterByName: z.string(),
})

export type TContestPaginationValidator = z.infer<
  typeof ContestPaginationValidator
>
