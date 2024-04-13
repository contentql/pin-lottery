import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'
import { FaAngleLeft } from 'react-icons/fa'
import * as sd from 'simple-duration'

import { Contest, Ticket } from '@/payload-types'
import { splitTicketNumber } from '@/utils/split-ticket-number'

const UpcomingDraws = ({
  upcomingDrawTicketsData,
}: {
  upcomingDrawTicketsData: Ticket[]
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const ticketsToShow = 10

  const indexOfLastTicket = currentPage * ticketsToShow
  const currentTickets = upcomingDrawTicketsData?.slice(0, indexOfLastTicket)
  const handleShowMore = () => {
    setCurrentPage((next: number) => next + 1)
  }
  const handleShowLess = () => {
    setCurrentPage(1)
  }
  return (
    <div className='past-draw-wrapper'>
      <h3 className='title'>Upcoming Draws</h3>
      {upcomingDrawTicketsData.length <= 0 ? (
        <div className='wishlist-button-center'>
          <div className='cart-empty-image'>
            <Image
              src='/images/empty-states/empty-cart.png'
              alt='empty wishlist'
              width={400}
              height={400}
            />
          </div>
          <Link className='cmn-btn text-capitalize ' href='/contest'>
            <span>
              <FaAngleLeft
                size={18}
                color='white'
                style={{ marginRight: '20px' }}
              />
            </span>
            go to Contests
          </Link>
        </div>
      ) : (
        <>
          <div className='table-responsive-lg'>
            <table>
              <thead>
                <tr>
                  <th>Draw</th>
                  <th>Contest No</th>
                  <th>Result</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {currentTickets?.map(ticket => {
                  const date = new Date(
                    (ticket?.contest_id?.value as Contest)
                      .threshold_reached_date || '1',
                  )

                  const milliseconds = (ticket?.contest_id?.value as Contest)
                    ?.day_remain
                    ? sd.parse(
                        (ticket?.contest_id?.value as Contest)?.day_remain,
                      ) * 1000
                    : 1

                  const winnerAnnoucingDate = new Date(
                    date.getTime() + milliseconds,
                  )
                    .toISOString()
                    .split('T')[0]

                  return (
                    <tr key={ticket?.id}>
                      <td>
                        <span className='date'>
                          {(ticket?.contest_id?.value as Contest)
                            ?.threshold_reached_date
                            ? winnerAnnoucingDate
                            : 'Coming soon'}
                        </span>
                      </td>
                      <td>
                        <Link
                          href={`/contest/${(ticket?.contest_id?.value as Contest)?.id}`}
                          className='contest-no'
                        >
                          {(ticket?.contest_id?.value as Contest)?.contest_no}
                        </Link>
                      </td>
                      <td>
                        <ul className={`number-list`}>
                          {splitTicketNumber(ticket?.ticket_number).map(
                            (num: string, idx: number) => (
                              <li key={idx}>{num}</li>
                            ),
                          )}
                        </ul>
                      </td>
                      <td>
                        <span>
                          {(ticket?.contest_id?.value as Contest)?.ticket_price}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className='load-more'>
            {indexOfLastTicket >= upcomingDrawTicketsData?.length ? (
              upcomingDrawTicketsData.length > ticketsToShow && (
                <button
                  onClick={handleShowLess}
                  type='button'
                  className='d-flex align-items-center justify-content-lg-center gap-1'
                >
                  Show Less Lotteries <BsChevronUp />
                </button>
              )
            ) : (
              <button
                onClick={handleShowMore}
                type='button'
                className='d-flex align-items-center justify-content-lg-center gap-1'
              >
                Show More Lotteries <BsChevronDown />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default UpcomingDraws
