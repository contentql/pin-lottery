import Image from 'next/image'

import payment from '/public/images/elements/payment.png'

import { Cart } from '@/payload-types'
import { trpc } from '@/trpc/client'
import { ticketsMetadata } from '@/utils/tickets-metadata'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const Prices = ({ cartData }: { cartData: Cart[] }) => {
  const router = useRouter()

  const currency = ticketsMetadata?.currency

  const total_price_of_cart = cartData?.reduce(
    (acc, cart) => acc + cart?.total_price,
    0,
  )

  const arrayOfTicketsWithPrices = cartData?.flatMap(item =>
    Array.from({ length: item.tickets }, () => ({
      ticket_price: item.each_ticket_price,
      contest_id: item.contest_id,
    })),
  )

  const { mutate: deleteCartTickets } = trpc.cart.deleteTickets.useMutation({
    onSuccess: async () => {
      router.push('/user')
    },
    onError: async () => {
      toast.error('Failed to empty cart.')
    },
  })

  const { mutate: createTicketsMutation } = trpc.ticket.addTickets.useMutation({
    onSuccess: async () => {
      deleteCartTickets()
      toast.success(
        'Tickets successfully purchased. Draw date will be announced shortly.',
      )
    },
    onError: async () => {
      toast.error('Failed to purchase tickets. Please try again later.')
    },
  })

  const handlePurchase = () => {
    createTicketsMutation(arrayOfTicketsWithPrices)
  }

  return (
    <div className='col-lg-4 mt-lg-0 mt-4'>
      <div className='checkout-wrapper'>
        <div className='checkout-wrapper__header'>
          <h3>Your tickets:</h3>
        </div>
        <div className='checkout-wrapper__body'>
          <ul className='price'>
            {cartData?.map(cart => (
              <li key={cart?.id}>
                <div className='left'>
                  <h4 className='caption'>Ticket Price - {cart?.contest_no}</h4>
                  <span>
                    ({cart?.tickets} tickets X {currency}
                    {cart?.each_ticket_price})
                  </span>
                </div>
                <div className='right'>
                  <span className='price'>
                    {currency}
                    {cart?.total_price}
                  </span>
                </div>
              </li>
            ))}
            <li>
              <div className='left'>
                <h4 className='caption'>Total</h4>
              </div>
              <div className='right'>
                <span className='price'>
                  {currency}
                  {total_price_of_cart}
                </span>
              </div>
            </li>
          </ul>
          <div className='checkout-wrapper__btn'>
            <button
              type='button'
              className='cmn-btn'
              onClick={() => handlePurchase()}>
              buy tickets
            </button>
          </div>
        </div>
      </div>
      <div className='mt-30'>
        <Image src={payment} alt='payment' />
      </div>
    </div>
  )
}

export default Prices
