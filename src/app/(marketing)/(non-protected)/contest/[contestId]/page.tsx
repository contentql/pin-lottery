import { Metadata } from 'next'

import ContestDetailsView from '@/views/ContestDetailsView'

export const metadata: Metadata = {
  title: 'Contest Details',
  description: 'This is a contest details page',
}

interface PageProps {
  params: {
    contestId: string
  }
}

const ContestDetails = ({ params }: PageProps) => {
  return <ContestDetailsView params={params} />
}

export default ContestDetails
