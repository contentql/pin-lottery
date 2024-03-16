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
          required:true
        },
        {
          name: 'answer',
          type: 'text',
          required:true
        },
      ],
    },
  ],
}

export default Faq
