import { customAlphabet } from 'nanoid'
import { CollectionConfig } from 'payload/types'
import { User } from '../../payload-types'
import { isAdminOrSelf } from './access/isAdminOrSelf'
import { updateContestAfterCreate } from './hooks/updateContestAfterCreate'
import { updateContestAfterDelete } from './hooks/updateContestAfterDelete'

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const nanoid = customAlphabet(alphabet, 14)

const Ticket: CollectionConfig = {
  slug: 'tickets',
  access: {
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdminOrSelf,
  },
  admin: {
    useAsTitle: 'ticket_number',
  },
  // when creating a ticket, ensure the button was disabled
  hooks: {
    afterChange: [updateContestAfterCreate],
    afterOperation: [updateContestAfterDelete],
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'ticket_number',
          type: 'text',
          label: 'Ticket Number',
          unique: true,
          defaultValue: nanoid(),
          admin: {
            description: 'Auto-generated unique ticket number',
            readOnly: true,
          },
        },
        {
          name: 'ticket_price',
          type: 'number',
          label: 'Ticket Price',
          required: true,
          admin: {
            description: 'Price of the ticket at the time of purchase',
          },
        },
      ],
    },
    {
      name: 'contest_id',
      type: 'relationship',
      label: 'Contest Id',
      relationTo: ['contest'],
      hasMany: false,
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'purchased_by',
      type: 'relationship',
      label: 'Purchased By',
      relationTo: ['users'],
      hasMany: false,
      defaultValue: ({ user }: { user: User }) => {
        return { relationTo: 'users', value: user?.id }
      },
      admin: { position: 'sidebar' },
      hooks: {
        // beforeChange: [assignUserId],
      },
    },
  ],
}

export default Ticket
