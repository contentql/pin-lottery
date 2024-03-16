import { CollectionConfig } from 'payload/types'
const Winner: CollectionConfig = {
  slug: 'winner',
  admin: {
    useAsTitle: 'ticket_number',
  },
  fields: [
    { name: 'ticket_number', type: 'number', label: 'Ticket Number' },
    {
      name: 'user',
      type: 'relationship',
      label:'User',
      relationTo: ['users'],
      hasMany: false,
    },
    {
      name: 'contest',
      type: 'relationship',
      label:'Contest',
      relationTo: ['contest'],
      hasMany: false,
    },
  ],
}

export default Winner
