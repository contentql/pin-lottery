import { CollectionConfig } from 'payload/types'

const Cart: CollectionConfig = {
  slug: 'cart',
  labels: { plural: 'carts', singular: 'cart' },
  access: {
    read: ({ req: { user } }) => {
      if (user) {
        return {
          'user.value': {
            equals: user.id,
          },
        }
      }

      return false
    },

    delete: ({ req: { user } }) => {
      if (user) {
        return {
          'user.value': {
            equals: user.id,
          },
        }
      }

      return false
    },
  },
  fields: [
    {
      name: 'contest_id',
      type: 'text',
      label: 'Contest Id',
      required: true,
    },
    {
      name: 'contest_no',
      type: 'text',
      label: 'Contest No',
      required: true,
    },
    {
      name: 'tickets',
      type: 'number',
      label: 'Tickets',
      required: true,
    },
    {
      name: 'each_ticket_price',
      type: 'number',
      label: 'Each Ticket Price',
      required: true,
    },
    {
      name: 'total_price',
      type: 'number',
      label: 'Total Price',
      required: true,
    },
    {
      name: 'user',
      label: 'User',
      type: 'relationship',
      relationTo: ['users'],
      hasMany: false,
      required: true,
    },
  ],
}

export default Cart
