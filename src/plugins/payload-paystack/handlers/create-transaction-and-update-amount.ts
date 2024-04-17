import e from 'express'
import { PayloadRequest } from 'payload/types'

const createTransactionAndUpdateAmount = async (
  req: PayloadRequest,
  res: e.Response<any, Record<string, any>>,
) => {
  const { payload, body } = req
  const { amount, status, authorization, paid_at } = body.data

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

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    try {
      await payload.create({
        collection: 'transaction',
        data: {
          value: { ...body },
          amount,
          status,
          payment_method: authorization.brand,
          type_of_transaction: 'deposit',
          date: paid_at,
          user: {
            relationTo: 'users',
            value: user.id,
          },
        },
      })
    } catch (error) {
      return res.status(500).json({ error })
    }

    if (status === 'success' && authorization.authorization_code) {
      try {
        const userAmount = user.amount + amount / 100

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
        return res.status(500).json({ error })
      }
    }
  } catch (error) {
    return res.status(500).json({ error })
  }

  return res.status(200).json({ status: true })
}

export default createTransactionAndUpdateAmount
