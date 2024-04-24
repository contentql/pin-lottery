import { GlobalConfig } from 'payload/types'

const Testimonial: GlobalConfig = {
  slug: 'testimonial',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      required: true,
    },
    {
      name: 'reviews',
      type: 'array',
      fields: [
        {
          name: 'user',
          label: 'User',
          type: 'relationship',
          relationTo: 'users',
          hasMany: false,
        },
        {
          name: 'contest',
          label: 'Contest',
          type: 'relationship',
          relationTo: 'contest',
          hasMany: false,
        },

        {
          name: 'review',
          type: 'textarea',
          label: 'Review',
        },
        {
          name: 'rating',
          type: 'number',
          label: 'Rating',
        },
      ],
    },
  ],
}
export default Testimonial
