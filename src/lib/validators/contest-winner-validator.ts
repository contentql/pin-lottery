import { z } from 'zod';

export const ContestWinnerValidator = z.object({
    id: z.string(),
    winner_id:z.string(),
    contest_status: z.boolean()
})

export type TContestWinnerValidator=z.infer<typeof ContestWinnerValidator>