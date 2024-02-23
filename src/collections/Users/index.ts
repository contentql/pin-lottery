import { CollectionConfig } from 'payload/types';
import UserVerification from '../../components/email-templates/UserVerification';
const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    cookies: {
      secure: true,
      sameSite: 'strict',
      // domain: process.env.PAYLOAD_COOKIE_DOMAIN,
    },
    verify: {
      generateEmailHTML: UserVerification,
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
};

export default Users;
