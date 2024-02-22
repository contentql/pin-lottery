import { Metadata } from 'next';

import UserReferralView from '@/views/UserReferralView';

export const metadata: Metadata = {
  title: 'User Referral',
  description: 'This is a user referral page',
};

const UserReferral = () => {
  return <UserReferralView />;
};

export default UserReferral;
