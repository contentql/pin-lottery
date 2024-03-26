import { CollectionConfig } from 'payload/types'
import { JWTUser } from '../../custom-payload-types'

const Faq: CollectionConfig = {
  slug: 'faq',
  admin: {
    hidden: ({ user }: { user: JWTUser }) => {
      const { roles } = user

      if (roles?.includes('manager')) return true

      return false
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
