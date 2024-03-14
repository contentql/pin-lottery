import { useContext } from 'react'
import { FaCartPlus } from 'react-icons/fa'
import { MdOutlineShoppingCartCheckout } from 'react-icons/md'

import { AppContext } from '@/context/context'
import { Contest } from '@/payload-types'

const BuyTicketCard = ({ contestDetails }: { contestDetails: Contest }) => {
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
        {/* <a href='/checkout' className='cmn-btn'>
          buy tickets
        </a> */}
        <div className='btn-grp justify-content-xl-end'>
          <button
            type='button'
            className='btn-border text-capitalize btn-transparent'>
            <FaCartPlus />
            Add to cart
          </button>
          <button type='button' className='cmn-btn text-capitalize'>
            <MdOutlineShoppingCartCheckout />
            Go to cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default BuyTicketCard
