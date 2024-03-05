import { z } from 'zod'

export const LoginValidator = z.object({
  email: z.string().email('not a valid email'),
  password: z.string(),
})
export type TLoginValidator = z.infer<typeof LoginValidator>
