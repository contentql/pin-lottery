import PastDraws from './PastDraws'
import UpcomingDraw from './UpcomingDraw'

const RightSide = () => {
  return (
    <div className='col-lg-8 mt-lg-0 mt-4'>
      {/* Upcoming Draw */}
      <UpcomingDraw />

      {/* Past Draws */}
      <PastDraws />
    </div>
  )
}

export default RightSide
