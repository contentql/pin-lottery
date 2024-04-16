import type { Config, Plugin } from 'payload/config'
import { CollectionBeforeChangeHook } from 'payload/types'
import { Paystack } from 'paystack-sdk'

import Transaction from './collections/transaction'
import createPaystackCheckoutUrl from './handlers/create-paystack-checkout-url'
import createTransactionAndUpdateAmount from './handlers/create-transaction-and-update-amount'
import { PluginTypes } from './types'

// const paystackSdk = new Paystack(String(process.env.PAYSTACK_SECRET_KEY))
const paystackSdk = new Paystack(
  'sk_test_6c2e7ca16d0d713386973b3039bfcecae37275e3',
)

const createPaystackCustomer =
  (paystackSdk: any): CollectionBeforeChangeHook =>
  async ({ operation, data }) => {
    if (operation === 'create') {
      try {
        const { data: customer } = await paystackSdk.customer.create({
          email: data.email,
          first_name: data.user_name,
          last_name: '',
          phone: data.phone_number,
        })

        data.paystack_customer_code = customer?.customer_code
      } catch (error) {
        console.log('Error creating customer', error)
      }
    }
    return data
  }

export const validatePaystackPaymentStatus = async ({
  reference,
}: {
  reference: string
}) => {
  try {
    const paymentStatus = await paystackSdk.transaction.verify(reference)

    return paymentStatus
  } catch (error) {
    console.log('Error validating paystack payment status', error)
  }
}

export const paystack =
  (pluginOptions: PluginTypes): Plugin =>
  (incomingConfig: Config): Config => {
    const paystackSdk = new Paystack(pluginOptions.secretKey)

    // @ts-ignore
    const updatedCollection = incomingConfig.collections.map(collection => {
      if (collection.slug === 'users') {
        return {
          ...collection,
          hooks: {
            ...collection.hooks,
            beforeChange: [createPaystackCustomer(paystackSdk)],
          },
          fields: [
            ...JSON.parse(JSON.stringify(collection.fields)),
            {
              name: 'amount',
              type: 'number',
              label: 'Amount',
              admin: {
                readOnly: true,
              },
              required: true,
              defaultValue: 0,
            },
            {
              name: 'paystack_customer_code',
              type: 'text',
              label: 'Paystack Customer Code',
              admin: {
                readOnly: true,
              },
            },
          ],
        }
      }

      return collection
    })

    const config: Config = {
      ...incomingConfig,
      collections: [
        ...updatedCollection,
        {
          ...Transaction,
          endpoints: [
            {
              path: '/paystack/webhook',
              method: 'post',
              handler: async (req, res) =>
                createTransactionAndUpdateAmount(req, res),
            },
            {
              path: '/paystack/create-paystack-checkout-url',
              method: 'post',
              handler: async (req, res) =>
                createPaystackCheckoutUrl(req, res, paystackSdk),
            },
          ],
        },
      ],
    }

    return config
  }
