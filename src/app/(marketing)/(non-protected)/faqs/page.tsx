import { Metadata } from 'next'

import FaqView from '@/views/FaqView'

export const metadata: Metadata = {
  title: 'Faq',
  description: 'This is a Faq page',
}

const Faq = () => {
  return <FaqView />
}

export default Faq
