import { Metadata } from 'next';

import ContestDetailsView from '@/views/ContestDetailsView';

export const metadata: Metadata = {
  title: 'Contest Details',
  description: 'This is a contest details page',
};

interface PageProps {
  params: {
    [key: string]: string | string[] | undefined;
  };
}

const ContestDetails = ({ params }: PageProps) => {
  return <ContestDetailsView params={params} />;
};

export default ContestDetails;
