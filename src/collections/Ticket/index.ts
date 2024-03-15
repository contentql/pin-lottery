import { CollectionConfig } from 'payload/types'

const Ticket: CollectionConfig = {
  slug: 'tickets',
  labels: { plural: 'tickets', singular: 'ticket' },
  fields: [
    {
      name: 'ticket_numbers',
      type: 'array',
      label: 'Ticket Numbers',
      fields: [
        {
          name: 'number',
          type: 'number',
          label: 'Number',
        },
      ],
    },
    {
      name: 'ticket_price',
      type: 'number',
      label: 'Ticket Price',
      required: true,
    },
    {
      name: 'contest_no',
      type: 'relationship',
      label: 'Contest No',
      relationTo: ['contest'],
      hasMany: false,
    },
    {
      name: 'purchased_by',
      type: 'relationship',
      label: 'Purchased By',
      relationTo: ['users'],
      hasMany: false,
    },
  ],
}

export default Ticket
