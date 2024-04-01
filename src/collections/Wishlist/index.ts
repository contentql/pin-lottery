import { User } from '@/payload-types'
import { CollectionConfig } from 'payload/types'
import { isAdminOrSelf } from './access/isAdminOrSelf'
import { assignUserId } from './field-level-hooks/assignUserId'

const Wishlist: CollectionConfig = {
  slug: 'wishlist',
  // admin: {
  //   hidden: true,
  // },
  access: {
    create: isAdminOrSelf,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdminOrSelf,
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
