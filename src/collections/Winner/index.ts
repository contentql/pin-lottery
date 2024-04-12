import { CollectionConfig } from 'payload/types'
import { updateContestAfterDelete } from './hooks/updateContestAfterDelete'

const Winner: CollectionConfig = {
  slug: 'winner',
  access: {
    update: () => false,
  },
  hooks: {
    afterDelete: [updateContestAfterDelete],
  },
  fields: [
    {
      name: 'contest',
      type: 'relationship',
      label: 'Contest',
      unique: true,
      relationTo: ['contest'],
      hasMany: false,
    },
    {
      name: 'ticket',
      type: 'relationship',
      relationTo: ['tickets'],
      label: 'Winner Ticket',
      unique: true,
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
