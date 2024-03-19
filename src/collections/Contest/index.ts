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
                  label: 'Tag',
                  relationTo: ['tags'],
                  hasMany: false,
                  required: true,
                },
              ],
            },
            {
              name: 'features',
              type: 'richText',
              label: 'Product Features',
              required: true,
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
              required: true,
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
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Product Specifications',
          description: 'Product Specification',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'zero_sixty',
                  type: 'text',
                  label: 'Zero-to-Sixty',
                  required: true,
                  admin: {
                    condition: data =>
                      data.tag?.value === '65e02c1fee7df6c30ffe0c35' ||
                      data.tag?.value === '65ec6a8841f52a4527c0aeff',
                  },
                },
                {
                  name: 'top_speed',
                  type: 'text',
                  label: 'Top Speed',
                  required: true,
                  admin: {
                    condition: data =>
                      data.tag?.value === '65e02c1fee7df6c30ffe0c35' ||
                      data.tag?.value === '65ec6a8841f52a4527c0aeff',
                  },
                },
                {
                  name: 'power',
                  type: 'text',
                  label: 'Power',
                  required: true,
                  admin: {
                    condition: data =>
                      data.tag?.value === '65e02c1fee7df6c30ffe0c35' ||
                      data.tag?.value === '65ec6a8841f52a4527c0aeff',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'displacement',
                  type: 'text',
                  label: 'Displacement',
                  required: true,
                  admin: {
                    condition: data =>
                      data.tag?.value === '65e02c1fee7df6c30ffe0c35' ||
                      data.tag?.value === '65ec6a8841f52a4527c0aeff',
                  },
                },
                {
                  name: 'bhp',
                  type: 'text',
                  label: 'Brake Horsepower',
                  required: true,
                  admin: {
                    condition: data =>
                      data.tag?.value === '65e02c1fee7df6c30ffe0c35' ||
                      data.tag?.value === '65ec6a8841f52a4527c0aeff',
                  },
                },
                {
                  name: 'year',
                  type: 'text',
                  label: 'Year',
                  required: true,
                  admin: {
                    condition: data =>
                      data.tag?.value === '65e02c1fee7df6c30ffe0c35' ||
                      data.tag?.value === '65ec6a8841f52a4527c0aeff',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'processor_cpu',
                  type: 'text',
                  label: 'Processor/CPU',
                  required: true,
                  admin: {
                    condition: data =>
                      data.tag?.value === '65ec6ad941f52a4527c0af27' ||
                      data.tag?.value === '65e02c30ee7df6c30ffe0c3d',
                  },
                },
                {
                  name: 'ram',
                  type: 'text',
                  label: 'RAM',
                  required: true,
                  admin: {
                    condition: data =>
                      data.tag?.value === '65ec6ad941f52a4527c0af27' ||
                      data.tag?.value === '65e02c30ee7df6c30ffe0c3d',
                  },
                },
                {
                  name: 'storage',
                  type: 'text',
                  label: 'Storage',
                  required: true,
                  admin: {
                    condition: data =>
                      data.tag?.value === '65ec6ad941f52a4527c0af27' ||
                      data.tag?.value === '65e02c30ee7df6c30ffe0c3d',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'display',
                  type: 'text',
                  label: 'Display',
                  required: true,
                  admin: {
                    condition: data =>
                      data.tag?.value === '65ec6ad941f52a4527c0af27' ||
                      data.tag?.value === '65e02c30ee7df6c30ffe0c3d',
                  },
                },
                {
                  name: 'battery',
                  type: 'text',
                  label: 'Battery',
                  required: true,
                  admin: {
                    condition: data =>
                      data.tag?.value === '65ec6ad941f52a4527c0af27' ||
                      data.tag?.value === '65e02c30ee7df6c30ffe0c3d',
                  },
                },
                {
                  name: 'Camera',
                  type: 'text',
                  label: 'Camera',
                  required: true,
                  admin: {
                    condition: data =>
                      data.tag?.value === '65ec6ad941f52a4527c0af27' ||
                      data.tag?.value === '65e02c30ee7df6c30ffe0c3d',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Contest Status',
          description: 'Contest status for winner announcement',
          fields: [
            {
              name: 'contest_status',
              label: 'Contest Winner announced',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'winner_ticket',
              label: 'Winner ',
              type: 'relationship',
              relationTo: ['winner'],
              admin: {
                condition: data => data.contest_status === true,
              },
            },
          ],
        },
      ],
    },
  ],
}

export default Contest
