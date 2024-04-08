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

const LotteryDetails = async ({ params: { contestId } }: PageProps) => {
  return <TicketDetailsView contestId={contestId} />
}

export default LotteryDetails
