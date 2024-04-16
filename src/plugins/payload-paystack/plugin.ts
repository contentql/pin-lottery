import type { Config, Plugin } from 'payload/config'
import { CollectionBeforeChangeHook } from 'payload/types'
import { Paystack } from 'paystack-sdk'

import Transaction from './collections/transaction'
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

    // if (operation === 'delete') {
    //   console.log('removing user from paystack')
    // }
    return data
  }

export const createPaystackCheckoutUrl = async (
  userEmail: string | undefined,
  depositAmount: string,
) => {
  try {
    const checkout = await paystackSdk.transaction.initialize({
      amount: String(Number(depositAmount) * 100),
      email: userEmail!,
    })

    return checkout
  } catch (error) {
    console.log('Error creating paystack checkout url', error)
  }
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

// Withdraw Payment

export const initializeTransfer = async () => {
  try {
    const validateAccount = await paystackSdk.verification.resolveAccount({
      account_number: '0001234567',
      bank_code: '058',
    })

    if (validateAccount?.status && validateAccount.data?.account_name) {
      const createTransferRecipient = await paystackSdk.recipient.create({
        account_number: '0001234567',
        bank_code: '058',
        name: `${validateAccount?.data.account_name}`,
        currency: 'NGN',
        description: 'withdraw',
        type: 'nuban',
      })

      const { status, data, message } = createTransferRecipient

      if (status && createTransferRecipient?.data?.recipient_code) {
        const createTransfer = await paystackSdk.transfer.initiate({
          amount: 2000,
          source: 'balance',
          recipient: createTransferRecipient?.data?.recipient_code,
        })

        return createTransfer
      }
    }
  } catch (error) {
    console.log('error', error)
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
        },
      ],
    }

    return config
  }
