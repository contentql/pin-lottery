import { useState } from 'react'

import QuickPick from '@/components/quickPick/QuickPick'

import cartData from '@/data/cartData'

import AllTickets from './AllTickets'
import Prices from './Prices'

const TotallCart = () => {
  const [allTicket, setAllTicket] = useState(cartData)

  const removeTicket = (id: any) => {
    const data = allTicket.filter(item => item.id !== id)
    setAllTicket(data)
  }

  return (
    <section className='pb-120 mt-minus-300'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='cart-wrapper'>
              <h2 className='cart-wrapper__title'>My Cart</h2>
              <div className='row justify-content-lg-between'>
                {/* All tickets section here */}
                <AllTickets allTicket={allTicket} removeTicket={removeTicket} />

                {/* Prices section here */}
                <Prices />
              </div>
            </div>
          </div>

          {/* QuickPick section here */}
          <QuickPick />
        </div>
      </div>
    </section>
  )
}

export default TotallCart
