import { Metadata } from 'next'

import AffiliateView from '@/views/AffiliateView'

export const metadata: Metadata = {
  title: 'Affiliate',
  description: 'This is a about page',
  openGraph: {
    title: 'Affiliate',
    description: 'This is a affiliate page',
    images: [`/images/icon/affiliate/3.png`],
    type: 'website',
    locale: 'en_US',
    url: `${process.env.NEXT_PUBLIC_SERVER_URL}/affiliate`,
  },
}

const Affiliate = () => {
  return <AffiliateView />
}

export default Affiliate
