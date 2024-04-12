'use client'

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
      {/* Right side  */}
      <RightSide
        isTicketsPending={isTicketsPending}
        upcomingDrawTicketsData={upcomingDrawTicketsData as Ticket[]}
        pastDrawsTicketsData={pastDrawsTicketsData as Ticket[]}
      />
    </>
  )
}

export default UserView
