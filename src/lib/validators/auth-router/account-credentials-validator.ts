import { z } from 'zod'

export const AuthCredentialsValidator = z
  .object({
    user_name: z
      .string()
      .min(3, 'Username must contain at least 3 character(s)')
      .max(20, 'Username must contain at most 20 character(s)'),
    email: z.string().email('Not a valid email'),
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
    confirm_password: z.string(),
  })
  .refine(data => data.password === data.confirm_password, {
    path: ['confirm_password'],
    message: 'Passwords do not match',
  })

export type TAuthCredentialsValidator = z.infer<typeof AuthCredentialsValidator>
