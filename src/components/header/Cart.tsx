'use client'

import Link from 'next/link'
import { IoCartOutline } from 'react-icons/io5'

import { trpc } from '@/trpc/client'

const Cart = () => {
  const { data: cartData, isPending } = trpc.cart.getCartTickets.useQuery()

  return (
    <div className='cart-icon ml-20'>
      <Link href='/cart'>
        <IoCartOutline
          color='white'
          size={28}
          style={{ marginBottom: '-12px' }}
        />
      </Link>
      {cartData?.length !== 0
        ? !isPending && <span className='cart-number'>{cartData?.length}</span>
        : ''}
    </div>
  )
}

export default Cart
