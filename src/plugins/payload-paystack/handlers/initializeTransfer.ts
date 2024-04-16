export const initializeTransfer = async () => {
  // try {
  //   const validateAccount = await paystackSdk.verification.resolveAccount({
  //     account_number: '0001234567',
  //     bank_code: '058',
  //   })
  //   if (validateAccount?.status && validateAccount.data?.account_name) {
  //     const createTransferRecipient = await paystackSdk.recipient.create({
  //       account_number: '0001234567',
  //       bank_code: '058',
  //       name: `${validateAccount?.data.account_name}`,
  //       currency: 'NGN',
  //       description: 'withdraw',
  //       type: 'nuban',
  //     })
  //     const { status, data, message } = createTransferRecipient
  //     if (status && createTransferRecipient?.data?.recipient_code) {
  //       const createTransfer = await paystackSdk.transfer.initiate({
  //         amount: 2000,
  //         source: 'balance',
  //         recipient: createTransferRecipient?.data?.recipient_code,
  //       })
  //       return createTransfer
  //     }
  //   }
  // } catch (error) {
  //   console.log('error', error)
  // }
}
