import { Metadata } from 'next'

import FaqView from '@/views/FaqView'

export const metadata: Metadata = {
  title: 'Faq',
  description: 'This is a Faq page',
  openGraph: {
    title: 'Faqs',
    description: 'This is a faqs page',
    images: [`/images/icon/support/1.png`],
    type: 'website',
    locale: 'en_US',
    url: `${process.env.NEXT_PUBLIC_SERVER_URL}/faqs`,
  },
}

const Faq = () => {
  return <FaqView />
}

export default Faq
