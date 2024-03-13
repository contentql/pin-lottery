import { useContext } from 'react'

import SingleLotteryCard from '@/components/cards/SingleLotteryCard'
import { AppContext } from '@/context/context'

import Actions from './Actions'

const Lotteries = () => {
  const { addTickets, lotteris }: any = useContext(AppContext)

  return (
    <div className='lottery-wrapper style--two'>
      {/* Actions Here */}
      <Actions />

      <div className='row mt-50 mb-none-30'>
        {lotteris.map((itm: any, i: any) => (
          <div key={itm.id} className='col-lg-6 mb-30'>
            {/* single lottey here */}
            <SingleLotteryCard itm={itm} i={i} />
          </div>
        ))}
      </div>
      <div className='lottery-wrapper__btn'>
        <button
          type='button'
          className='btn-border text-white bg-transparent'
          onClick={addTickets}>
          Add Tickets
        </button>
      </div>
    </div>
  )
}

export default Lotteries
