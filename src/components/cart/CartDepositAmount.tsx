import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ImSpinner } from 'react-icons/im'

import { createPaystackCheckoutUrl } from '@/queries/transactions/deposit'

interface Inputs {
  depositAmount: number
}

function CartDepositAmount() {
  const [loading, setLoading] = useState(false)
  const {
    formState: { errors },
    register,
    setValue,
    handleSubmit,
  } = useForm<Inputs>()
  const router = useRouter()

  const onsubmit = async (data: Inputs) => {
    const { depositAmount } = data
    setLoading(true)
    try {
      const url = await createPaystackCheckoutUrl(data)
      setLoading(false)
      router.push(url)
    } catch (error) {
      setLoading(false)
      console.log('Error occurred: ', error)
    }
  }

  return (
    <div>
      <details>
        {/* <summary>
          <button type='button' className='cmn-btn'>
            Add Amount
          </button>
          <div className='details-modal-overlay'></div>
        </summary> */}
        <summary>
          <div className='transaction-action-btn '>
            <span className='cmn-btn'>Add Amount</span>
          </div>
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
                fillRule='evenodd'
                clipRule='evenodd'
                d='M13.7071 1.70711C14.0976 1.31658 14.0976 0.683417 13.7071 0.292893C13.3166 -0.0976311 12.6834 -0.0976311 12.2929 0.292893L7 5.58579L1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L5.58579 7L0.292893 12.2929C-0.0976311 12.6834 -0.0976311 13.3166 0.292893 13.7071C0.683417 14.0976 1.31658 14.0976 1.70711 13.7071L7 8.41421L12.2929 13.7071C12.6834 14.0976 13.3166 14.0976 13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929L8.41421 7L13.7071 1.70711Z'
                fill='black'
              />
            </svg>
          </div>
          <div className='details-modal-title'>
            <h1 className='modal-heading'>Amount Deposit</h1>
          </div>
          <div className='details-modal-content'>
            <form onSubmit={handleSubmit(onsubmit)} noValidate>
              <label htmlFor='amount'>Enter Amount</label>
              <input
                required
                type='number'
                id='depositAmount'
                placeholder='Enter amount to add'
                {...register('depositAmount', {
                  required: 'Please enter amount to add',
                })}
              />
              {errors?.depositAmount && (
                <p style={{ color: 'red', paddingBottom: '4px' }}>
                  {errors?.depositAmount?.message}
                </p>
              )}
              <button type='submit' className='add-amount-button cmn-btn'>
                {loading ? (
                  <ImSpinner
                    size={22}
                    style={{
                      animation: 'rotateAnimation 2s linear infinite',
                    }}
                  />
                ) : (
                  'Add'
                )}
              </button>
            </form>
          </div>
        </div>
      </details>
    </div>
  )
}

export default CartDepositAmount
