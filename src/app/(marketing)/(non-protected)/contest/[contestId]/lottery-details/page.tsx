import { Metadata } from 'next'

import LotteryDetailsView from '@/views/LotteryDetailsView'

export const metadata: Metadata = {
  title: 'Lottery Details',
  description: 'This is a lottery details page',
}

const LotteryDetails = () => {
  return <LotteryDetailsView />
}

export default LotteryDetails
