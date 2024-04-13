import payment from '/public/images/elements/payment.png'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ImSpinner } from 'react-icons/im'
import { toast } from 'react-toastify'

import { Cart, Contest } from '@/payload-types'
import { currentUser } from '@/queries/auth/currentUser'
import { trpc } from '@/trpc/client'
import { ticketsMetadata } from '@/utils/tickets-metadata'

const Prices = ({ cartData }: { cartData: Cart[] }) => {
  const router = useRouter()

  const [isPurchasing, setIsPurchasing] = useState(false)

  const currency = ticketsMetadata?.currency

  const total_price_of_cart = cartData?.reduce(
    (acc, cart) => acc + cart?.total_price,
    0,
  )

  const { data: userData, isPending: isUserDataPending } = useQuery({
    queryKey: ['/api/users/me', 'get'],
    queryFn: async () => currentUser(),
    select: data => data.user,
  })

  const arrayOfTicketsWithPrices = cartData?.flatMap(item =>
    Array.from({ length: item?.tickets }, () => ({
      ticket_price: (item?.contest_id?.value as Contest)?.ticket_price,
      contest_id: (item?.contest_id.value as Contest)?.id,
    })),
  )

  const { mutate: deleteAllTicketsOfUserFromCart } =
    trpc.cart.deleteAllTicketsOfUserFromCart.useMutation({
      onSuccess: async () => {
        router.push('/user')
      },
      onError: async () => {
        toast.error('Failed to empty cart.')
      },
      onSettled: async () => {
        setIsPurchasing(false)
      },
    })

  const { mutate: createTicketsMutation, isPending: isTicketPurchased } =
    trpc.ticket.addTickets.useMutation({
      onSuccess: async () => {
        deleteAllTicketsOfUserFromCart()
        toast.success(
          'Tickets successfully purchased. Draw date will be announced shortly.',
        )
      },
      onError: async () => {
        setIsPurchasing(false)
        toast.error('Failed to purchase tickets. Please try again later.')
      },
    })

  const handlePurchase = () => {
    if (!arrayOfTicketsWithPrices.length) {
      toast.warning('Please add tickets to proceed.')
      return
    }
    if (
      !!arrayOfTicketsWithPrices.length &&
      (!userData?.amount || userData.amount < total_price_of_cart)
    ) {
      toast.error('Insufficient balance. Please add amount to continue.')
      return
    }
    setIsPurchasing(true)
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
                  <h4 className='caption'>
                    Ticket Price - {ticketsMetadata.currency}
                    {(cart?.contest_id?.value as Contest)?.ticket_price}
                  </h4>
                  <span>
                    ({cart?.tickets} tickets X {currency}
                    {(cart?.contest_id?.value as Contest)?.ticket_price})
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
              onClick={() => handlePurchase()}
              disabled={isPurchasing}
            >
              {isPurchasing ? (
                <ImSpinner
                  size={22}
                  style={{
                    animation: 'rotateAnimation 2s linear infinite',
                  }}
                />
              ) : (
                'Buy Tickets'
              )}
            </button>
          </div>
        </div>
        <div className='mt-30'>
          <Image src={payment} alt='payment' />
        </div>
      </div>
    </div>
  )
}

export default Prices
