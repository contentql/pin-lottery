import { CollectionConfig } from 'payload/types';
const Contest: CollectionConfig = {
  slug: 'contest',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Product Details',
          description: 'Please provide product details.',
          fields: [
            { name: 'title', type: 'text', label: 'Title', required: true },
            {
              type: 'row',
              fields: [
                {
                  name: 'product_price',
                  type: 'number',
                  label: 'Product Price',
                  required: true,
                },
                {
                  name: 'ticket_price',
                  type: 'number',
                  label: 'Ticket Price',
                  required: true,
                },
              ],
            },
            {
              name: 'img',
              type: 'upload',
              label: 'Cover Image',
              relationTo: 'media',
            },
            {
              name: 'tag',
              type: 'relationship',
              relationTo: ['tags'],
              hasMany: false,
              label: 'Tag',
            },
          ],
        },

        //tab two
        {
          label: 'Contest details',
          description: 'Please provide contest details.',
          fields: [
            {
              name: 'contest_no',
              type: 'text',
              label: 'Contest Number',
              required: true,
              maxLength: 5,
            },
            { name: 'day_remain', type: 'number', label: 'Days Remaining' },
            { name: 'ticket_remain', type: 'number', label: 'Tickets Remaining' },
          ],
        },

        // tab three
        {
          name: 'product_features',
          label: 'Product Features',
          description: 'Please provide  product features details.',
          fields: [
            {
              name: 'images',
              type: 'array',
              label: 'Images',
              fields: [
                {
                  name: 'product_images',
                  type: 'upload',
                  label: 'Images',
                  relationTo: 'media',
                },
              ],
            },
            {
              name: 'features',
              type: 'richText',
              label: 'Features',
            },
            {
              name: 'description',
              type: 'richText',
              label: 'Description',
            },
          ],
        },
      ],
    },
  ],
};

export default Contest;
