import type { CollectionConfig } from 'payload/types'

export const Transaction: CollectionConfig = {
  slug: 'transaction',
  //   access: {
  //     create: () => false,
  //     update: () => false,
  //   },
  fields: [
    {
      name: 'email',
      type: 'email',
      admin: {
        readOnly: true,
      },
      label: 'User Email',
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
        const { payload, body } = req

        console.log('body', body)

        try {
          await payload.create({
            collection: 'transaction',
            data: {
              value: { body },
              amount: body.data.amount,
              status: body?.data.status,
              payment_method: body.data.authorization.brand,
              date: body.data.paid_at,
              email: body.data.customer.email,
            },
          })
        } catch (error) {
          console.log('Error while creating a tranction: ', error)
        }

        if (
          body.data.status === 'success' &&
          body.data.authorization.authorization_code
        ) {
          try {
            const { docs } = await payload.find({
              collection: 'users',
              where: {
                email: {
                  equals: body.data.customer.email,
                },
              },
            })

            const userAmount = docs.at(0)?.amount + body.data.amount
            console.log('userAmount', docs.at(0)?.amount)
            await payload.update({
              collection: 'users',
              data: {
                amount: userAmount,
              },
              where: {
                email: {
                  equals: body.data.customer.email,
                },
              },
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
