import Image from 'next/image'
import Link from 'next/link'
import { FaRegHeart } from 'react-icons/fa'

const ContestCard = ({ itm }: any) => {
  return (
    <div className='contest-card'>
      <Link href={`/contest/${itm.id}`} className='item-link'></Link>
      <div className='contest-card__thumb'>
        <Image
          src={itm.img.url || '/'}
          alt={itm.title}
          width={itm?.img?.width}
          height={itm?.img?.height}
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
      <div className='contest-card__footer'>
        <ul className='contest-card__meta'>
          <li>
            <i className='las la-clock'></i>
            <span>{itm.day_remain}d</span>
          </li>
          <li>
            <i className='las la-ticket-alt'></i>
            <p>tickets available</p>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ContestCard
