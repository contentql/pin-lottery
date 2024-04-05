import { Metadata } from 'next'

import ContactView from '@/views/ContactView'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'This is a contact page',
  openGraph: {
    title: 'Contact',
    description: 'This is a contact page',
    images: [`/images/icon/contact/1.png`],
    type: 'website',
    locale: 'en_US',
    url: `${process.env.NEXT_PUBLIC_SERVER_URL}/contact`,
  },
}

const Contact = async () => {
  return <ContactView />
}

export default Contact
