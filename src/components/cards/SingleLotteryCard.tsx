import Image from 'next/image'
import { useContext } from 'react'
import { FaTimes } from 'react-icons/fa'
import { AppContext } from '../../context/context'
import circle_border from '/public/images/elements/circle-border.png'

const SingleLotteryCard = ({ ticket, totalTickets }: any) => {
  const { removeTicket }: any = useContext(AppContext)

  return (
    <div className='lottery-single'>
      {totalTickets > 1 && (
        <button
          className='lottery-single__close'
          onClick={() => removeTicket(ticket?.id)}>
          <FaTimes />
        </button>
      )}
      <div className='lottery-single__header'>
        <div className='silgle'>
          <div className='draw-single-ticket'>
            <div className='draw-single-ticket__header'>
              <div className='left'>Ticket #{ticket?.id}</div>
              <div className='right'>Contest No:R9D</div>
            </div>
            <div className='circle-divider'>
              <Image src={circle_border} alt='circle border' />
            </div>
            <ul className='lottery-single__selected-number'>
              {[...Array(7)].map((_, i) => (
                <li key={i} className={ticket?.numbers[i] ? 'active' : ''}>
                  {ticket?.numbers[i] || '00'}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleLotteryCard
