import { Ticket } from '@/payload-types'
import PastDraws from './PastDraws'
import UpcomingDraw from './UpcomingDraw'

const RightSide = ({ ticketsData }: { ticketsData: Ticket[] }) => {
  return (
    <div className='col-lg-8 mt-lg-0 mt-4'>
      {/* Upcoming Draw */}
      <UpcomingDraw ticketsData={ticketsData} />

      {/* Past Draws */}
      <PastDraws ticketsData={ticketsData} />
    </div>
  )
}

export default RightSide
