import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'
import { FaAngleLeft } from 'react-icons/fa'

import { Contest, Ticket, Winner } from '@/payload-types'
import { splitTicketNumber } from '@/utils/split-ticket-number'

const PastDraws = ({
  pastDrawsTicketsData,
}: {
  pastDrawsTicketsData: Ticket[]
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const ticketsToShow = 10

  const indexOfLastTicket = currentPage * ticketsToShow
  const currentTickets = pastDrawsTicketsData?.slice(0, indexOfLastTicket)

  const handleShowMore = () => {
    setCurrentPage((next: number) => next + 1)
  }
  const handleShowLess = () => {
    setCurrentPage(1)
  }
  return (
    <div className='past-draw-wrapper'>
      <h3 className='title'>Past Draws</h3>
      {pastDrawsTicketsData.length <= 0 ? (
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
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {currentTickets?.map(ticket => {
                  const winningTicket = (
                    (ticket?.contest_id?.value as Contest)?.winner_ticket
                      ?.value as Winner
                  )?.ticket?.value as Ticket

                  const winStatus =
                    winningTicket?.ticket_number === ticket?.ticket_number

                  return (
                    <tr key={ticket?.id}>
                      <td>
                        <span className='date'>
                          {winningTicket?.createdAt
                            ? new Date(winningTicket?.createdAt)
                                .toISOString()
                                .split('T')[0]
                            : 'N/A'}
                        </span>
                      </td>
                      <td>
                        <Link
                          href={`/contest/${(ticket?.contest_id?.value as Contest)?.id}`}
                          className='contest-no'>
                          {(ticket?.contest_id?.value as Contest)?.contest_no}
                        </Link>
                      </td>
                      <td>
                        <ul
                          className={`number-list ${winStatus ? 'win-list' : ''}`}>
                          {splitTicketNumber(ticket?.ticket_number).map(
                            (num: string, idx: number) => (
                              <li key={idx}>{num}</li>
                            ),
                          )}
                        </ul>
                      </td>
                      <td>
                        {winStatus ? (
                          <span className='win'>Win</span>
                        ) : (
                          <span className='fail'>No Win</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className='load-more'>
            {pastDrawsTicketsData?.length! <= ticketsToShow ? (
              <button
                type='button'
                className='d-flex align-items-center justify-content-lg-center gap-1'></button>
            ) : indexOfLastTicket >= pastDrawsTicketsData?.length ? (
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
        </>
      )}
    </div>
  )
}

export default PastDraws
