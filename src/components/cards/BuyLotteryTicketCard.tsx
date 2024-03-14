import { Contest } from '@/payload-types'
import { useContext } from 'react'

import { AppContext } from '@/context/context'

const BuyLotteryTicketCard = ({
  contestDetails,
}: {
  contestDetails: Contest
}) => {
  const { tickets }: any = useContext(AppContext)

  const ticketPrice = contestDetails?.ticket_price
  const totalTickets = tickets?.length

  const totalTicketsPrice = totalTickets * ticketPrice

  return (
    <div className='buy-lottery-ticket'>
      <div className='left'>
        {/* <div className='sub-total-price'>
          <p>
            Ticket Price ({totalTickets} tickets X ${ticketPrice})
          </p>
          <span>${totalTicketsPrice}</span>
        </div> */}
        <div className='total-price'>
          <p>
            Ticket Price ({totalTickets} tickets X ${ticketPrice})
          </p>
          <span>${totalTicketsPrice}</span>
        </div>
      </div>
      <div className='right'>
        <a href='#0' className='cmn-btn'>
          buy tickets
        </a>
      </div>
    </div>
  )
}

export default BuyLotteryTicketCard
