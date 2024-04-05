import { Ticket } from '@/payload-types'
import TicketTabs from '../common/TicketTabs'
import PastDraws from './PastDraws'
import UpcomingDraws from './UpcomingDraw'
const RightSide = ({
  isTicketsPending,
  upcomingDrawTicketsData,
  pastDrawsTicketsData,
}: {
  isTicketsPending: boolean
  upcomingDrawTicketsData: Ticket[]
  pastDrawsTicketsData: Ticket[]
}) => {
  const tabs = [
    {
      title: 'Past draws',
      content: <PastDraws pastDrawsTicketsData={pastDrawsTicketsData} />,
    },
    {
      title: 'Upcoming draws',
      content: (
        <UpcomingDraws upcomingDrawTicketsData={upcomingDrawTicketsData} />
      ),
    },
  ]
  return (
    <div className='col-lg-8 mt-lg-0 mt-4'>
      <TicketTabs tabs={tabs} isTicketsPending={isTicketsPending} />
    </div>
  )
}

export default RightSide
