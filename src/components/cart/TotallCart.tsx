import { Cart } from '@/payload-types'

import AllTickets from './AllTickets'
import Prices from './Prices'

const TotallCart = ({
  cartData,
  updateCartTicketsCountMutation,
  deleteAllTicketsOfUserFromCart,
}: {
  cartData: Cart[]
  updateCartTicketsCountMutation: Function
  deleteAllTicketsOfUserFromCart: Function
}) => {
  return (
    <section className='pb-120 mt-minus-300'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='cart-wrapper'>
              <h2 className='cart-wrapper__title'>My Cart</h2>
              <div className='row justify-content-lg-between'>
                {/* All tickets section here */}
                <AllTickets
                  cartData={cartData}
                  updateCartTicketsCountMutation={
                    updateCartTicketsCountMutation
                  }
                  deleteAllTicketsOfUserFromCart={
                    deleteAllTicketsOfUserFromCart
                  }
                />

                {/* Prices section here */}
                <Prices cartData={cartData} />
              </div>
            </div>
          </div>

          {/* QuickPick section here */}
          {/* <QuickPick /> */}
        </div>
      </div>
    </section>
  )
}

export default TotallCart
