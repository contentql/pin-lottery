interface Inputs {
  depositAmount: number
}

export async function createPaystackCheckoutUrl(
  data: Inputs,
  pathname: string,
): Promise<string> {
  const { depositAmount } = data
  try {
    localStorage.setItem('route', pathname)
    const response = await fetch(
      '/api/transaction/paystack/create-paystack-checkout-url',
      {
        method: 'post',
        body: JSON.stringify({
          depositAmount,
          callback_url: 'success',
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
