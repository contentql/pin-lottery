interface Inputs {
    name : string;
    account_number : string;
    amount : number;
  }
  
  export async function initializeTransfer(
    data: Inputs,
    bank : Record<string, string>
    // pathname: string,
  ): Promise<string> {
    const {name,account_number,amount} = data
    const {type, code : bank_code, currency} = bank
    try {
    //   localStorage.setItem('route', pathname)
      const response = await fetch(
        '/api/transaction/paystack/initialize-transfer',
        {
          method: 'post',
          body: JSON.stringify({
            type,
            name,
            account_number,
            bank_code,
            currency,
            amount,
          }),
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
  
      const { data: responseData } = await response.json()
  
      return responseData
    } catch (error) {
      console.log('Error while creating paystack checkout url: ', error)
      throw error
    }
  }
  