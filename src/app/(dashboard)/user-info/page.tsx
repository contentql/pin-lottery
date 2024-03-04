import { Metadata } from 'next';

import { getMeUser } from '@/utils/getMeUser';
import UserInfoView from '@/views/UserInfoView';

export const metadata: Metadata = {
  title: 'User Info',
  description: 'This is a user info page',
};

const UserInfo = async () => {
  await getMeUser({ nullUserRedirect: '/login' });

  return <UserInfoView />;
};

export default UserInfo;
