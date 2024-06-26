import { PluginTypes } from '../types'
import e from 'express'
import { PayloadRequest } from 'payload/types'

const createPaystackCheckoutUrl = async (
  req: PayloadRequest,
  res: e.Response<any, Record<string, any>>,
  paystackSdk: any,
  pluginOptions: PluginTypes,
) => {
  const { body, user } = req
  const { frontend_url } = pluginOptions

  const checkout = await paystackSdk.transaction.initialize({
    amount: String(Number(body.depositAmount) * 100),
    email: user.email,
    callback_url: `${frontend_url}/${body.callback_url}`,
  })

  if (!checkout.status) {
    return res.status(406).json({ ...checkout })
  }

  return res.status(200).json({ ...checkout })
}

export default createPaystackCheckoutUrl
