'use client'

import Image from 'next/image'

import inner_hero_shape from '/public/images/elements/inner-hero-shape.png'

import TotallCart from '@/components/cart/TotallCart'
import { Cart } from '@/payload-types'
import { trpc } from '@/trpc/client'
import { toast } from 'react-toastify'

const CartView = () => {
  const { data: cartData, refetch: cartDataRefetch } =
    trpc.cart.getCartTickets.useQuery()

  const { mutate: updateCartTicketsCountMutation } =
    trpc.cart.updateTicketsOfUserFromCart.useMutation({
      onSuccess: async () => {
        cartDataRefetch()
        toast.success('Deleted successfully.')
      },
      onError: async () => {
        toast.error('Unable to delete. Please try again.')
      },
    })

  const { mutate: deleteAllTicketsOfUserFromCart } =
    trpc.cart.deleteAllTicketsOfUserFromCart.useMutation({
      onSuccess: async () => {
        cartDataRefetch()
        toast.success('Successfully cart cleared.')
      },
      onError: async () => {
        toast.error('Failed to empty cart.')
      },
    })

  return (
    <>
      {/* Banner Section here */}
      <div className='inner-hero-section'>
        <div className='bg-shape'>
          <Image src={inner_hero_shape} alt='inner_hero_shape' />
        </div>
        {/* <Banner
          breadcrumb={[
            ['Home', '/'],
            ['Lottery', '/'],
            ['Contest No: B2T', '/'],
            ['Pick your Lottery Number', '/'],
            ['My Cart', '/'],
          ]}
        /> */}
      </div>

      {/* Total Cart Section here */}
      <TotallCart
        cartData={cartData as Cart[]}
        updateCartTicketsCountMutation={updateCartTicketsCountMutation}
        deleteAllTicketsOfUserFromCart={deleteAllTicketsOfUserFromCart}
      />
    </>
  )
}

export default CartView
