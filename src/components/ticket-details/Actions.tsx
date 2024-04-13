import { useContext } from 'react'
import Countdown from 'react-countdown'
import * as sd from 'simple-duration'

import { AppContext } from '@/context/context'
import { Contest } from '@/payload-types'
import { ticketsMetadata } from '@/utils/tickets-metadata'

const renderer = ({ hours, minutes, seconds, days }: any) => {
  return (
    <>
      <div>
        <span>{days}</span>
        <p>d</p>
      </div>
      <div>
        <span>{hours}</span>
        <p>h</p>
      </div>
      <div>
        <span>{minutes}</span>
        <p>m</p>
      </div>
      <div>
        <span>{seconds}</span>
        <p>s</p>
      </div>
    </>
  )
}

const Actions = ({ contestDetails }: { contestDetails: Contest }) => {
  const {
    totalTicketsCount,
    removeAllTicketsWithToast,
    addTicketsToExistingTickets,
  } = useContext(AppContext)

  const totalTickets = totalTicketsCount({
    contest_no: contestDetails?.contest_no,
  })

  const quickAdds = ticketsMetadata?.quickAdds
  const minTickets = ticketsMetadata?.minTickets

  const milliseconds = contestDetails?.day_remain
    ? sd.parse(contestDetails?.day_remain) * 1000
    : 1

  return (
    <div className='action-header'>
      <div className='left'>
        <ul>
          {quickAdds?.map(quickAdd => (
            <li key={quickAdd?.id}>
              <a
                href='#0'
                onClick={() =>
                  addTicketsToExistingTickets({
                    contest_no: contestDetails?.contest_no,
                    numTicketsToAdd: quickAdd?.tickets,
                  })
                }
              >
                +{quickAdd?.tickets} Tickets
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className='right'>
        <ul>
          {!!contestDetails?.reached_threshold &&
          !!contestDetails?.threshold_reached_date &&
          !contestDetails?.contest_status ? (
            <li>
              <i className='las la-clock'></i>
              <div className='clock2'>
                <Countdown
                  date={
                    Date.parse(contestDetails?.threshold_reached_date) +
                    milliseconds
                  }
                  renderer={renderer}
                />
              </div>
            </li>
          ) : (
            ''
          )}

          {totalTickets > minTickets && (
            <li>
              <button
                type='button'
                onClick={() =>
                  removeAllTicketsWithToast({
                    contest_no: contestDetails?.contest_no,
                  })
                }
              >
                <i className='las la-trash'></i>
                <span>Erase All</span>
              </button>
            </li>
          )}
          <li className='d-none'>
            <button type='button'>
              <i className='las la-table'></i>
              <span>Quick Pick All</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Actions
