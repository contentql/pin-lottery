import TicketDetailsView from '@/views/TicketDetailsView'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
interface PageProps {
  contestId: string
  params: {
    contestId: string
  }
}

export const metadata: Metadata = {
  title: 'Ticket Details',
  description: 'This is a ticket details page',
}

export async function getServerProps(contestID: string): Promise<any> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/contest/${contestID}`,
  )
  const contest = await res.json()
  if (contest.contest_status) {
    redirect(`/contest/${contestID}`)
  }
  return contest
}

const LotteryDetails = async ({ params }: { params: PageProps }) => {
  const contest = await getServerProps(params.contestId)

  return (
    <>
      <TicketDetailsView contestId={params.contestId} />
    </>
  )
}

export default LotteryDetails
