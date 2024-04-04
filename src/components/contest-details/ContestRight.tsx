import { AppContext } from '@/context/context'
import { Contest, Ticket, User, Winner } from '@/payload-types'
import { splitTicketNumber } from '@/utils/split-ticket-number'
import { ticketsMetadata } from '@/utils/tickets-metadata'
import useMaintainMinimumTickets from '@/utils/useMaintainMinimumTickets'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useContext } from 'react'
import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import circle_border from '/public/images/elements/circle-border.png'

const ContestRight = ({ contestDetails }: { contestDetails: Contest }) => {
  const { addTicket, removeTicket, totalTicketsCount } = useContext(AppContext)

  const pathname = usePathname()

  const currency = ticketsMetadata?.currency

  const quantity = totalTicketsCount({ contest_no: contestDetails?.contest_no })

  useMaintainMinimumTickets(contestDetails?.contest_no)

  return (
    <div className='contest-cart__right'>
      {contestDetails?.contest_status ? (
        <h4 className='subtitle'>
          Contest has ended and the winner has been chosen
        </h4>
      ) : (
        <h4 className='subtitle'>Enter now for a chance to win</h4>
      )}
      <h4 className='contest-name'>{contestDetails?.title}</h4>
      {/* <p>This competition has a maximum of 29994 entries.</p> */}

      {contestDetails?.contest_status === true ? (
        <div className='mb-4'>
          <h4 className='contest-name'>Winner Ticket is: </h4>
          <div className='lottery-single__header'>
            <div className='silgle'>
              <div className='draw-single-ticket'>
                <div className='draw-single-ticket__header'>
                  <div className='left'>
                    User Name:{' '}
                    {
                      (
                        (
                          (contestDetails?.winner_ticket?.value as Winner)
                            ?.ticket?.value as Ticket
                        )?.purchased_by?.value as User
                      )?.user_name
                    }
                  </div>
                  <div className='right'>
                    Contest No: {contestDetails?.contest_no}
                  </div>
                </div>
                <div className='circle-divider'>
                  <Image src={circle_border} alt='circle border' />
                </div>
                <ul className='lottery-single__selected-number '>
                  {splitTicketNumber(
                    (
                      (contestDetails?.winner_ticket?.value as Winner)?.ticket
                        ?.value as Ticket
                    )?.ticket_number,
                  )?.map((itm: any, i: any) => (
                    <li className='active' key={i}>
                      {itm}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className='contest-num'>
            Contest no: <span>{contestDetails?.contest_no}</span>
          </div>
          <div className='ticket-price'>
            <span className='amount'>
              {currency}
              {contestDetails?.ticket_price}
            </span>
            <small>Per ticket</small>
          </div>
          <div className='d-flex flex-wrap align-items-center mb-30'>
            <div className='select-quantity'>
              <span className='caption'>Quantity</span>
              <div className='quantity'>
                <input
                  type='number'
                  value={quantity}
                  onChange={() =>
                    addTicket({ contest_no: contestDetails?.contest_no })
                  }
                />
                <div className='quantity-nav'>
                  <div
                    className={`quantity-button`}
                    onClick={() =>
                      removeTicket({ contest_no: contestDetails?.contest_no })
                    }>
                    <i className='las la-minus'></i>
                  </div>
                  <div
                    className={`quantity-button quantity-up`}
                    onClick={() =>
                      addTicket({ contest_no: contestDetails?.contest_no })
                    }>
                    <i className='las la-plus'></i>
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-sm-0 mt-3'>
              <Link
                href={`${pathname}/ticket-details`}
                className='cmn-btn style--three'>
                buy tickets
              </Link>
            </div>
          </div>
        </>
      )}
      <ul className='social-links align-items-center'>
        <li>Share :</li>
        <li>
          <Link href='/#'>
            <FaFacebookF />
          </Link>
        </li>
        <li>
          <Link href='/#'>
            <FaTwitter />
          </Link>
        </li>
        <li>
          <Link href='/#'>
            <FaLinkedinIn />
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default ContestRight
