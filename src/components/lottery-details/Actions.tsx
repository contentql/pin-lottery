import { useContext } from 'react'
import Countdown from 'react-countdown'

import { AppContext } from '@/context/context'

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

const Actions = () => {
  const { clearAllTicketTwo }: any = useContext(AppContext)

  return (
    <div className='action-header'>
      <div className='left'>
        <ul>
          <li>
            <a href='#0'>5 Tickets</a>
          </li>
          <li>
            <a href='#0'>10 Tickets</a>
          </li>
          <li>
            <a href='#0'>15 Tickets</a>
          </li>
          <li>
            <a href='#0'>20 Tickets</a>
          </li>
        </ul>
      </div>
      <div className='right'>
        <ul>
          <li>
            <i className='las la-clock'></i>
            <div className='clock2'>
              <Countdown date={Date.now() + 1000000000} renderer={renderer} />
            </div>
          </li>
          <li>
            <button type='button' onClick={clearAllTicketTwo}>
              <i className='las la-trash'></i>
              <span>Erase All</span>
            </button>
          </li>
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
