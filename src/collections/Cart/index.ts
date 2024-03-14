import { CollectionConfig } from 'payload/types'

const Cart: CollectionConfig = {
  slug: 'cart',
  labels: { plural: 'Cart' },
  fields: [
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
      name: 'user',
      type: 'relationship',
      label: 'User',
      relationTo: ['users'],
      hasMany: false,
      required: true,
    },
  ],
}

export default Cart
