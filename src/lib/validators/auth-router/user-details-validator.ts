import { z } from 'zod'

export const UserPersonalDetailsValidator = z.object({
  user_name: z
    .string()
    .min(3, 'Username must contain at least 3 character(s)')
    .max(20, 'Username must contain at most 20 character(s)'),
  dob: z.string().optional(),
  address: z.string().optional(),
  phone_number: z.string().min(10,'please enter valid phone number')
})

export type TUserPersonalDetailsValidator = z.infer<
  typeof UserPersonalDetailsValidator
>

export const UserEmailValidator = z.object({
  email: z.string().email('Not a valid email'),
})

export type TUserEmailValidator = z.infer<typeof UserEmailValidator>

export const UserPasswordValidator = z
  .object({
    password: z
      .string()
      .regex(
        new RegExp('.*[A-Z].*'),
        'Must contain at least one uppercase character',
      )
      .regex(
        new RegExp('.*[a-z].*'),
        'Must contain at least  one lowercase character',
      )
      .regex(new RegExp('.*\\d.*'), 'Must contain at least one number')
      .regex(
        new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
        'Must contain at least one special character',
      )
      .min(8, 'Must be at least 8 characters in length'),
    confirm_password: z.string().optional(),
  })
  .refine(data => data.password === data.confirm_password, {
    path: ['confirm_password'],
    message: 'Passwords do not match',
  })

export type TUserPasswordValidator = z.infer<typeof UserPasswordValidator>
