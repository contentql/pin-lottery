import { z } from 'zod'

export const UserPersonalDetailsValidator = z.object({
  user_name: z
    .string()
    .min(3, 'Username must contain at least 3 character(s)')
    .max(20, 'Username must contain at most 20 character(s)'),
  dob: z.string().optional(),
  address: z.string().optional(),
  phone_number: z.string().optional(),
})

export type TUserPersonalDetailsValidator = z.infer<
  typeof UserPersonalDetailsValidator
>
