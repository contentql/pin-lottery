import 'react-datepicker/dist/react-datepicker.css'
import { BsChevronDown } from 'react-icons/bs'

//css

const AllTransactionsSkeleton = () => {
  return (
    <div className='all-transaction'>
      <div className='all-transaction__header'>
        <h3 className='title'>All Transactions</h3>
      </div>
      <div className='table-responsive-xl'>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Pay. method</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4].map((_, index) => {
              return (
                <tr className='ticket-isloading' key={index}>
                  <td>
                    <span className='loading-btn'></span>
                  </td>
                  <td>
                    <span className='loading-btn'></span>
                  </td>
                  <td>
                    <ul className='loading-btn'></ul>
                  </td>
                  <td>
                    <span className='loading-btn'></span>
                  </td>
                  <td>
                    <span className='loading-btn'></span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className='load-more'>
        <button
          type='button'
          className='d-flex align-items-center justify-content-lg-center gap-1'>
          Show More Lotteries <BsChevronDown />
        </button>
      </div>
    </div>
  )
}

export default AllTransactionsSkeleton
