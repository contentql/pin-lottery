'use client'

import LeftSideMenu from '@/components/common/LeftSideMenu'
import RightSide from '@/components/user/RightSide'
import { Ticket } from '@/payload-types'
import { trpc } from '@/trpc/client'

const UserView = () => {
  const { data: upcomingDrawTicketsData } =
    trpc.ticket.getUpcomingDrawsTickets.useQuery({
      page: 1,
    })

  const { data: pastDrawsTicketsData } =
    trpc.ticket.getPastDrawsTickets.useQuery({
      page: 1,
    })

  return (
    <>
      <div className='inner-hero-section style--five'></div>

      <div className='mt-minus-150 pb-120'>
        <div className='container'>
          <div className='row'>
            {/* left side menu */}
            <LeftSideMenu />

            {/* Right side  */}
            <RightSide
              upcomingDrawTicketsData={upcomingDrawTicketsData as Ticket[]}
              pastDrawsTicketsData={pastDrawsTicketsData as Ticket[]}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default UserView
