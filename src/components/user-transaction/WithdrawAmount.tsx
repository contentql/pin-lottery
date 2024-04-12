import { useAuth } from '@/providers/Auth'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import transaction_1 from '/public/images/icon/transaction/1.png'

function WithdrawAmount() {
  const [banks, setBanks] = useState([])
  const {
    formState: { errors },
    register,
    setValue,
    handleSubmit,
  } = useForm({
    defaultValues: {
      type: '',
      name: '',
      account_number: '',
      bank_code: '',
      currency: '',
      amount: '',
    },
  })
  const router = useRouter()
  const searchParams = useSearchParams()

  const { user } = useAuth()

  const onsubmit = async (data: any) => {
    // const url = await createPaystackCheckoutUrl(
    //   user?.email,
    //   data?.depositAmount,
    // )
    // console.log('url', url)
    // await router.push(url?.data?.authorization_url || '/user-transaction')
    // const reference = searchParams.get('reference')
    // console.log('reference', reference)
    // if (reference) {
    //   const paymentStatus = await validatePaystackPaymentStatus({
    //     reference,
    //   })
    //   console.log('paymentStatus', paymentStatus)
    // }
  }
  const fetchBanks = async (country: string) => {
    const details = await fetch(
      `https://api.paystack.co/bank?currency=${country}`,
    )
    const result = await details.json()
    setBanks(result.data)
    return result.data
  }
  //   const { data: BankDetails, isPending: isUserDataPending } = useQuery({
  //     queryKey: ['/api/country/banks', 'get'],
  //     queryFn: async () => await fetchBanks('NGN'),
  //   })
  //   console.log('query', BankDetails)

  return (
    <div className='transaction-action-btn'>
      <Image src={transaction_1} alt='transaction 1' />
      <div className='container-modal'>
        <details>
          <summary>
            <span>Withdraw</span>
            <div className='details-modal-overlay'></div>
          </summary>
          <div className='details-modal'>
            <div className='details-modal-close'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='14'
                height='14'
                viewBox='0 0 14 14'
                fill='none'>
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M13.7071 1.70711C14.0976 1.31658 14.0976 0.683417 13.7071 0.292893C13.3166 -0.0976311 12.6834 -0.0976311 12.2929 0.292893L7 5.58579L1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L5.58579 7L0.292893 12.2929C-0.0976311 12.6834 -0.0976311 13.3166 0.292893 13.7071C0.683417 14.0976 1.31658 14.0976 1.70711 13.7071L7 8.41421L12.2929 13.7071C12.6834 14.0976 13.3166 14.0976 13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929L8.41421 7L13.7071 1.70711Z'
                  fill='black'
                />
              </svg>
            </div>
            <div className='details-modal-title'>
              <h1 className='modal-heading'>Amount Withdraw</h1>
            </div>
            <div className='details-modal-content'>
              <form onSubmit={handleSubmit(onsubmit)} noValidate>
                <label htmlFor='amount'>Country</label>
                <div className='select border rounded-border'>
                  <select
                    className='border-0 select-input-style'
                    onChange={e => {
                      fetchBanks(e.target.value)
                    }}>
                    <option value={'select'}>Select country</option>
                    <option value={'NGN'}>Nagira</option>
                    <option value={'USA'}>USA</option>
                  </select>
                </div>
                <label htmlFor='amount'>Select Bank</label>
                <div className='select border rounded-border'>
                  <select className='border-0 select-input-style' required>
                    <option value={'select'}>Select Bank</option>
                    {banks?.flatMap((bank: any, index: any) => (
                      <option key={index} value={bank?.type}>
                        {bank?.name}
                      </option>
                    ))}
                  </select>
                </div>
                <label htmlFor='amount'>Enter User Name</label>
                <input
                  required
                  type='number'
                  id='name'
                  placeholder='Enter amount to add'
                  {...register('name', {
                    required: 'Please enter name',
                  })}
                />
                <label htmlFor='amount'>Account Number</label>
                <input
                  required
                  type='text'
                  id='account_number'
                  placeholder='Enter amount to add'
                  {...register('account_number', {
                    required: 'Please enter amount add',
                  })}
                />
                <label htmlFor='amount'>Enter Amount</label>
                <input
                  required
                  type='number'
                  id='type'
                  placeholder='Enter amount to add'
                  {...register('type', {
                    required: 'Please enter amount add',
                  })}
                />
                {errors?.type && (
                  <p style={{ color: 'red', paddingBottom: '4px' }}>
                    {errors?.type?.message}
                  </p>
                )}
                <button type='submit' className='add-amount-button cmn-btn'>
                  Withdraw
                </button>
              </form>
            </div>
          </div>
        </details>
      </div>
    </div>
  )
}

export default WithdrawAmount
