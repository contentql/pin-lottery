import { CollectionConfig } from 'payload/types'

import { ContactEmailToAdmin } from './hooks/contactEmailToAdmin'
import { ContactEmailToUser } from './hooks/contactEmailToUser'

const Contact: CollectionConfig = {
  slug: 'contact',
  admin: {
    useAsTitle: 'name',
  },
  hooks: {
    afterChange: [ContactEmailToUser, ContactEmailToAdmin],
  },
  fields: [
    { name: 'name', type: 'text', label: 'Name', required: true },
    { name: 'email', type: 'email', label: 'Email', required: true },
    { name: 'subject', type: 'text', label: 'Subject', required: true },
    { name: 'message', type: 'textarea', label: 'Message', required: true },
  ],
}

export default Contact
