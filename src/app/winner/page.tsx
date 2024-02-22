import { Metadata } from 'next';

import WinnerView from '@/views/WinnerView';

export const metadata: Metadata = {
  title: 'Winner',
  description: 'This is a winner page',
};

const Winner = () => {
  return <WinnerView />;
};

export default Winner;
