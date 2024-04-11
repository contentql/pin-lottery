import { GlobalConfig } from 'payload/types'

const Faq: GlobalConfig = {
  slug: 'faq',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'faqs',
      type: 'array',
      fields: [
        {
          name: 'faq_type',
          type: 'text',
          label: 'Faq Type',
        },
        {
          name: 'faq',
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
    },
  ],
}

export default Faq
