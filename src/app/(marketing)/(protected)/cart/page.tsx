import { Metadata } from 'next'

import CartView from '@/views/CartView'

export const metadata: Metadata = {
  title: 'Cart',
  description: 'this is cart page',
}

const Cart = async () => {
  return <CartView />
}

export default Cart
