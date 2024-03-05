import { Metadata } from 'next'

import CheckoutView from '@/views/CheckoutView'

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'this is a checkout page',
}

const Checkout = async () => {
  return <CheckoutView />
}

export default Checkout
