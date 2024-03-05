import { CollectionConfig } from 'payload/types'
import { ResetPassword } from '../../email-templates/resetPassword'
import { UserAccountVerification } from '../../email-templates/userAccountVerification'
const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    cookies: {
      secure: true,
      sameSite: 'strict',
      // domain: process.env.PAYLOAD_COOKIE_DOMAIN,
    },
    forgotPassword: {
      generateEmailHTML: args => {
        return ResetPassword({
          actionLabel: 'Reset Your Password',
          buttonText: 'Reset Password',
          href: `${process.env.NEXT_PUBLIC_SERVER_URL}/reset-password?token=${args?.token}`,
        })
      },
    },
    verify: {
      generateEmailHTML: ({ token, user }) => {
        console.log('Verifying user', user)
        return UserAccountVerification({
          actionLabel: 'verify your account',
          buttonText: 'Verify Account',
          userName: user.user_name,
          href: `${process.env.NEXT_PUBLIC_SERVER_URL}/verify?token=${token}`,
        })
      },
    },
  },
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'user_name',
      type: 'text',
      label: 'User Name',
    },
    {
      name: 'first_name',
      type: 'text',
      label: 'First Name',
    },
    {
      name: 'last_name',
      type: 'text',
      label: 'Last Name',
    },
    {
      name: 'address',
      type: 'textarea',
      label: 'User Address',
    },
    {
      name: 'phone_number',
      type: 'text',
      label: 'Phone Number',
    },
    {
      name: 'roles',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
        { label: 'Seller', value: 'seller' },
      ],
      defaultValue: ['user'],
      hasMany: true,
      saveToJWT: true,
    },
  ],
}

export default Users
