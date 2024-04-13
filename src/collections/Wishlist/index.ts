import { CollectionConfig } from 'payload/types'

import { User } from '@/payload-types'

import { self } from './access/self'
import { assignUserId } from './field-level-hooks/assignUserId'

const Wishlist: CollectionConfig = {
  slug: 'wishlist',
  access: {
    create: self,
    read: self,
    update: self,
    delete: self,
  },
  fields: [
    {
      name: 'contest',
      label: 'Contest',
      type: 'relationship',
      relationTo: ['contest'],
      hasMany: false,
      required: true,
      admin: {
        position: 'sidebar',
        description: 'The contest associated with this wishlist.',
      },
    },
    {
      name: 'user',
      label: 'User',
      type: 'relationship',
      relationTo: ['users'],
      hasMany: false,
      defaultValue: ({ user }: { user: User }) => {
        if (!user) return undefined

        return { relationTo: 'users', value: user?.id }
      },
      admin: {
        position: 'sidebar',
        description: 'The user associated with this wishlist.',
      },
      hooks: {
        beforeChange: [assignUserId],
      },
    },
  ],
}

export default Wishlist
