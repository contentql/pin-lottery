import BuyTicketCard from '@/components/cards/BuyTicketCard'
import QuickPick from '@/components/quickPick/QuickPick'
import { Contest } from '@/payload-types'

import Tickets from './Tickets'

const TicketBody = ({ contestDetails }: { contestDetails: Contest }) => {
  return (
    <section className='pb-120 mt-minus-50'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            {/* ALl Lotteries */}
            <Tickets contestDetails={contestDetails} />
          </div>

          <div className='col-lg-12 mt-50'>
            {/* Buy lottery tickets */}
            <BuyTicketCard contestDetails={contestDetails} />
          </div>

          {/* Quick pick */}
          <QuickPick contestDetails={contestDetails} />
        </div>
      </div>
    </section>
  )
}

export default TicketBody
