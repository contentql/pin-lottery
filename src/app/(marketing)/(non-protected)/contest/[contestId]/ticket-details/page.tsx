import { Metadata } from 'next'

import TicketDetailsView from '@/views/TicketDetailsView'

interface PageProps {
  params: {
    contestId: string
  }
}

export const metadata: Metadata = {
  title: 'Ticket Details',
  description: 'This is a ticket details page',
}

const LotteryDetails = ({ params }: PageProps) => {
  return <TicketDetailsView contestId={params.contestId} />
}

export default LotteryDetails
