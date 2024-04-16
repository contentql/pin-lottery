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
}

export default Transaction
