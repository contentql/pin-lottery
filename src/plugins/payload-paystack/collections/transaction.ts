import type { CollectionConfig } from 'payload/types'

export const Transaction: CollectionConfig = {
  slug: 'transaction',
  //   access: {
  //     create: () => false,
  //     update: () => false,
  //   },
  fields: [
    {
      name: 'value',
      type: 'json',
      required: true,
      admin: {
        readOnly: true,
      },
    },
  ],
  endpoints: [
    {
      path: '/paystack/webhook',
      method: 'get',
      handler: async (req, res) => {
        const { payload, body } = req

        console.log('body', body)

        res.status(200).json({ status: true })
      },
    },
  ],
}

export default Transaction
