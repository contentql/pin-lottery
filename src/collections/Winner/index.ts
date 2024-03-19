import { CollectionConfig } from 'payload/types'
const Winner: CollectionConfig = {
  slug: 'winner',

  fields: [
    {
      name: 'contest',
      type: 'relationship',
      label: 'Contest',
      relationTo: ['contest'],
      hasMany: false,
    },
    {
      name: 'ticket',
      type: 'relationship',
      relationTo: ['tickets'],
      label: 'Winner Ticket',
      hasMany: false,
      filterOptions: ({ relationTo, data }) => {
        const selectedContestId = data?.contest?.value
        if (relationTo === 'tickets' && selectedContestId) {
          return {
            'contest_id.value': {
              equals: selectedContestId,
            },
          }
        } else {
          return false
        }
      },
    },
  ],
}

export default Winner
