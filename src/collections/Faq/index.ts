import { CollectionConfig } from 'payload/types'
const Faq: CollectionConfig = {
  slug: 'faq',

  fields: [
    {
      name: 'faqs',
      type: 'array',
      fields: [
        {
          name: 'question',
          type: 'text',
        },
        {
          name: 'answer',
          type: 'text',
        },
      ],
    },
  ],
}

export default Faq
