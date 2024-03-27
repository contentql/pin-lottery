'use client'

import { trpc } from '@/trpc/client'
import Link from 'next/link'
import React from 'react'

const Cart = () => {
  const { data: cartData } = trpc.cart.getCartTickets.useQuery()

  return (
    <div className='product__cart'>
      <Link href='/cart' className='amount__btn'>
        <i className='las la-shopping-basket'></i>
        {cartData?.length !== 0 ? (
          <span className='cart__num'>{cartData?.length}</span>
        ) : (
          ''
        )}
      </Link>
    </div>
  )
}

export default Cart
