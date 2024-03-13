import { useContext } from 'react'
import { FaTimes } from 'react-icons/fa'

import { AppContext } from '@/context/context'

const SingleLotteryCard = ({ itm, i }: any) => {
  const {
    removeTicket,
    pickNumbr,
    luckyNumbr,
    checkActive,
    addQuickPick,
    clearTicket,
  }: any = useContext(AppContext)

  return (
    <div className='lottery-single style--two'>
      <button
        className='lottery-single__close'
        onClick={() => removeTicket(itm.id)}>
        <FaTimes />
      </button>
      <div className='lottery-single__header'>
        <div className='top'>
          <span className='titcket-number'>Ticket #{i + 1}</span>
          <ul>
            <li>
              <button className='gap-1' onClick={() => addQuickPick(itm.id)}>
                <i className='las la-table'></i>
                <span>Quick Pick</span>
              </button>
            </li>
            <li>
              <button onClick={() => clearTicket(itm.id)}>
                <i className='las la-trash'></i>
              </button>
            </li>
          </ul>
        </div>
        <ul className='lottery-single__selected-number justify-content-center'>
          {[...Array(7)].map((_, i) => (
            <li key={i} className={itm.ticket[i] ? 'active' : ''}>
              {itm.ticket[i] || '00'}
            </li>
          ))}
        </ul>
      </div>
      <div className='lottery-single__body'>
        <p className='text-white mb-2'>Select 5 numbers</p>
        <ul className='lottery-single__number'>
          {[...Array(50)].map((_, i) => (
            <li
              key={i}
              onClick={e => pickNumbr(e, itm.id)}
              className={`${itm.ticket.length >= 5 ? 'pe-none' : ''} 
                                ${
                                  checkActive(itm.id, i + 1, 0, 5)
                                    ? 'active'
                                    : ''
                                }
                                `}>
              {i + 1}
            </li>
          ))}
        </ul>
      </div>
      <div className='lottery-single__footer'>
        <p className='text-white mb-2'>Select 2 lucky numbers</p>
        <ul className='lottery-single__number justify-content-center'>
          {[...Array(10)].map((_, i) => (
            <li
              key={i}
              onClick={e => luckyNumbr(e, itm.id)}
              className={`${
                itm.ticket.length >= 7 || itm.ticket.length < 5 ? 'pe-none' : ''
              }  ${checkActive(itm.id, i + 1, 5) ? 'active' : ''}`}>
              {i + 1}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SingleLotteryCard
