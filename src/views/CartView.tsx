'use client'

import Image from 'next/image'

import inner_hero_shape from '/public/images/elements/inner-hero-shape.png'

import TotallCart from '@/components/cart/TotallCart'
import { Cart } from '@/payload-types'
import { trpc } from '@/trpc/client'

const CartView = () => {
  const { data: cartData } = trpc.cart.getCartTickets.useQuery()

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
      <TotallCart cartData={cartData as Cart[]} />
    </>
  )
}

export default CartView
