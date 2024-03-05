import { Metadata } from 'next';

import { getMeUser } from '@/utils/getMeUser';
import UserView from '@/views/UserView';

export const metadata: Metadata = {
  title: 'User',
  description: 'This is a user page',
};

const User = async () => {
  await getMeUser({ nullUserRedirect: '/login' });

  return <UserView />;
};

export default User;
