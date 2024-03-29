import { useContext } from 'react'

import SingleTicketCard from '@/components/cards/SingleTicketCard'
import { AppContext, ContextTicket } from '@/context/context'

import { Contest } from '@/payload-types'
import Actions from './Actions'

const Tickets = ({ contestDetails }: { contestDetails: Contest }) => {
  const { getTickets, addTicket } = useContext(AppContext)

  const contestTickets = getTickets({
    contest_no: contestDetails?.contest_no,
  })

  return (
    <div className='lottery-wrapper style--two'>
      {/* Actions Here */}
      <Actions contestDetails={contestDetails} />

      <div className='row mt-50 mb-none-30'>
        {contestTickets.map((ticket: ContextTicket) => (
          <div key={ticket.id} className='col-lg-4 mb-30'>
            {/* Single lottery  */}
            <SingleTicketCard ticket={ticket} />
          </div>
        ))}
      </div>

      <div className='lottery-wrapper__btn'>
        <button
          type='button'
          className='btn-border text-white bg-transparent'
          onClick={() =>
            addTicket({
              contest_no: contestDetails?.contest_no,
            })
          }>
          Add Tickets
        </button>
      </div>
    </div>
  )
}

export default Tickets
