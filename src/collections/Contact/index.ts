import { CollectionConfig } from 'payload/types'
import { JWTUser } from '../../custom-payload-types'
import { newContactEmail } from './hooks/newContactEmail'

const Contact: CollectionConfig = {
  slug: 'contact',
  admin: {
    useAsTitle: 'name',
    hidden: ({ user }: { user: JWTUser }) => {
      const { roles } = user

      if (roles?.includes('editor')) return true

      return false
    },
  },
  hooks: {
    afterChange: [newContactEmail],
  },
  fields: [
    { name: 'name', type: 'text', label: 'Name', required: true },
    { name: 'email', type: 'email', label: 'Email', required: true },
    { name: 'subject', type: 'text', label: 'Subject', required: true },
    { name: 'message', type: 'textarea', label: 'Message', required: true },
  ],
}

export default Contact
