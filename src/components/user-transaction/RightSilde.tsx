import AllTransactions from './AllTransactions'
import Balance from './Balance'

const RightSilde = () => {
  return (
    <div className='col-lg-8 mt-lg-0 mt-4'>
      {/* Balance here      */}
      <Balance />

      {/* All Transactions */}
      <AllTransactions />
    </div>
  )
}

export default RightSilde
