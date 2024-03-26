import { User } from '@/payload-types'
import { CollectionConfig } from 'payload/types'
import { isAdminOrSelf } from './access/isAdminOrSelf'
import { assignUserId } from './field-level-hooks/assignUserId'

const Cart: CollectionConfig = {
  slug: 'cart',
  admin: {
    hidden: () => {
      return true
    },
  },
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
          admin: { description: 'Total number of tickets in the cart.' },
        },
        {
          name: 'total_price',
          type: 'number',
          label: 'Total Price',
          required: true,
          admin: { description: 'Total price of all tickets in the cart.' },
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
        description: 'The contest associated with this cart.',
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
      admin: {
        position: 'sidebar',
        description: 'The user associated with this cart.',
      },
      hooks: {
        beforeChange: [assignUserId],
      },
    },
  ],
}

export default Cart
