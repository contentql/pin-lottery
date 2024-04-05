import { Metadata } from 'next'

import CheckoutView from '@/views/CheckoutView'

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'this is a checkout page',
  openGraph: {
    title: 'Checkout',
    description: 'This is a checkout page',
    images: [`/images/icon/support/2.png`],
    type: 'website',
    locale: 'en_US',
    url: `${process.env.NEXT_PUBLIC_SERVER_URL}/checkout`,
  },
}

const Checkout = async () => {
  return <CheckoutView />
}

export default Checkout
