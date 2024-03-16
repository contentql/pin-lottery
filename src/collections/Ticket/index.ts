import { CollectionConfig } from 'payload/types'
import { isAdminOrSelf } from './access/isAdminOrSelf'

const Ticket: CollectionConfig = {
  slug: 'tickets',
  labels: { plural: 'tickets', singular: 'ticket' },
  access: {
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdminOrSelf,
  },
  fields: [
    {
      name: 'ticket_number',
      type: 'text',
      label: 'Ticket Number',
      unique: true,
      required: true,
    },
    {
      name: 'ticket_price',
      type: 'number',
      label: 'Ticket Price',
      required: true,
    },
    {
      name: 'contest_id',
      type: 'relationship',
      label: 'Contest Id',
      relationTo: ['contest'],
      hasMany: false,
      required: true,
    },
    {
      name: 'purchased_by',
      type: 'relationship',
      label: 'Purchased By',
      relationTo: ['users'],
      hasMany: false,
      required: true,
    },
  ],
}

export default Ticket
