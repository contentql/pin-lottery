import e from 'express'
import { PayloadRequest } from 'payload/types'

const initializeTransfer = async (
  req: PayloadRequest,
  res: e.Response<any, Record<string, any>>,
  paystackSdk: any,
) => {
  const { body } = req

  const { account_number, type, bank_code, currency, amount } = body

  console.log('request', req)

  const validateAccount = await paystackSdk.verification.resolveAccount({
    account_number: account_number,
    bank_code: bank_code,
  })

  if (validateAccount?.status && validateAccount.data?.account_name) {
    const createTransferRecipient = await paystackSdk.recipient.create({
      account_number: account_number,
      bank_code: bank_code,
      name: `${validateAccount?.data.account_name}`,
      currency: currency,
      description: 'withdraw',
      type: type,
    })

    const { status, data, message } = createTransferRecipient

    if (status && createTransferRecipient?.data?.recipient_code) {
      const createTransfer = await paystackSdk.transfer.initiate({
        amount: 2000,
        source: 'balance',
        recipient: createTransferRecipient?.data?.recipient_code,
      })

      return res.status(200).json({ ...createTransfer })
    }

    return res.status(401).json({ ...createTransferRecipient })
  }

  return res.status(406).json({ ...validateAccount })
}

export default initializeTransfer
