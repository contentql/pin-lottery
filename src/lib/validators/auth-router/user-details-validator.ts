import { z } from 'zod'

export const UserDetailsValidator = z.object({
  first_name: z.string(),
  last_name: z.string(),
  address: z.string(),
  phone_number: z.string(),
})

export type TUserDetailsValidator = z.infer<typeof UserDetailsValidator>
