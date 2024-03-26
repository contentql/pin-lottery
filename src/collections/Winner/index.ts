import { CollectionConfig } from 'payload/types'
import { JWTUser } from '../../custom-payload-types'

const Winner: CollectionConfig = {
  slug: 'winner',
  admin: {
    hidden: ({ user }: { user: JWTUser }) => {
      const { roles } = user

      if (roles?.includes('editor')) return true

      return false
    },
  },
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
