import { Metadata } from 'next';

import { getMeUser } from '@/utils/getMeUser';
import UserLotteryView from '@/views/UserLotteryView';

export const metadata: Metadata = {
  title: 'User Lottery',
  description: 'This is a user lottery page',
};

const UserLottery = async () => {
  await getMeUser({ nullUserRedirect: '/login' });

  return <UserLotteryView />;
};

export default UserLottery;
