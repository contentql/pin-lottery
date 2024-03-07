import {
  HTMLConverterFeature,
  lexicalEditor,
  lexicalHTML,
} from '@payloadcms/richtext-lexical'
import { CollectionConfig } from 'payload/types'
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
                  name: 'tag',
                  type: 'relationship',
                  relationTo: ['tags'],
                  hasMany: false,
                  label: 'Tag',
                },
              ],
            },
            {
              name: 'features',
              type: 'richText',
              label: 'Product Features',
              editor: lexicalEditor({
                features: ({ defaultFeatures }) => [
                  ...defaultFeatures,
                  HTMLConverterFeature({}),
                ],
              }),
            },
            {
              name: 'description',
              type: 'richText',
              label: 'Product Description',
              editor: lexicalEditor({
                features: ({ defaultFeatures }) => [
                  ...defaultFeatures,
                  HTMLConverterFeature({}),
                ],
              }),
            },

            {
              name: 'img',
              type: 'upload',
              label: 'Cover Image',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'images',
              type: 'array',
              label: 'Product Images',
              fields: [
                {
                  name: 'product_images',
                  type: 'upload',
                  label: 'Images',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
            lexicalHTML('features', {
              name: 'features_html',
            }),
            lexicalHTML('description', {
              name: 'description_html',
            }),
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
            {
              type: 'row',
              fields: [
                {
                  name: 'ticket_price',
                  type: 'number',
                  label: 'Ticket Price',
                  required: true,
                },
                {
                  name: 'day_remain',
                  type: 'number',
                  label: 'Days after threshold reached',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export default Contest
