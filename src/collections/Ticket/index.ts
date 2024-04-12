import { NumberField } from '@nouance/payload-better-fields-plugin'
import { customAlphabet } from 'nanoid'
import { CollectionConfig } from 'payload/types'
import { User } from '../../payload-types'
import { isManagerOrAdminOrSelf } from './access/isManagerOrAdminOrSelf'
import { customContestRelationshipField } from './custom/custom-contest-relationship-field/field'
import { assignUserId } from './field-level-hooks/assignUserId'
import { updateContestAfterCreate } from './hooks/updateContestAfterCreate'
import { updateContestAfterDelete } from './hooks/updateContestAfterDelete'
import { updateUserAfterCreate } from './hooks/updateUserAfterCreate'

const Ticket: CollectionConfig = {
  slug: 'tickets',
  access: {
    create: isManagerOrAdminOrSelf,
    read: isManagerOrAdminOrSelf,
    // update: isManagerOrAdminOrSelf,
    update: () => false,
    delete: isManagerOrAdminOrSelf,
  },
  admin: {
    useAsTitle: 'ticket_number',
  },
  // when creating a ticket, ensure the button was disabled
  hooks: {
    afterChange: [updateContestAfterCreate, updateUserAfterCreate],
    afterDelete: [updateContestAfterDelete],
  },
  fields: [
    {
      type: 'row',
      fields: [
        { ...customContestRelationshipField },
        {
          name: 'purchased_by',
          type: 'relationship',
          label: 'Purchased By',
          relationTo: ['users'],
          hasMany: false,
          defaultValue: ({ user }: { user: User }) => {
            if (!user) return undefined

            return { relationTo: 'users', value: user?.id }
          },
          admin: {
            description: 'The user who purchased this ticket.',
          },
          hooks: {
            beforeChange: [assignUserId],
          },
        },
      ],
    },
    {
      name: 'ticket_number',
      type: 'text',
      label: 'Ticket Number',
      unique: true,
      defaultValue: () => {
        const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        const nanoid = customAlphabet(alphabet, 14)

        return nanoid()
      },
      admin: {
        description: 'Auto-generated unique ticket number.',
        position: 'sidebar',
        readOnly: true,
      },
    },
    ...NumberField(
      {
        name: 'ticket_price',
        label: 'Ticket Price',
        required: true,
        admin: {
          description: 'The ticket price in dollars (auto-select)',
          placeholder: '199.99',
          position: 'sidebar',
          readOnly: true,
        },
      },
      {
        prefix: '₦ ',
        thousandSeparator: ',',
        decimalScale: 2,
        fixedDecimalScale: true,
      },
    ),
  ],
}

export default Ticket
