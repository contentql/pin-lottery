import { CollectionConfig } from 'payload/types'
import { ResetPassword } from '../../email-templates/resetPassword'
import { UserAccountVerification } from '../../email-templates/userAccountVerification'
import { isAdminOrSelf } from './access/isAdminOrSelf'
const Users: CollectionConfig = {
  slug: 'users',
  access: {
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdminOrSelf,
  },
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
  hooks: {
    // afterChange: [verifyUserEmail],
  },
  fields: [
    {
      name: 'user_name',
      type: 'text',
      label: 'User Name',
    },
    {
      name: 'dob',
      type: 'date',
      label: 'DOB',
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
      name: 'image',
      type: 'upload',
      label: 'User Image',
      relationTo: 'media',
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
