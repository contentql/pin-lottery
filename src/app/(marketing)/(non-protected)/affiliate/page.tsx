import { Metadata } from 'next'

import AffiliateView from '@/views/AffiliateView'

export const metadata: Metadata = {
  title: 'Affiliate',
  description: 'This is a about page',
}

const Affiliate = () => {
  return <AffiliateView />
}

export default Affiliate
