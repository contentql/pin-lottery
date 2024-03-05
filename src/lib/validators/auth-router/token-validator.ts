import { z } from 'zod'

export const TokenValidator = z.object({ token: z.string() })

export type TTokenValidator = z.infer<typeof TokenValidator>
