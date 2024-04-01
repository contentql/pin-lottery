import { Contest, Media, Ticket, Winner } from '@/payload-types'
import { useAuth } from '@/providers/Auth'
import { trpc } from '@/trpc/client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FaRegHeart } from 'react-icons/fa'
import { toast } from 'react-toastify'

const ContestCard = ({
  itm,
  wishlist,
  wishlistId,
  refetchWishlistData,
}: {
  itm: Contest
  wishlist: Boolean
  wishlistId: string
  refetchWishlistData: any
}) => {
  const { status } = useAuth()

  const { mutate: addTicketsToCart } =
    trpc.wishlist.addTicketsToWishlist.useMutation({
      onSuccess: async () => {
        toast.success('Successfully tickets are added to wishlist')
      },
      onError: async () => {
        toast.error('Unable to add tickets to cart')
      },
    })

  const { mutate: deleteById } = trpc.wishlist.deleteById.useMutation({
    onSuccess: async () => {
      toast.success('Successfully tickets deleted.')
      refetchWishlistData()
    },
    onError: async () => {
      toast.error('Failed to delete tickets.')
    },
  })

  const addToWishlist = () => {
    if (status !== 'loggedIn') {
      toast.error('Login to add tickets to wishlist')
      return
    }

    wishlist
      ? deleteById({ id: wishlistId })
      : addTicketsToCart({
          contest_id: itm?.id,
        })
  }
  const router = useRouter()

  return (
    <div className='contest-card'>
      <div className='contest-card__thumb'>
        <Image
          src={(itm.img as Media)?.sizes?.contestImage?.url || '/'}
          alt={itm.title}
          width={(itm?.img as Media)?.sizes?.contestImage?.width || 100}
          height={(itm?.img as Media)?.sizes?.contestImage?.height || 100}
          onClick={() => router.push(`/contest/${itm.id}`)}
          style={{ cursor: 'pointer' }}
        />
        <div
          className='action-icon'
          style={{ cursor: 'pointer' }}
          onClick={addToWishlist}>
          <FaRegHeart style={{ color: 'white' }} />
        </div>
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
      {itm?.contest_status === true ? (
        <div className='contest-card__footer'>
          <ul>
            <li className='footer-card'>
              <p>Winner is :</p>
              <p>
                {
                  (
                    (itm?.winner_ticket?.value as Winner)?.ticket
                      ?.value as Ticket
                  )?.ticket_number
                }
              </p>
            </li>
          </ul>
        </div>
      ) : (
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
