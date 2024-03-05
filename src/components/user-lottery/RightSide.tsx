import ContestCard from '@/components/cards/ContestCard'
import contestData from '@/data/contestData'

import UpcomingDraw from './UpcomingDraw'

const RightSide = () => {
  return (
    <div className='col-lg-8 mt-lg-0 mt-4'>
      {/* Upcoming Draw  */}
      <UpcomingDraw />

      <div className='row mt-30  mb-none-30'>
        {contestData.slice(0, 4).map(itm => (
          <div key={itm.id} className='col-xl-6 col-lg-12 col-md-6 mb-30'>
            {/* Contest card */}
            <ContestCard itm={itm} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default RightSide
