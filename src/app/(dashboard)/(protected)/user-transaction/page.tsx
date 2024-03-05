import { Metadata } from 'next';

import { getMeUser } from '@/utils/getMeUser';
import UserTransactionView from '@/views/UserTransactionView';

export const metadata: Metadata = {
  title: 'User Transaction',
  description: 'This is a user transaction page',
};

const UserTransaction = async () => {
  await getMeUser({ nullUserRedirect: '/login' });

  return <UserTransactionView />;
};

export default UserTransaction;
