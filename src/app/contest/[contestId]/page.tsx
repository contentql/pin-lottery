import { Metadata } from 'next';

import ContestDetailsView from '@/views/ContestDetailsView';

export const metadata: Metadata = {
  title: 'Contest Details',
  description: 'This is a contest details page',
};

const ContestDetails = () => {
  return <ContestDetailsView />;
};

export default ContestDetails;
