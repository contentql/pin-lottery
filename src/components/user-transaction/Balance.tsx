import Image from 'next/image'
import { createPaystackCheckoutUrl } from '../../plugins/payload-paystack'

import { useAuth } from '@/providers/Auth'
import { useRouter, useSearchParams } from 'next/navigation'
import transaction_1 from '/public/images/icon/transaction/1.png'
import transaction_2 from '/public/images/icon/transaction/2.png'

const Balance = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const { user } = useAuth()

  const handleAdd = async () => {
    const url = await createPaystackCheckoutUrl(user?.email)
    console.log('url', url)

    await router.push(url?.data?.authorization_url || '/user-transaction')
    const reference = searchParams.get('reference')
    console.log('reference', reference)

    // if (reference) {
    //   const paymentStatus = await validatePaystackPaymentStatus({
    //     reference,
    //   })
    //   console.log('paymentStatus', paymentStatus)
    // }
  }

  return (
    <div className='transaction-balance-wrapper'>
      <div className='left'>
        <div className='transaction-balance'>
          <h4 className='balance'>$2956.00</h4>
          <span>Available Balance</span>
        </div>
      </div>
      <div className='right'>
        <a href='#0' className='transaction-action-btn'>
          <Image src={transaction_1} alt='transaction 1' />

          <span>Deposit</span>
          <button onClick={() => handleAdd()}>Add</button>
        </a>
        <a href='#0' className='transaction-action-btn ms-4'>
          <Image src={transaction_2} alt='transaction 2' />

          <span>Withdraw</span>
        </a>
      </div>
    </div>
  )
}

export default Balance
