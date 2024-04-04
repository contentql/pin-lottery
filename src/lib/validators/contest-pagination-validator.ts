import { z } from 'zod'

export const ContestPaginationValidator = z.object({
  pageNumber: z.number(),
  filterByName: z.string(),
  filterByPrice: z.number(),
  filterByContestStatus: z.string(),
  filterByTitle: z.string(),
})

export type TContestPaginationValidator = z.infer<
  typeof ContestPaginationValidator
>
