import { CollectionConfig } from 'payload/types'

const Ticket: CollectionConfig = {
  slug: 'tickets',
  labels: { plural: 'tickets', singular: 'ticket' },
  hooks: {
    // afterOperation: [generateTicketNumbers],
  },
  fields: [
    {
      name: 'ticket_number',
      type: 'number',
      label: 'Ticket Number',
      unique: true,
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
