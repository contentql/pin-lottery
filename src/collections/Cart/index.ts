import { User } from '@/payload-types'
import { CollectionConfig } from 'payload/types'
import { isAdminOrSelf } from './access/isAdminOrSelf'
import { assignUserId } from './field-level-hooks/assignUserId'

const Cart: CollectionConfig = {
  slug: 'cart',
  access: {
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdminOrSelf,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'tickets',
          type: 'number',
          label: 'Tickets',
          required: true,
          admin: { description: 'Total no. of tickets' },
        },
        {
          name: 'total_price',
          type: 'number',
          label: 'Total Price',
          required: true,
          admin: {
            description: 'Total tickets price',
          },
        },
      ],
    },
    {
      name: 'contest_id',
      label: 'Contest Id',
      type: 'relationship',
      relationTo: ['contest'],
      hasMany: false,
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'user_id',
      label: 'User Id',
      type: 'relationship',
      relationTo: ['users'],
      hasMany: false,
      defaultValue: ({ user }: { user: User }) => {
        if (!user) return undefined

        return { relationTo: 'users', value: user?.id }
      },
      admin: { position: 'sidebar' },
      hooks: {
        beforeChange: [assignUserId],
      },
    },
  ],
}

export default Cart
