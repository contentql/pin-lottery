import Image from 'next/image'

import payment from '/public/images/elements/payment.png'

import { Cart } from '@/payload-types'
import { ticketsMetadata } from '@/utils/tickets-metadata'

const Prices = ({ cartData }: { cartData: Cart[] }) => {
  const currency = ticketsMetadata?.currency

  const total_price_of_cart = cartData?.reduce(
    (acc, cart) => acc + cart?.total_price,
    0,
  )

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
            <button type='submit' className='cmn-btn'>
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
