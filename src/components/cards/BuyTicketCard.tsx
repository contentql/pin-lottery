import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { FaCartPlus } from 'react-icons/fa'
import { MdOutlineShoppingCartCheckout } from 'react-icons/md'
import { toast } from 'react-toastify'

import { AppContext } from '@/context/context'
import { Contest } from '@/payload-types'
import { useAuth } from '@/providers/Auth'
import { trpc } from '@/trpc/client'

const BuyTicketCard = ({ contestDetails }: { contestDetails: Contest }) => {
  const { tickets, removeAllTickets }: any = useContext(AppContext)

  const { status } = useAuth()

  const router = useRouter()

  const ticketPrice = contestDetails?.ticket_price
  const totalTickets = tickets?.length

  const totalTicketsPrice = totalTickets * ticketPrice

  const { mutate: addTicketsToCart } = trpc.cart.addTicketsToCart.useMutation({
    onSuccess: async () => {
      toast.success('Successfully tickets are added to cart')
      removeAllTickets()
      router.push('/cart')
    },
    onError: async () => {
      toast.error('Unable to add tickets to cart')
    },
  })

  const handleAddToCart = () => {
    if (status !== 'loggedIn') {
      toast.error('Login to add tickets to cart')

      return
    }

    addTicketsToCart({
      contest_id: contestDetails?.id,
      tickets: totalTickets,
      total_price: totalTicketsPrice,
    })
  }

  return (
    <div className='buy-lottery-ticket'>
      <div className='left'>
        {/* <div className='sub-total-price'>
          <p>
            Ticket Price ({totalTickets} tickets X ${ticketPrice})
          </p>
          <span>${totalTicketsPrice}</span>
        </div> */}
        <div className='total-price'>
          <p>
            Ticket Price ({totalTickets} tickets X ${ticketPrice})
          </p>
          <span>${totalTicketsPrice}</span>
        </div>
      </div>
      <div className='right'>
        {/* <a href='/checkout' className='cmn-btn'>
          buy tickets
        </a> */}
        <div className='btn-grp justify-content-xl-end'>
          <button
            type='button'
            className='btn-border text-capitalize btn-transparent'
            onClick={() => handleAddToCart()}>
            <FaCartPlus />
            Add to cart
          </button>
          <button type='button' className='cmn-btn text-capitalize'>
            <MdOutlineShoppingCartCheckout />
            Go to cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default BuyTicketCard
