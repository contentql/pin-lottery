import { z } from 'zod'
export const ForgotPasswordValidator = z.object({
  email: z.string().email('not a valid email'),
})
export type TForgotPasswordValidator = z.infer<typeof ForgotPasswordValidator>
