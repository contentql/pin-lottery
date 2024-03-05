import { useState } from 'react'
import DatePicker from 'react-datepicker'
import { BsChevronDown } from 'react-icons/bs'
import { FaCheckCircle, FaEllipsisH, FaRegCalendarAlt } from 'react-icons/fa'

import { allTransactions } from '@/data/userData'

//css
import 'react-datepicker/dist/react-datepicker.css'

const AllTransactions = () => {
  const [dateRange, setDateRange] = useState([null, null])
  const [startDate, endDate] = dateRange
  return (
    <div className='all-transaction'>
      <div className='all-transaction__header'>
        <h3 className='title'>All Transactions</h3>
        <div className='date-range'>
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update: any) => {
              setDateRange(update)
            }}
            placeholderText='min - max date'
          />
          <i>
            <FaRegCalendarAlt />
          </i>
        </div>
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
            {allTransactions.map(singleTran => (
              <tr key={singleTran.id}>
                <td>
                  <div className='date'>
                    <span>{singleTran.date}</span>
                    <span>{singleTran.month}</span>
                  </div>
                </td>
                <td>
                  <p>{singleTran.description}</p>
                  <span>{singleTran.referral}</span>
                </td>
                <td>
                  <p>{singleTran.pay_method}</p>
                </td>
                <td>
                  {singleTran.transection === 'withdraw' ? (
                    <span className='amount minus-amount'>
                      - ${singleTran.amout} (USD)
                    </span>
                  ) : (
                    <span className='amount plus-amount'>
                      + {singleTran.amout} (USD)
                    </span>
                  )}
                </td>
                <td>
                  {singleTran.status === 0 ? (
                    <div className='status-pending'>
                      <i>
                        <FaEllipsisH />
                      </i>
                    </div>
                  ) : (
                    <div className='status-success'>
                      <i>
                        <FaCheckCircle />
                      </i>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='load-more'>
        <button
          type='button'
          className='d-flex align-items-center justify-content-lg-center gap-1'
        >
          Show More Lotteries <BsChevronDown />
        </button>
      </div>
    </div>
  )
}

export default AllTransactions
