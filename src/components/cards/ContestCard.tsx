import { Contest, Media, Winner } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { FaRegHeart } from 'react-icons/fa'

const ContestCard = ({ itm }: {itm:Contest}) => {
  return (
    <div className='contest-card'>
      <Link href={`/contest/${itm.id}`} className='item-link'></Link>
      <div className='contest-card__thumb'>
        <Image
          src={(itm.img as Media).url || '/'}
          alt={itm.title}
          width={(itm?.img as Media)?.width || 100}
          height={(itm?.img as Media)?.height || 100}
        />
        <a href='#0' className='action-icon'>
          <FaRegHeart />
        </a>
        <div className='contest-num'>
          <span>contest no:</span>
          <h4 className='number'>{itm.contest_no}</h4>
        </div>
      </div>
      <div className='contest-card__content'>
        <div className='left'>
          <h5 className='contest-card__name'>{itm.title}</h5>
        </div>
        <div className='right'>
          <span className='contest-card__price'>${itm.ticket_price}</span>
          <p>ticket price</p>
        </div>
      </div>
      {itm?.contest_status===true ? (
         <div className='contest-card__footer'>
          <ul>
            <li className='footer-card'>
              <p>Winner is :</p>
              <p>{(itm?.winner_ticket?.value as Winner)?.ticket_number}</p>
            </li>
          </ul>
        </div>
        // actual fotter
        // <div className='contest-card__footer'>
        //   <ul className='contest-card__meta'>
        //     <li>
        //       <i className='las la-clock'></i>
        //       <span>{itm.day_remain}d</span>
        //     </li>
        //     <li>
        //       <i className='las la-ticket-alt'></i>
        //       <p>tickets available</p>
        //     </li>
        //   </ul>
        // </div>
      ) : (
          <div className='contest-card__footer'>
          <ul>
            <li className='footer-card'>
              <i className='las la-ticket-alt'></i>
              <p>tickets available</p>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default ContestCard
