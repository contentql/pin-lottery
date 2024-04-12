import { useAuth } from '@/providers/Auth'
import DepositAmount from './DepositAmount'
import WithdrawAmount from './WithdrawAmount'

const Balance = () => {
  const { user } = useAuth()
  return (
    <div className='transaction-balance-wrapper'>
      <div className='left'>
        <div className='transaction-balance'>
          <h4 className='balance'>{user?.amount}</h4>
          <span>Available Balance</span>
        </div>
      </div>
      <div className='right'>
        <DepositAmount />
        <div className=' ms-4'>
          <WithdrawAmount />
        </div>
      </div>
    </div>
  )
}

export default Balance
