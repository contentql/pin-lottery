import CartTicketCard from '@/components/cards/CartTicketCard'
import { Cart, Contest } from '@/payload-types'

interface GroupedTickets {
  [contest_no: string]: Cart[]
}

const AllTickets = ({ cartData }: { cartData: Cart[] }) => {
  // const groupedCartData: GroupedTickets = cartData?.reduce(
  //   (acc: GroupedTickets, ticket) => {
  //     const { contest_no } = ticket
  //     if (!acc[contest_no]) {
  //       acc[contest_no] = []
  //     }
  //     acc[contest_no].push(ticket)
  //     return acc
  //   },
  //   {},
  // )

  return (
    <div className='col-lg-7'>
      <div className='ticket-wrapper'>
        <div className='ticket-wrapper__header'>
          <h3>Your tickets:</h3>
          <button type='button'>clear all</button>
        </div>
        {cartData?.map(cart => (
          <div key={cart?.id} className='ticket-wrapper__body'>
            <div className='tickets'>
              <div className='single-row'>
                <h4>
                  Contest Number:{' '}
                  {(cart?.contest_id?.value as Contest)?.contest_no}
                </h4>
              </div>
              <div className='ticket-wrapper__body'>
                {[...Array(cart?.tickets)].map((cart, idx) => {
                  return (
                    <CartTicketCard key={idx} cart={cart} ticketId={idx + 1} />
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
