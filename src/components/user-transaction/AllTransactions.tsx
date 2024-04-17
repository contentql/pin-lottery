// skipcql JS-0415
import AllTransactionsSkeleton from '../skeletons/TransactionsSkeleton'
import Image from 'next/image'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'
import { FaCheckCircle, FaEllipsisH, FaRegCalendarAlt } from 'react-icons/fa'

import { trpc } from '@/trpc/client'
import { DateConverter } from '@/utils/date-converter'
//css
import { ticketsMetadata } from '@/utils/tickets-metadata'

const EmptyState = () => {
  return (
    <div className='all-transaction'>
      <div>
        <h3 className='transactions-empty-heading'>All Transactions</h3>
        <div className='wishlist-button-center'>
          <Image
            src='/images/empty-states/empty-wishlist.png'
            alt='empty state'
            width={500}
            height={300}
          />
        </div>
      </div>
    </div>
  )
}

const AllTransactions = () => {
  const { data: userTransactions, isPending: isUserTransactionsPending } =
    trpc.transaction.getUserTransactions.useQuery()

  const [dateRange, setDateRange] = useState([null, null])
  const [startDate, endDate] = dateRange

  const [currentPage, setCurrentPage] = useState(1)
  const transactionsToShow = 10

  const indexOfLastTransaction = currentPage * transactionsToShow
  const currentTransactions = userTransactions?.slice(0, indexOfLastTransaction)

  const handleShowMore = () => {
    setCurrentPage((next: number) => next + 1)
  }
  const handleShowLess = () => {
    setCurrentPage(1)
  }
  return (
    <div>
      {isUserTransactionsPending ? (
        <AllTransactionsSkeleton />
      ) : userTransactions?.length! <= 0 ? (
        <EmptyState />
      ) : (
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
                {currentTransactions?.map(singleTran => (
                  <tr key={singleTran.id}>
                    <td>
                      <div className='date'>
                        <span>
                          {DateConverter(singleTran?.date!).slice(
                            DateConverter(singleTran?.date!).indexOf(' ') + 1,
                          )}
                        </span>
                      </div>
                    </td>
                    <td>
                      <p>{singleTran.type_of_transaction}</p>
                      <span>Bank account to lottery Account</span>
                    </td>
                    <td>
                      <p>{singleTran.payment_method}</p>
                    </td>
                    <td>
                      {singleTran.type_of_transaction === 'withdraw' ? (
                        <span className='amount minus-amount'>
                          - ${singleTran.amount} (
                          {ticketsMetadata?.currencyCode})
                        </span>
                      ) : (
                        <span className='amount plus-amount'>
                          + {singleTran.amount} ({ticketsMetadata?.currencyCode}
                          )
                        </span>
                      )}
                    </td>
                    <td>
                      {singleTran.status === '' ? (
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
            {userTransactions?.length! <= indexOfLastTransaction ? (
              <button
                type='button'
                className='d-flex align-items-center justify-content-lg-center gap-1'></button>
            ) : indexOfLastTransaction >= userTransactions?.length! ? (
              <button
                onClick={handleShowLess}
                type='button'
                className='d-flex align-items-center justify-content-lg-center gap-1'>
                Show Less Lotteries <BsChevronUp />
              </button>
            ) : (
              <button
                onClick={handleShowMore}
                type='button'
                className='d-flex align-items-center justify-content-lg-center gap-1'>
                Show More Lotteries <BsChevronDown />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default AllTransactions
