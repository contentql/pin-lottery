import { useContext } from 'react'
import Countdown from 'react-countdown'

import { AppContext } from '@/context/context'
import { Contest } from '@/payload-types'
import { isThresholdReached } from '@/utils/is-threshold-reached'
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
  const { tickets, removeAllTicketsWithToast, mergeTickets }: any =
    useContext(AppContext)

  const totalTicketsSold = tickets?.length
  const totalTickets = tickets?.length

  const quickAdds = ticketsMetadata?.quickAdds
  const minTickets = ticketsMetadata?.minTickets

  return (
    <div className='action-header'>
      <div className='left'>
        <ul>
          {quickAdds?.map(quickAdd => (
            <li key={quickAdd?.id}>
              <a href='#0' onClick={() => mergeTickets(quickAdd?.tickets)}>
                +{quickAdd?.tickets} Tickets
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className='right'>
        <ul>
          {isThresholdReached(
            contestDetails?.product_price,
            contestDetails?.ticket_price,
            totalTicketsSold,
          ) ? (
            <li>
              <i className='las la-clock'></i>
              <div className='clock2'>
                <Countdown date={Date.now() + 1000000000} renderer={renderer} />
              </div>
            </li>
          ) : (
            ''
          )}

          {totalTickets > minTickets && (
            <li>
              <button type='button' onClick={() => removeAllTicketsWithToast()}>
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
