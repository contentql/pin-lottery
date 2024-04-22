import payment from '/public/images/elements/payment.png'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ImSpinner } from 'react-icons/im'
import { toast } from 'react-toastify'

import { Cart, Contest, Media, Ticket } from '@/payload-types'
import { useAuth } from '@/providers/Auth'
import { currentUser } from '@/queries/auth/currentUser'
import { trpc } from '@/trpc/client'
import { ticketsMetadata } from '@/utils/tickets-metadata'

import CartDepositAmount from './CartDepositAmount'

const Prices = ({ cartData }: { cartData: Cart[] }) => {
  const router = useRouter()

  const [isPurchasing, setIsPurchasing] = useState(false)

  const { isProfileCompleted, fetchMe } = useAuth()

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

  const TicketsPurchasedAmount = (data: Ticket[]) => {
    return data?.reduce(
      (total: number, item: Ticket) => total + item.ticket_price,
      0,
    )
  }
  const getPurchasedTicketsDetails = (data: Ticket[]) => {
    return data?.map(item => {
      return {
        title: (item?.contest_id?.value as Contest)?.title,
        ticketPrice: (item?.contest_id?.value as Contest)?.ticket_price,
        contestNumber: (item?.contest_id?.value as Contest).contest_no,
        ticketNumber: item.ticket_number,
        productImage: ((item?.contest_id?.value as Contest)?.img as Media)?.url,
      }
    })
  }

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

  const {
    mutate: ticketsPurchasedTransaction,
    isPending: isTransactionPending,
  } = trpc.transaction.addTicketsTransaction.useMutation({
    onSuccess: () => {
      toast.success(`Transaction completed successfully`)
    },
    onError: () => {
      toast.error(`Transaction failed`)
    },
  })

  const { mutate: createTicketsMutation, isPending: isTicketPurchased } =
    trpc.ticket.addTickets.useMutation({
      onSuccess: async data => {
        console.log('tickets data', data)
        const amount = await TicketsPurchasedAmount(data)
        const purchasedTicketsDetails = await getPurchasedTicketsDetails(data)
        ticketsPurchasedTransaction({
          amount: amount,
          paymentMethod: 'lottery wallet',
          paymentStatus: 'success',
          transactionBody: purchasedTicketsDetails!,
          transactionDate: data?.at(0)?.createdAt!,
        })
        await fetchMe()
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

    if (userData.amount < total_price_of_cart) {
      toast.error('Insufficient balance. Please add amount to continue.', {
        toastId: 'insufficient-balance',
        autoClose: 3000,
        pauseOnHover: false,
        // onClose: () => {
        //   if (toast.isActive('insufficient-balance')) return
        //   toast.info('Redirecting to user-transaction page...', {
        //     toastId: 'user-transaction-redirecting',
        //     autoClose: 2000,
        //     pauseOnHover: false,
        //     onClose: () => {
        //       if (toast.isActive('user-transaction-redirecting')) return
        //       router.push('/user-transaction')
        //     },
        //   })
        // },
      })
      return
    }

    if (!isProfileCompleted) {
      toast.warning(
        'Please complete your profile to proceed with your purchase.',
      )
      return
    }

    setIsPurchasing(true)
    createTicketsMutation(arrayOfTicketsWithPrices)
  }

  return (
    <div className='col-lg-4 mt-lg-0 mt-4'>
      <div className='checkout-wrapper'>
        <div
          className='checkout-wrapper__header mb-4'
          style={{ borderRadius: '15px' }}>
          <h3>
            Wallet amount: {ticketsMetadata.currency} {userData?.amount}
          </h3>
        </div>
        <div className='checkout-wrapper__header'>
          <h3>Your Tickets:</h3>
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
              // style={{
              //   color: `${userData?.amount < total_price_of_cart ? 'black' : ''}`,
              //   background: `${userData?.amount < total_price_of_cart ? 'linear-gradient(180.3deg, rgb(221, 221, 221) 5.5%, rgb(110, 136, 161) 90.2%)' : ''}`,
              // }}
              onClick={() => handlePurchase()}
              disabled={isPurchasing || isUserDataPending}>
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
            <CartDepositAmount />
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
