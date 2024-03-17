import { z } from 'zod';

export const WinnerDetailsValidator = z.object({
    ticket_number: z.string(),
    user_id: z.string(),
    contest_id: z.string(),
})

export type TWinnerDetailsValidator=z.infer<typeof WinnerDetailsValidator>