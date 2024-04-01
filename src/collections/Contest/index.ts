import { NumberField } from '@nouance/payload-better-fields-plugin'
import {
  HTMLConverterFeature,
  lexicalEditor,
  lexicalHTML,
} from '@payloadcms/richtext-lexical'
import { customAlphabet } from 'nanoid'
import { CollectionConfig } from 'payload/types'
import { JWTUser } from '../../custom-payload-types'
import { announceWinnerAfterUpdate } from './hooks/announceWinnerAfterUpdate'
import { deleteWinnerAfterUpdate } from './hooks/deleteWinnerAfterUpdate'

const Contest: CollectionConfig = {
  slug: 'contest',
  admin: {
    useAsTitle: 'title',
    hidden: ({ user }: { user: JWTUser }) => {
      if (user) {
        const { roles } = user

        if (roles?.includes('manager')) return false
        if (roles?.includes('admin')) return false
        if (roles?.includes('editor')) return true
      }

      return true
    },
  },
  hooks: {
    // beforeRead: [updateContestAfterRead],
    afterChange: [announceWinnerAfterUpdate, deleteWinnerAfterUpdate],
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
                ...NumberField(
                  {
                    name: 'product_price',
                    required: true,
                    label: 'Product Price',
                    admin: {
                      description: 'Enter the price in dollars',
                      placeholder: '199.99',
                    },
                  },
                  {
                    prefix: '$ ',
                    thousandSeparator: ',',
                    decimalScale: 2,
                    fixedDecimalScale: true,
                  },
                ),
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
              admin: {
                description:
                  'A list of key features or specifications of the product.',
              },
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
              admin: {
                description: 'A detailed description of the product.',
              },
            },
            {
              name: 'hero_description',
              type: 'textarea',
              label: 'Hero description',
              admin: {
                description:
                  'This text will only displayed in hero section of home page.',
              },
            },

            {
              name: 'img',
              type: 'upload',
              label: 'Cover Image',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'The primary image for the product.',
              },
            },
            {
              name: 'images',
              type: 'array',
              label: 'Product Images',
              required: true,
              minRows: 3,
              admin: {
                description: 'A collection of images showcasing the product.',
              },
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
              type: 'row',
              fields: [
                {
                  name: 'contest_no',
                  type: 'text',
                  label: 'Contest Number',
                  required: true,
                  maxLength: 5,
                  defaultValue: () => {
                    const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
                    const nanoid = customAlphabet(alphabet, 4)

                    return nanoid()
                  },
                  admin: {
                    description:
                      'Auto-generated unique identifier for the contest.',
                    readOnly: true,
                  },
                },
                {
                  name: 'tickets_purchased',
                  type: 'number',
                  label: 'Tickets Purchased',
                  admin: {
                    description:
                      'The number of tickets purchased for the contest.',
                    readOnly: true,
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                ...NumberField(
                  {
                    name: 'ticket_price',
                    label: 'Ticket Price',
                    required: true,
                    admin: {
                      description: 'Enter the price in dollars',
                      placeholder: '10.99',
                    },
                  },
                  {
                    prefix: '$ ',
                    thousandSeparator: ',',
                    decimalScale: 2,
                    fixedDecimalScale: true,
                  },
                ),
                {
                  name: 'day_remain',
                  type: 'text',
                  label: 'Days After Threshold Reached',
                  defaultValue: '5d 6h 56m 30s',
                  required: true,
                  validate: val => {
                    if (!val) return 'Enter a value (e.g., "5d 6m 60s").'

                    const durationParts = val.split(/\s+/)
                    const regex =
                      /^(\d+y)?\s*(\d+d)?\s*(\d+h)?\s*(\d+m)?\s*(\d+s)?$/

                    for (const part of durationParts) {
                      if (!regex.test(part)) {
                        return 'Invalid duration format (e.g., "5d 6m 60s").'
                      }
                    }

                    return true
                  },
                  admin: {
                    description: 'e.g: 5d 6h 56m 30s',
                    placeholder: '5d 6h 56m 30s',
                  },
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
              name: 'product_type',
              type: 'select',
              label: 'Product Type',
              options: [
                { label: 'Car', value: 'Car' },
                { label: 'Bike', value: 'Bike' },
                { label: 'Mobile', value: 'Mobile' },
                { label: 'Laptop', value: 'Laptop' },
              ],
              admin: {
                description: 'Select the type of product from the list.',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'zero_sixty',
                  type: 'text',
                  label: 'Zero-to-Sixty',
                  required: true,
                  admin: {
                    description: 'Time taken to accelerate from 0 to 60 mph.',
                    condition: data =>
                      data?.product_type === 'Car' ||
                      data?.product_type === 'Bike',
                  },
                },
                {
                  name: 'top_speed',
                  type: 'text',
                  label: 'Top Speed',
                  required: true,
                  admin: {
                    description: 'Maximum achievable speed of the product.',
                    condition: data =>
                      data?.product_type === 'Car' ||
                      data?.product_type === 'Bike',
                  },
                },
                {
                  name: 'power',
                  type: 'text',
                  label: 'Power',
                  required: true,
                  admin: {
                    description: 'The power output of the product.',
                    condition: data =>
                      data?.product_type === 'Car' ||
                      data?.product_type === 'Bike',
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
                    description: 'The engine displacement of the product.',
                    condition: data =>
                      data?.product_type === 'Car' ||
                      data?.product_type === 'Bike',
                  },
                },
                {
                  name: 'bhp',
                  type: 'text',
                  label: 'Brake Horsepower',
                  required: true,
                  admin: {
                    description: 'The brake horsepower (bhp) of the product.',
                    condition: data =>
                      data?.product_type === 'Car' ||
                      data?.product_type === 'Bike',
                  },
                },
                {
                  name: 'year',
                  type: 'text',
                  label: 'Year',
                  required: true,
                  admin: {
                    description: 'The year of manufacture for the product.',
                    condition: data =>
                      data?.product_type === 'Car' ||
                      data?.product_type === 'Bike',
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
                    description: 'The processor or CPU of the product.',
                    condition: data =>
                      data?.product_type === 'Mobile' ||
                      data?.product_type === 'Laptop',
                  },
                },
                {
                  name: 'ram',
                  type: 'text',
                  label: 'RAM',
                  required: true,
                  admin: {
                    description:
                      'The RAM (Random Access Memory) of the product.',
                    condition: data =>
                      data?.product_type === 'Mobile' ||
                      data?.product_type === 'Laptop',
                  },
                },
                {
                  name: 'storage',
                  type: 'text',
                  label: 'Storage',
                  required: true,
                  admin: {
                    description: 'The storage capacity of the product.',
                    condition: data =>
                      data?.product_type === 'Mobile' ||
                      data?.product_type === 'Laptop',
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
                    description: 'The display specifications of the product.',
                    condition: data =>
                      data?.product_type === 'Mobile' ||
                      data?.product_type === 'Laptop',
                  },
                },
                {
                  name: 'battery',
                  type: 'text',
                  label: 'Battery',
                  required: true,
                  admin: {
                    description: 'The battery specifications of the product.',
                    condition: data =>
                      data?.product_type === 'Mobile' ||
                      data?.product_type === 'Laptop',
                  },
                },
                {
                  name: 'Camera',
                  type: 'text',
                  label: 'Camera',
                  required: true,
                  admin: {
                    description: 'The camera specifications of the product.',
                    condition: data =>
                      data?.product_type === 'Mobile' ||
                      data?.product_type === 'Laptop',
                  },
                },
              ],
            },
          ],
        },
      ],
    },

    //contest status - sidebar
    {
      name: 'reached_threshold',
      type: 'checkbox',
      label: 'Reached Threshold',
      admin: {
        description: 'Indicates if the product reached a predefined threshold.',
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'threshold_reached_date',
      type: 'date',
      label: 'Threshold Reached Date',
      admin: {
        description: 'Date when the product reached the predefined threshold.',
        position: 'sidebar',
        readOnly: true,
        condition: data => data.reached_threshold === true,
      },
    },
    {
      name: 'contest_timer_status',
      type: 'checkbox',
      label: 'Contest Timer Status',
      defaultValue: false,
      admin: {
        readOnly: true,
        position: 'sidebar',
        description:
          'Status of contest winner announcement time (completed/not completed).',
      },
    },
    {
      name: 'contest_status',
      label: 'Contest Winner announced',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Indicates if the contest winner has been announced.',
        position: 'sidebar',
      },
    },
    {
      name: 'winner_ticket',
      label: 'Winner ',
      type: 'relationship',
      relationTo: ['winner'],
      admin: {
        description: 'Select the winner of the contest.',
        position: 'sidebar',
        condition: data => data.contest_status === true,
      },
    },
    {
      name: 'show_in_hero',
      label: 'Display contest in hero section',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Check to display this contest in hero section.',
        position: 'sidebar',
      },
    },
  ],
}

export default Contest
