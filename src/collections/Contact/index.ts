import { CollectionConfig } from 'payload/types'
import { newContactEmail } from './hooks/newContactEmail'
const Contact: CollectionConfig = {
  slug: 'contact',
  admin: {
    useAsTitle: 'name',
  },
  hooks: {
    afterChange: [newContactEmail],
  },
  fields: [
    { name: 'name', type: 'text', label: 'Name' },
    { name: 'email', type: 'email', label: 'Email' },
    { name: 'subject', type: 'text', label: 'Subject' },
    { name: 'message', type: 'textarea', label: 'Message' },
  ],
}

export default Contact
