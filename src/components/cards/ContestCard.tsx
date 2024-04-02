import { Contest, Media, Ticket, Winner } from '@/payload-types'
import { useAuth } from '@/providers/Auth'
import { trpc } from '@/trpc/client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FaRegHeart } from 'react-icons/fa'
import { FaHeart } from 'react-icons/fa6'
import { toast } from 'react-toastify'

const ContestCard = ({
  itm,
  wishlist,
  wishlistId,
  refetchWishlistData,
  wishlistIds,
}: {
  itm: Contest
  wishlist: Boolean
  wishlistId: string
  refetchWishlistData: any
  wishlistIds: any
}) => {
  const { status } = useAuth()

  const { mutate: addTicketsToCart } =
    trpc.wishlist.addTicketsToWishlist.useMutation({
      onSuccess: async () => {
        refetchWishlistData()
        toast.success('Successfully added to wishlist')
      },
      onError: async () => {
        toast.error('Unable to add to wishlist')
      },
    })

  const { mutate: deleteById } = trpc.wishlist.deleteById.useMutation({
    onSuccess: async () => {
      toast.success('Successfully remove from wishlist.')
      refetchWishlistData()
    },
    onError: async () => {
      toast.error('Failed to remove from wishlist.')
    },
  })

  const addToWishlist = () => {
    if (status !== 'loggedIn') {
      toast.error('Login to add tickets to wishlist')
      return
    }

    addTicketsToCart({
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
        <div className='action-icon1' style={{ cursor: 'pointer' }}>
          {wishlist || wishlistIds?.includes(itm?.id) ? (
            <FaHeart
              className='zoomin'
              onClick={() => {
                deleteById({ id: wishlistId })
              }}
              fill='red'
            />
          ) : (
            <FaRegHeart
              className='zoomin'
              onClick={addToWishlist}
              style={{ color: 'white' }}
            />
          )}
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
