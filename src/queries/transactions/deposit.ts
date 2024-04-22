interface Inputs {
  depositAmount: number
}

export async function createPaystackCheckoutUrl(data: Inputs): Promise<string> {
  const { depositAmount } = data
  try {
    const response = await fetch(
      '/api/transaction/paystack/create-paystack-checkout-url',
      {
        method: 'post',
        body: JSON.stringify({
          depositAmount,
          callback_url: 'user-transaction',
        }),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const { data: responseData } = await response.json()
    return responseData?.authorization_url || '/user-transaction'
  } catch (error) {
    console.log('Error while creating paystack checkout url: ', error)
    throw error
  }
}
