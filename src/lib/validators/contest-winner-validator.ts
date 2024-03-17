import { z } from 'zod';

export const ContestWinnerValidator = z.object({
    contest_id:z.string(),
    winner_number: z.string(),
    contest_status: z.boolean()
})

export type TContestWinnerValidator=z.infer<typeof ContestWinnerValidator>