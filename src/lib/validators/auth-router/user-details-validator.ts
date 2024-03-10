import { z } from 'zod'

export const UserDetailsValidator = z.object({
  username: z.string(),
  dob: z.date(),
  address: z.string(),
  phone_number: z.string(),
})

export type TUserDetailsValidator = z.infer<typeof UserDetailsValidator>
