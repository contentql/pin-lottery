import e from 'express'
import { PayloadRequest } from 'payload/types'

const createPaystackCheckoutUrl = async (
  req: PayloadRequest,
  res: e.Response<any, Record<string, any>>,
  paystackSdk: any,
) => {
  const { body, user } = req

  console.log(body)

  const checkout = await paystackSdk.transaction.initialize({
    amount: String(Number(body.depositAmount) * 100),
    email: user.email,
  })

  if (!checkout.status) res.status(401).json({ ...checkout })
  else res.status(200).json({ ...checkout })
}

export default createPaystackCheckoutUrl
