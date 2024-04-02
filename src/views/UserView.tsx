'use client'

import LeftSideMenu from '@/components/common/LeftSideMenu'
import RightSide from '@/components/user/RightSide'
import { Contest, Ticket } from '@/payload-types'
import { trpc } from '@/trpc/client'

const UserView = () => {
  const { data: ticketsData, isPending: isTicketsPending } =
    trpc.ticket.getTickets.useQuery()

  const upcomingDrawTicketsData = ticketsData?.filter(
    ticket => !(ticket?.contest_id?.value as Contest)?.contest_status,
  )

  const pastDrawsTicketsData = ticketsData?.filter(
    ticket => (ticket?.contest_id?.value as Contest)?.contest_status,
  )

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
              isTicketsPending={isTicketsPending}
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
