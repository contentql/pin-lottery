import { AppContext } from '@/context/context'
import { Contest, Ticket, Winner } from '@/payload-types'
import { ticketsMetadata } from '@/utils/tickets-metadata'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useContext } from 'react'
import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa'

const ContestRight = ({ contestDetails }: { contestDetails: Contest }) => {
  const {
    incrementHandleAndAddTicket,
    decrementHandleAndRemoveTicket,
    quantity,
    setQuantity,
  }: any = useContext(AppContext)

  const pathname = usePathname()

  const currency = ticketsMetadata?.currency

  return (
    <div className='contest-cart__right'>
      <h4 className='subtitle'>Enter now for a chance to win</h4>
      <h3 className='contest-name'>{contestDetails?.title}</h3>
      {/* <p>This competition has a maximum of 29994 entries.</p> */}
      <div className='contest-num'>
        Contest no: <span>{contestDetails?.contest_no}</span>
      </div>
      {/* <h4>Tickets Sold</h4>
      <div className='ticket-amount'>
        <span className='left'>0</span>
        <span className='right'>29994</span>
        <div className='progressbar' data-perc='70%'>
          <div className='bar'></div>
        </div>
        <p>Only 12045 remaining!</p>
      </div> */}
      <div className='ticket-price'>
        <span className='amount'>
          {currency}
          {contestDetails?.ticket_price}
        </span>
        <small>Per ticket</small>
      </div>
      {contestDetails?.contest_status === true ? (
        <div>
          <h3>Winning Ticket Number: </h3>
          <h4>{((contestDetails?.winner_ticket?.value as Winner)?.ticket?.value as Ticket)?.ticket_number}</h4>
        </div>
      ) : (
        <div className='d-flex flex-wrap align-items-center mb-30'>
          <div className='select-quantity'>
            <span className='caption'>Quantity</span>
            <div className='quantity'>
              <input
                type='number'
                value={quantity}
                onChange={() => setQuantity(quantity)}
              />
              <div className='quantity-nav'>
                <div
                  className={`quantity-button`}
                  onClick={() => decrementHandleAndRemoveTicket()}>
                  <i className='las la-minus'></i>
                </div>
                <div
                  className={`quantity-button quantity-up`}
                  onClick={() => incrementHandleAndAddTicket()}>
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
