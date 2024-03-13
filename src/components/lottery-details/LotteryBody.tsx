import BuyLotteryTicketCard from '@/components/cards/BuyLotteryTicketCard'
import QuickPick from '@/components/quickPick/QuickPick'

import { Contest } from '@/payload-types'
import Lotteries from './Lotteries'

const LotteryBody = ({ contestDetails }: { contestDetails: Contest }) => {
  return (
    <section className='pb-120 mt-minus-50'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            {/* ALl Lotteries */}
            <Lotteries contestDetails={contestDetails} />
          </div>

          <div className='col-lg-12 mt-50'>
            {/* Buy lottery tickets */}
            <BuyLotteryTicketCard />
          </div>

          {/* Quick pick */}
          <QuickPick />
        </div>
      </div>
    </section>
  )
}

export default LotteryBody
