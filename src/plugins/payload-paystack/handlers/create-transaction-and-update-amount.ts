import e from 'express'
import { PayloadRequest } from 'payload/types'

const createTransactionAndUpdateAmount = async (
  req: PayloadRequest,
  res: e.Response<any, Record<string, any>>,
) => {
  const { payload, body, user } = req
  const { amount, status, authorization, paid_at } = body.data

  try {
    await payload.create({
      collection: 'transaction',
      data: {
        value: { body },
        amount,
        status,
        payment_method: authorization.brand,
        date: paid_at,
        user: {
          relationTo: 'users',
          value: user.id,
        },
      },
    })
  } catch (error) {
    console.log('Error while creating a transaction: ', error)
  }

  if (status === 'success' && authorization.authorization_code) {
    try {
      const { docs } = await payload.find({
        collection: 'users',
        where: {
          email: {
            equals: body.data.customer.email,
          },
        },
      })

      const user = docs.at(0)
      const userAmount = user?.amount + amount

      await payload.update({
        collection: 'users',
        id: user?.id!,
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
}

export default createTransactionAndUpdateAmount
