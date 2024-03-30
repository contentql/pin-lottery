import { CollectionConfig } from 'payload/types'
import { JWTUser } from '../../custom-payload-types'

const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'tag',
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
