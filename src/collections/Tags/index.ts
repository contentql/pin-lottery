import { CollectionConfig } from 'payload/types'

const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'tag',
  },
  fields: [
    {
      name: 'tag',
      type: 'text',
      label: 'Product Type',
      required: true,
      admin: {
        description: 'The name of the product type tag.',
      },
    },
    {
      name: 'img',
      type: 'upload',
      label: 'icon',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'The icon associated with the product type tag.',
      },
    },
    {
      name: 'is_coming_soon',
      type: 'checkbox',
      label: 'Tag is Coming soon',
      defaultValue: true,
      admin: {
        description: 'This Tag will available in future.',
      },
    },
  ],
}

export default Tags
