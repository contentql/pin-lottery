import { CollectionConfig } from 'payload/types'
const Winner: CollectionConfig = {
  slug: 'winner',
  admin: {
    useAsTitle: 'ticket_number',
  },
  fields: [
    { name: 'ticket_number', type: 'text', label: 'Ticket Number' },
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
