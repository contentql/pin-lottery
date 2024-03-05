import { Metadata } from 'next';

import { getMeUser } from '@/utils/getMeUser';
import UserReferralView from '@/views/UserReferralView';

export const metadata: Metadata = {
  title: 'User Referral',
  description: 'This is a user referral page',
};

const UserReferral = async () => {
  await getMeUser({ nullUserRedirect: '/login' });

  return <UserReferralView />;
};

export default UserReferral;
