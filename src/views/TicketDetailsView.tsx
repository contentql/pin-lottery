'use client'

import Banner from '@/components/common/Banner'
import TicketBody from '@/components/ticket-details/TicketBody'
import { Contest } from '@/payload-types'
import { trpc } from '@/trpc/client'
import useMaintainMinimumTickets from '@/utils/useMaintainMinimumTickets'

interface Props {
  contestId: string
}

const TicketDetailsView = ({ contestId }: Props) => {
  const { data: contestDetails } = trpc.contest.getContestById.useQuery({
    id: contestId,
  })

  useMaintainMinimumTickets(contestDetails?.contest_no)

  return (
    <>
      {/* Banaer section Here */}
      <div className='inner-hero-section style--two'>
        <Banner
          breadcrumb={[
            ['Home', '/'],
            ['Contest', '/contest'],
            [
              `Contest No: ${contestDetails?.contest_no}`,
              `/contest/${contestDetails?.id}`,
            ],
            [
              'Pick your Tickets',
              `/contest/${contestDetails?.id}/ticket-details`,
            ],
          ]}
        />
      </div>

      {/* Lottery body here */}
      <TicketBody contestDetails={contestDetails as Contest} />
    </>
  )
}

export default TicketDetailsView
