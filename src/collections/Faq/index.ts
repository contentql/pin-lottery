import { CollectionConfig } from 'payload/types'
import { JWTUser } from '../../custom-payload-types'

const Faq: CollectionConfig = {
  slug: 'faq',
  admin: {
    hidden: ({ user }: { user: JWTUser }) => {
      if (user) {
        const { roles } = user

        if (roles?.includes('editor')) return false
        if (roles?.includes('admin')) return false
        if (roles?.includes('manager')) return true
      }

      return true
    },
  },
  fields: [
    {
      name: 'faqs',
      type: 'array',
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}

export default Faq
