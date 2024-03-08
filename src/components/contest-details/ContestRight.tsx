import { AppContext } from '@/context/context'
import { Contest } from '@/payload-types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useContext } from 'react'
import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa'

const ContestRight = ({ contestDetails }: { contestDetails: Contest }) => {
  const { incrementHandle, decrementHandle, quantity, setQuantity }: any =
    useContext(AppContext)

  const pathname = usePathname()

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
        <span className='amount'>{contestDetails?.ticket_price}</span>
        <small>Per ticket</small>
      </div>
      <div className='d-flex flex-wrap align-items-center mb-30'>
        <div className='select-quantity'>
          <span className='caption'>Quantity</span>
          <div className='quantity'>
            <input
              type='number'
              value={quantity}
              // defaultValue={quantity
              onChange={() => setQuantity(quantity)}
            />
            <div className='quantity-nav'>
              <div
                className={`quantity-button ${quantity <= 0 && 'pe-none'}`}
                onClick={decrementHandle}
              >
                <i className='las la-minus'></i>
              </div>
              <div
                className={`quantity-button quantity-up ${
                  quantity >= 16 && 'pe-none'
                }`}
                onClick={incrementHandle}
              >
                <i className='las la-plus'></i>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-sm-0 mt-3'>
          <Link
            href={`${pathname}/lottery-details`}
            className='cmn-btn style--three'
          >
            buy tickets
          </Link>
        </div>
      </div>
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
