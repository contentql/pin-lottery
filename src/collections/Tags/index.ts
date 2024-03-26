import { CollectionConfig } from 'payload/types'
import { JWTUser } from '../../custom-payload-types'

const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'tag',
    hidden: ({ user }: { user: JWTUser }) => {
      const { roles } = user

      if (roles?.includes('editor')) return true

      return false
    },
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
  ],
}

export default Tags
