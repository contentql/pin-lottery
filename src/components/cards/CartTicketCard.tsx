import Image from 'next/image'
import { useContext } from 'react'
import { FaTimes } from 'react-icons/fa'

import { AppContext } from '@/context/context'
import { Cart, Contest } from '@/payload-types'

import circle_border from '/public/images/elements/circle-border.png'

const CartTicketCard = ({
  cart,
  ticketId,
}: {
  cart: Cart
  ticketId: number
}) => {
  const { decrementHandleAndRemoveTicket }: any = useContext(AppContext)

  return (
    <div className='cart-lottery-single'>
      <button
        className='cart-lottery-single__close'
        //   onClick={() => decrementHandleAndRemoveTicket(ticket?.id)}
      >
        <FaTimes />
      </button>

      <div className='cart-lottery-single__header'>
        <div className='silgle'>
          <div className='draw-single-ticket'>
            <div className='draw-single-ticket__header'>
              <div className='left'>Ticket #{ticketId}</div>
              <div className='right'>
                Contest No: {(cart?.contest_id?.value as Contest)?.contest_no}
              </div>
            </div>
            <div className='circle-divider'>
              <Image src={circle_border} alt='circle border' />
            </div>
            <ul className='lottery-single__selected-number'>
              {[...Array(7)].map((_, i) => (
                <li key={i} className=''>
                  00
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartTicketCard
