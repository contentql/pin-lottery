import circle_border from '/public/images/elements/circle-border.png'
import Image from 'next/image'
import { FaTimes } from 'react-icons/fa'

import { Cart, Contest } from '@/payload-types'

const CartTicketCard = ({
  cart,
  ticketId,
  deleteById,
  updateCartTicketsCountMutation,
}: {
  cart: Cart
  ticketId: number
  deleteById: Function
  updateCartTicketsCountMutation: Function
}) => {
  const newTicketsCount = cart?.tickets - 1
  const newTotalPrice =
    newTicketsCount * (cart?.contest_id?.value as Contest)?.ticket_price

  const handleDeleteTicket = () => {
    if (newTicketsCount === 0) {
      deleteById({ id: cart?.id })
    } else {
      updateCartTicketsCountMutation({
        id: cart?.id,
        tickets: newTicketsCount,
        total_price: newTotalPrice,
      })
    }
  }

  return (
    <div className='cart-lottery-single'>
      <button
        className='cart-lottery-single__close'
        onClick={() => handleDeleteTicket()}>
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
            <ul className='cart-lottery-single__selected-number display-none-mobile'>
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
