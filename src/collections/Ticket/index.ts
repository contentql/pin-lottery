import { CollectionConfig } from 'payload/types'
import { isAdminOrSelf } from './access/isAdminOrSelf'
import { assignUserId } from './field-level-hooks/assignUserId'

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
    afterChange: [
      async ({ operation, doc, req }) => {
        const { payload } = req
        // read total tickets and updated in contest
        // check threshold and update it

        if (operation === 'create') {
          const { totalDocs: tickets_purchased } = await payload.find({
            collection: 'tickets',
            depth: 0,
            where: {
              'contest_id.value': {
                equals: doc.id,
              },
            },
          })
        }
      },
    ],
    afterOperation: [
      async ({ result, req, operation }) => {
        if (operation === 'delete' || operation === 'deleteByID') {
          const { payload } = req
          // read total tickets and
        }
        return result
      },
    ],
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
          required: true,
          admin: {
            description: 'Auto-generated unique ticket number',
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
      type: 'row',
      fields: [
        {
          name: 'draw_status',
          type: 'checkbox',
          label: 'Draw Status',
          defaultValue: false,
          admin: {
            description:
              'Status indicating whether the draw has been completed for this ticket',
          },
        },
        {
          name: 'win_status',
          type: 'checkbox',
          label: 'Win Status',
          defaultValue: false,
          admin: {
            description: 'Status indicating whether the ticket is a winner',
            condition: data => {
              if (data.draw_status) {
                return true
              }

              return false
            },
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
      required: true,
      hooks: {
        beforeChange: [assignUserId],
      },
      admin: { position: 'sidebar' },
    },
  ],
}

export default Ticket
