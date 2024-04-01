import Link from 'next/link'
import { BsChevronDown } from 'react-icons/bs'

import { Contest, Ticket, Winner } from '@/payload-types'
import { splitTicketNumber } from '@/utils/split-ticket-number'

const PastDraws = ({
  pastDrawsTicketsData,
}: {
  pastDrawsTicketsData: Ticket[]
}) => {
  return (
    <div className='past-draw-wrapper'>
      <h3 className='title'>Past Draws</h3>
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
            {pastDrawsTicketsData?.map(ticket => {
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
        <button
          type='button'
          className='d-flex align-items-center justify-content-lg-center gap-1'>
          Show More Lotteries <BsChevronDown />
        </button>
      </div>
    </div>
  )
}

export default PastDraws
