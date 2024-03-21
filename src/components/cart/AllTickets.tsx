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
            <div className='tickets'>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllTickets
