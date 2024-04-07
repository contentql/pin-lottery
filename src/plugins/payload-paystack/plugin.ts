import type { Config, Plugin } from 'payload/config'
import { CollectionAfterOperationHook } from 'payload/types'
import Transaction from './collections/transaction'

import { Paystack } from 'paystack-sdk'

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
    console.log('adding user to paystack')
    console.log('result', result)
    try {
      const customer = await paystackSdk.customer.create({
        email: result.email,
        first_name: result.user_name,
        last_name: 'sum',
        phone: result.phone_number,
      })
      console.log(customer)
    } catch (error) {
      console.log('Error creating customer', error)
    }
  }

  if (operation === 'delete') {
    console.log('removing user from paystack')
  }
  return result
}

export const createPaystackCheckoutUrl = async (
  userEmail: string | undefined,
) => {
  try {
    const checkout = await paystackSdk.transaction.initialize({
      amount: '2000',
      email: userEmail!,
    })
    console.log('checkout', checkout)
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
    console.log('payment', paymentStatus)
    return paymentStatus
  } catch (error) {
    console.log('Error validating paystack payment status', error)
  }
}

export const paystack: Plugin = (incomingConfig: Config): Config => {
  // find the user collection
  // once you find the user collection add a new hook to it
  // example would be create a console.log() of the existing data
  // once it is clear, ensure you trigger paystack api to create new customer

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
