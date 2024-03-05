import { Metadata } from 'next'

import ContactView from '@/views/ContactView'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'This is a contact page',
}

const Contact = async () => {
  return <ContactView />
}

export default Contact
