import { Metadata } from 'next'

import LotteryDetailsView from '@/views/LotteryDetailsView'

interface PageProps {
  params: {
    contestId: string
  }
}

export const metadata: Metadata = {
  title: 'Lottery Details',
  description: 'This is a lottery details page',
}

const LotteryDetails = ({ params }: PageProps) => {
  return <LotteryDetailsView contestId={params.contestId} />
}

export default LotteryDetails
