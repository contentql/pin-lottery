import { Metadata } from 'next';

import { getMeUser } from '@/utils/getMeUser';
import WinnerView from '@/views/WinnerView';

export const metadata: Metadata = {
  title: 'Winner',
  description: 'This is a winner page',
};

const Winner = async () => {
  await getMeUser({ nullUserRedirect: '/login' });

  return <WinnerView />;
};

export default Winner;
