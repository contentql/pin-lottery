import { Field } from 'payload/types'
import { CustomContestRelationshipComponent } from './component'

export const customContestRelationshipField: Field = {
  name: 'contest_id',
  type: 'relationship',
  label: 'Contest Id',
  relationTo: ['contest'],
  hasMany: false,
  required: true,
  admin: {
    description: 'The contest associated with this ticket.',
    position: 'sidebar',
    components: {
      Field: CustomContestRelationshipComponent,
    },
  },
  filterOptions: ({ relationTo, data, id }) => {
    if (relationTo === 'contest') {
      return {
        contest_status: {
          equals: false,
        },
      }
    }

    return false
  },
}
