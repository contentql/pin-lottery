import CartTicketCard from '@/components/cards/CartTicketCard'
import { Cart, Contest } from '@/payload-types'

interface GroupedTickets {
  [contest_no: string]: Cart[]
}

const AllTickets = ({
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
    <div className='col-lg-7'>
      <div className='ticket-wrapper'>
        <div className='ticket-wrapper__header'>
          <h3>Your tickets:</h3>
          <button
            type='button'
            onClick={() => deleteAllTicketsOfUserFromCart()}>
            clear all
          </button>
        </div>
        {cartData?.map(cart => (
          <div key={cart?.id} className='ticket-wrapper__body'>
            <div
              className={`tickets ${cart?.tickets === 1 ? 'tickets-one' : cart?.tickets === 2 ? 'tickets-two' : 'tickets-three'}`}>
              <div className='single-row'>
                <h3>
                  Contest Number:{' '}
                  {(cart?.contest_id?.value as Contest)?.contest_no}
                </h3>
                <button
                  type='button'
                  onClick={() => deleteById({ id: cart?.id })}>
                  clear
                </button>
              </div>

              <div className='ticket-wrapper__body'>
                {cart?.tickets && cart.tickets > 2 && (
                  <div className='cart-lottery-single position1'>
                    {[...Array(cart?.tickets)].map((_, idx) => {
                      return (
                        <CartTicketCard
                          key={idx}
                          cart={cart}
                          ticketId={idx + 1}
                          deleteById={deleteById}
                          updateCartTicketsCountMutation={
                            updateCartTicketsCountMutation
                          }
                        />
                      )
                    })}
                    <div className='whole-position'>
                      <div className='cart-lottery-single1__header card1-position'>
                        <div className='silgle'>
                          <div className='draw-single-ticket'>
                            <div className='draw-single-ticket__header'>
                              <div className='left'>Ticket #{}</div>
                              <div className='right'>
                                Contest No:{' '}
                                {
                                  (cart?.contest_id?.value as Contest)
                                    ?.contest_no
                                }
                              </div>
                            </div>
                            <div className='circle-divider'>
                              {/* <Image src={circle_border} alt='circle border' /> */}
                            </div>
                            <ul className='cart-lottery-single__selected-number'>
                              {[...Array(7)].map((_, i) => (
                                <li key={i} className=''>
                                  00
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className='cart-lottery-single1__header card-position'>
                        <div className='silgle'>
                          <div className='draw-single-ticket'>
                            <div className='draw-single-ticket__header'>
                              <div className='left'>Ticket #{}</div>
                              <div className='right'>
                                Contest No:{' '}
                                {
                                  (cart?.contest_id?.value as Contest)
                                    ?.contest_no
                                }
                              </div>
                            </div>
                            <div className='circle-divider'>
                              {/* <Image src={circle_border} alt='circle border' /> */}
                            </div>
                            <ul className='cart-lottery-single__selected-number'>
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
                  </div>
                )}
                {cart?.tickets && cart.tickets === 2 && (
                  <div className='cart-lottery-single'>
                    {[...Array(cart?.tickets)].map((_, idx) => {
                      return (
                        <CartTicketCard
                          key={idx}
                          cart={cart}
                          ticketId={idx + 1}
                          deleteById={deleteById}
                          updateCartTicketsCountMutation={
                            updateCartTicketsCountMutation
                          }
                        />
                      )
                    })}
                    <div className='cart-lottery-single1__header card1-position whole-position'>
                      <div className='silgle'>
                        <div className='draw-single-ticket'>
                          <div className='draw-single-ticket__header'>
                            <div className='left'>Ticket #{}</div>
                            <div className='right'>
                              Contest No:{' '}
                              {(cart?.contest_id?.value as Contest)?.contest_no}
                            </div>
                          </div>
                          <div className='circle-divider'>
                            {/* <Image src={circle_border} alt='circle border' /> */}
                          </div>
                          <ul className='cart-lottery-single__selected-number'>
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
                )}
                {cart?.tickets && cart.tickets === 1 && (
                  <div className='cart-lottery-single'>
                    {[...Array(cart?.tickets)].map((_, idx) => {
                      return (
                        <CartTicketCard
                          key={idx}
                          cart={cart}
                          ticketId={idx + 1}
                          deleteById={deleteById}
                          updateCartTicketsCountMutation={
                            updateCartTicketsCountMutation
                          }
                        />
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllTickets
