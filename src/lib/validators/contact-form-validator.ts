import { z } from 'zod'

export const ContactFormValidator = z.object({
  name: z.string().min(2, 'Please enter a valid name'),
  email: z.string().email(),
  subject: z.string().min(8, 'minimum subject length is 8 characters'),
  message: z.string().min(50, 'minimum message length is 50 characters'),
})

export type TContactFormValidator = z.infer<typeof ContactFormValidator>
