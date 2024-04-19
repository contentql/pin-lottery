import { depositAmount } from '../hooks/emails/depositAmount'
import { TicketsPurchased } from '../hooks/emails/ticketsPurchased'
import type { CollectionConfig } from 'payload/types'

import { isAdminOrSelf } from './isAdminOrSelf'

// If you wanna create endpoint, use the plugin.ts file
export const Transaction: CollectionConfig = {
  slug: 'transaction',
  access: {
    read: isAdminOrSelf,
    create: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdminOrSelf,
  },
  hooks: { afterChange: [depositAmount, TicketsPurchased] },
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
      type: 'number',
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
      label: 'Paystack Body',
      admin: {
        readOnly: true,
        description: 'this is Paystack details',
        condition: data =>
          data?.type_of_transaction === 'deposit' ||
          data?.type_of_transaction === 'withdraw',
      },
    },
    {
      name: 'tickets_transactions',
      type: 'json',
      label: 'Ticket Details',
      admin: {
        readOnly: true,
        description: 'this is ticket details',
        condition: data =>
          data?.type_of_transaction === 'tickets_purchased' ||
          data?.type_of_transaction === 'refund',
      },
    },
  ],
}

export default Transaction
