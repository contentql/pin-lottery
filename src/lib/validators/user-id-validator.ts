import { z } from 'zod'

export const UserIdValidator = z.object({ id: z.string() })

export type TUserIdValidator = z.infer<typeof UserIdValidator>
