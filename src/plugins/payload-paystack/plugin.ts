import type { Config, Plugin } from 'payload/config'
import { CollectionAfterOperationHook } from 'payload/types'
import { Paystack } from 'paystack-sdk'

import Transaction from './collections/transaction'

const paystackSdk = new Paystack(
  'sk_test_6c2e7ca16d0d713386973b3039bfcecae37275e3',
)

const createPaystackCustomer: CollectionAfterOperationHook = async ({
  operation,
  result,
}: {
  operation: string
  result: any
}) => {
  if (operation === 'create') {
    try {
      const customer = await paystackSdk.customer.create({
        email: result.email,
        first_name: result.user_name,
        last_name: 'sum',
        phone: result.phone_number,
      })
    } catch (error) {
      console.log('Error creating customer', error)
    }
  }

  // if (operation === 'delete') {
  //   console.log('removing user from paystack')
  // }
  return result
}

export const createPaystackCheckoutUrl = async (
  userEmail: string | undefined,
  depositAmount: string,
) => {
  try {
    const checkout = await paystackSdk.transaction.initialize({
      amount: depositAmount,
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

//Widhdraw Payment

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

export const paystack: Plugin = (incomingConfig: Config): Config => {
  // @ts-ignore
  const updatedCollection = incomingConfig.collections.map(collection => {
    if (collection.slug === 'users') {
      return {
        ...collection,
        hooks: {
          ...collection.hooks,
          afterOperation: [createPaystackCustomer],
        },
      }
    }

    return collection
  })

  const config = {
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
