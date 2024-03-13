import { useContext } from 'react'

import SingleLotteryCard from '@/components/cards/SingleLotteryCard'
import { AppContext } from '@/context/context'

import Actions from './Actions'

const Lotteries = () => {
  const { addTickets, tickets }: any = useContext(AppContext)

  return (
    <div className='lottery-wrapper style--two'>
      {/* Actions Here */}
      <Actions />

      <div className='row mt-50 mb-none-30'>
        {tickets.map((ticket: any) => (
          <div key={ticket.id} className='col-lg-4 mb-30'>
            {/* Single lottery  */}
            <SingleLotteryCard ticket={ticket} totalTickets={tickets.length} />
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
