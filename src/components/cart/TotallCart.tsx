import Image from 'next/image'
import Link from 'next/link'
import { FaAngleLeft } from 'react-icons/fa'

import { Cart } from '@/payload-types'

import AllTickets from './AllTickets'
import Prices from './Prices'

const TotallCart = ({
  cartData,
  updateCartTicketsCountMutation,
  deleteById,
  deleteAllTicketsOfUserFromCart,
}: {
  cartData: Cart[]
  updateCartTicketsCountMutation: Function
  deleteById: Function
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
                {cartData?.length <= 0 ? (
                  <div className='wishlist-button-center'>
                    <div className='cart-empty-image'>
                      <Image
                        src='/images/empty-states/empty-cart.png'
                        alt='empty wishlist'
                        width={500}
                        height={500}
                      />
                    </div>
                    <Link className='cmn-btn text-capitalize ' href='/contest'>
                      <span>
                        <FaAngleLeft
                          size={18}
                          color='white'
                          style={{ marginRight: '20px' }}
                        />
                      </span>
                      go to Contests
                    </Link>
                  </div>
                ) : (
                  <>
                    <AllTickets
                      cartData={cartData}
                      updateCartTicketsCountMutation={
                        updateCartTicketsCountMutation
                      }
                      deleteById={deleteById}
                      deleteAllTicketsOfUserFromCart={
                        deleteAllTicketsOfUserFromCart
                      }
                    />
                    {/* Prices section here */}
                    <Prices cartData={cartData} />
                  </>
                )}
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
