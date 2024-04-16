import e from 'express'
import { PayloadRequest } from 'payload/types'

const validatePaystackPaymentStatus = async (
  req: PayloadRequest,
  res: e.Response<any, Record<string, any>>,
  paystackSdk: any,
) => {
  const { body } = req

  const paymentStatus = await paystackSdk.transaction.verify(body.reference)

  if (!paymentStatus.status) {
    res.status(401).json({ ...paymentStatus })
  } else {
    res.status(200).json({ ...paymentStatus })
  }
}

export default validatePaystackPaymentStatus
