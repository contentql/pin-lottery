import { AppContext } from '@/context/context'
import { Contest, Ticket, User, Winner } from '@/payload-types'
import { useAuth } from '@/providers/Auth'
import { trpc } from '@/trpc/client'
import { splitTicketNumber } from '@/utils/split-ticket-number'
import { ticketsMetadata } from '@/utils/tickets-metadata'
import useMaintainMinimumTickets from '@/utils/useMaintainMinimumTickets'
import { useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useContext } from 'react'
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share'
import { toast } from 'react-toastify'
import circle_border from '/public/images/elements/circle-border.png'

const ContestRight = ({ contestDetails }: { contestDetails: Contest }) => {

  const router=useRouter()
  const queryClient = useQueryClient()
  const {mutate:EmptyCart}=trpc.cart.deleteAllTicketsOfUserFromCart.useMutation({})
  const { mutate: addTicketsToCart, isPending: isTicketAdded } =
  trpc.cart.addTicketsToCart.useMutation({
    onSuccess: async () => {
      toast.success('Successfully tickets are added to cart')
      removeAllTickets({ contest_no: contestDetails?.contest_no })
      router.push('/cart')
    },
    onError: async () => {
      toast.error('Unable to add tickets to cart')
    },
  })
  const { addTicket, removeTicket, totalTicketsCount ,removeAllTickets} = useContext(AppContext)
  const {status}=useAuth()
  const pathname = usePathname()

  const currency = ticketsMetadata?.currency

  const quantity = totalTicketsCount({ contest_no: contestDetails?.contest_no })

  const ticketPrice = contestDetails?.ticket_price
  const totalTicketsPrice = quantity * ticketPrice

  useMaintainMinimumTickets(contestDetails?.contest_no)

  const handleBuyTickets=async()=>{
    if (status !== 'loggedIn') {
      toast.error(`please login to buy tickets`)
      return
    }
    await EmptyCart()
   await addTicketsToCart({
      contest_id:contestDetails?.id,
      tickets:quantity,
      total_price:totalTicketsPrice
    })
    
  }
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
          <div className='d-flex flex-wrap align-items-center mb-30 contest-quantity'>
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
                    aria-hidden
                    role='button'
                    className={`quantity-button`}
                    onClick={() =>
                      removeTicket({ contest_no: contestDetails?.contest_no })
                    }>
                    <i className='las la-minus'></i>
                  </div>
                  <div
                    aria-hidden
                    role='button'
                    className={`quantity-button quantity-up`}
                    onClick={() =>
                      addTicket({ contest_no: contestDetails?.contest_no })
                    }>
                    <i className='las la-plus'></i>
                  </div>
                </div>
              </div>
            </div>
            <div className='contest-buttons'>
              <div className='mt-sm-0 mt-3'>
              <Link style={{marginRight:'4px'}}
                href={`${pathname}/ticket-details`}
                className='cmn-btn style--three'>
                Add Cart
              </Link>
            </div>
            <div className='mt-sm-0 mt-3'>
              <button
                onClick={handleBuyTickets}
                className='cmn-btn style--three'>
                Play Now
              </button>
            </div></div>
          </div>
        </>
      )}
      <ul className='social-links align-items-center'>
        <li>Share :</li>
        <li>
          <FacebookShareButton
            url={`${process.env.NEXT_PUBLIC_SERVER_URL}/contest/${contestDetails?.id}`}
            hashtag={'#lottery...'}>
            <FacebookIcon size={35} round />
          </FacebookShareButton>
        </li>
        <li>
          <TwitterShareButton
            url={`${process.env.NEXT_PUBLIC_SERVER_URL}/contest/${contestDetails?.id}`}>
            <TwitterIcon size={35} round />
          </TwitterShareButton>
        </li>
        <li>
          <LinkedinShareButton
            url={`${process.env.NEXT_PUBLIC_SERVER_URL}/contest/${contestDetails?.id}`}>
            <LinkedinIcon size={35} round />
          </LinkedinShareButton>
        </li>
      </ul>
    </div>
  )
}

export default ContestRight
