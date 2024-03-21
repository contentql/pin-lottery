import { z } from 'zod'

export const PageNumberValidator = z.object({ page: z.number().optional() })

export type TPageNumberValidator = z.infer<typeof PageNumberValidator>
