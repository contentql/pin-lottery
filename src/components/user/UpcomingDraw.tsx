import { Contest, Ticket } from '@/payload-types'
import { splitTicketNumber } from '@/utils/split-ticket-number'
import Link from 'next/link'
import { BsChevronDown } from 'react-icons/bs'
import * as sd from 'simple-duration'

const UpcomingDraws = ({
  upcomingDrawTicketsData,
}: {
  upcomingDrawTicketsData: Ticket[]
}) => {
  console.log('data', upcomingDrawTicketsData)
  return (
    <div className='past-draw-wrapper'>
      <h3 className='title'>Upcoming Draws</h3>
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
            {upcomingDrawTicketsData?.map(ticket => {
              const date = new Date(
                (ticket?.contest_id?.value as Contest).threshold_reached_date ||
                  '1',
              )

              const milliseconds = (ticket?.contest_id?.value as Contest)
                ?.day_remain
                ? sd.parse((ticket?.contest_id?.value as Contest)?.day_remain) *
                  1000
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
        <button
          type='button'
          className='d-flex align-items-center justify-content-lg-center gap-1'>
          Show More Lotteries <BsChevronDown />
        </button>
      </div>
    </div>
  )
}

export default UpcomingDraws
