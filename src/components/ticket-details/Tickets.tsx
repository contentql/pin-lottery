import { useContext } from 'react'

import SingleTicketCard from '@/components/cards/SingleTicketCard'
import { AppContext } from '@/context/context'

import { Contest } from '@/payload-types'
import Actions from './Actions'

const Tickets = ({ contestDetails }: { contestDetails: Contest }) => {
  const { incrementHandleAndAddTicket, tickets }: any = useContext(AppContext)

  return (
    <div className='lottery-wrapper style--two'>
      {/* Actions Here */}
      <Actions contestDetails={contestDetails} />

      <div className='row mt-50 mb-none-30'>
        {tickets.map((ticket: any) => (
          <div key={ticket.id} className='col-lg-4 mb-30'>
            {/* Single lottery  */}
            <SingleTicketCard ticket={ticket} contestDetails={contestDetails} />
          </div>
        ))}
      </div>

      <div className='lottery-wrapper__btn'>
        <button
          type='button'
          className='btn-border text-white bg-transparent'
          onClick={incrementHandleAndAddTicket}>
          Add Tickets
        </button>
      </div>
    </div>
  )
}

export default Tickets
