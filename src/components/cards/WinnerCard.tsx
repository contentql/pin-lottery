import { Contest, Media, Ticket, User, Winner } from '@/payload-types'
import { splitTicketNumber } from '@/utils/split-ticket-number'
import Image from 'next/image'
import { DateConverter } from '../../utils/date-converter'

const WinnerCard = ({ winner }: { winner: Winner }) => {
  return (
    <div className='winner-card mb-30 '>
      <div className='winner-card__thumb'>
        <Image
          src={
            ((winner?.contest?.value as Contest)?.img as Media)?.url as string
          }
          width={200}
          height={200}
          alt='2323'
        />
      </div>
      <div className='winner-card__content'>
        <div className='winner-thumb'>
          <Image
            src={
              ((winner?.ticket?.value as Ticket)?.purchased_by?.value as User)
                ?.image
                ? ((
                    (
                      (winner?.ticket?.value as Ticket)?.purchased_by
                        ?.value as User
                    )?.image as Media
                  )?.sizes?.userProfile?.url as string)
                : '/images/user/pp.png'
            }
            alt=''
            width={150}
            height={150}
          />
        </div>
        <div className='content-top'>
          <div className='left'>
            <h5>{(winner?.contest?.value as Contest)?.title}</h5>
          </div>
          <div className='right'>
            <span>Draw took place on</span>
            <p>{DateConverter(winner?.createdAt)}</p>
          </div>
        </div>
        <div className='content-bottom'>
          <div className='number-list-wrapper'>
            <p>Winning Numbers:</p>
            <ul className='number-list mt-2'>
              {splitTicketNumber(
                (winner?.ticket?.value as Ticket)?.ticket_number,
              )?.map((itm: any, i: any) => <li key={i}>{itm}</li>)}
            </ul>
          </div>
          <div className='right'>
            <p>Contest No:</p>
            <span className='contest-num'>
              {(winner?.contest?.value as Contest)?.contest_no}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WinnerCard
