import { Ticket } from '@/payload-types'
import PastDraws from './PastDraws'
import UpcomingDraw from './UpcomingDraw'

const RightSide = ({
  upcomingDrawTicketsData,
  pastDrawsTicketsData,
}: {
  upcomingDrawTicketsData: Ticket[]
  pastDrawsTicketsData: Ticket[]
}) => {
  return (
    <div className='col-lg-8 mt-lg-0 mt-4'>
      {/* Upcoming Draw */}
      <UpcomingDraw upcomingDrawTicketsData={upcomingDrawTicketsData} />

      {/* Past Draws */}
      <PastDraws pastDrawsTicketsData={pastDrawsTicketsData} />
    </div>
  )
}

export default RightSide
