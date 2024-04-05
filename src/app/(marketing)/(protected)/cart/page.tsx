import { Metadata } from 'next'

import CartView from '@/views/CartView'

export const metadata: Metadata = {
  title: 'Cart',
  description: 'this is cart page',
  openGraph: {
    title: 'Cart',
    description: 'This is a cart page',
    images: [`/images/icon/overview/2.png`],
    type: 'website',
    locale: 'en_US',
    url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
  },
}

const Cart = async () => {
  return <CartView />
}

export default Cart
