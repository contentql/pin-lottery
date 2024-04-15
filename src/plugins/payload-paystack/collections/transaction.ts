import type { CollectionConfig } from 'payload/types'

import { isAdminOrSelf } from './isAdminOrSelf'

export const Transaction: CollectionConfig = {
  slug: 'transaction',
  access: {
    read: isAdminOrSelf,
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: ['users'],
      admin: {
        readOnly: true,
      },
      label: 'User',
    },
    {
      name: 'type_of_transaction',
      type: 'select',
      options: [
        { label: 'Deposit', value: 'deposit' },
        { label: 'Withdraw', value: 'withdraw' },
        { label: 'Tickets Purchased', value: 'tickets_purchased' },
        { label: 'Refund', value: 'refund' },
      ],
      admin: {
        readOnly: true,
      },
      label: 'Type of Transaction',
    },
    {
      name: 'amount',
      type: 'text',
      admin: {
        readOnly: true,
      },
      label: 'Amount',
    },
    {
      name: 'date',
      type: 'date',
      admin: {
        readOnly: true,
      },
      label: 'Transaction Data',
    },
    {
      name: 'status',
      type: 'text',
      admin: {
        readOnly: true,
      },
      label: 'Payment Status',
    },
    {
      name: 'payment_method',
      type: 'text',
      admin: {
        readOnly: true,
      },
      label: 'Payment Method',
    },
    {
      name: 'value',
      type: 'json',
      required: true,
      admin: {
        readOnly: true,
      },
      label: 'Meta Data',
    },
  ],
  endpoints: [
    {
      path: '/paystack/webhook',
      method: 'post',
      handler: async (req, res) => {
        const { payload, body, user } = req

        try {
          await payload.create({
            collection: 'transaction',
            data: {
              value: { body },
              amount: body.data.amount,
              status: body?.data.status,
              payment_method: body.data.authorization.brand,
              date: body.data.paid_at,
              user: {
                relationTo: 'users',
                value: user.id,
              },
            },
          })
        } catch (error) {
          console.log('Error while creating a transaction: ', error)
          console.log('Error while creating a transaction: ', error)
        }

        if (
          body.data.status === 'success' &&
          body.data.authorization.authorization_code
        ) {
          try {
            // const { docs } = await payload.find({
            //   collection: 'users',
            //   where: {
            //     email: {
            //       equals: body.data.customer.email,
            //     },
            //   },
            // })
            // const { docs } = await payload.find({
            //   collection: 'users',
            //   where: {
            //     email: {
            //       equals: body.data.customer.email,
            //     },
            //   },
            // })

            const userAmount = user.amount + body.data.amount

            await payload.update({
              collection: 'users',
              id: user.id,
              data: {
                amount: userAmount,
              },
              user: user,
              overrideAccess: false, // enables access control
            })
          } catch (error) {
            console.log('Error while update user amount: ', error)
          }
        }

        res.status(200).json({ status: true })
      },
    },
  ],
}

export default Transaction
