import { useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FaRegHeart } from 'react-icons/fa'
import { FaHeart } from 'react-icons/fa6'
import { toast } from 'react-toastify'
import * as sd from 'simple-duration'

import { Contest, Media, Ticket, Winner, Wishlist } from '@/payload-types'
import { useAuth } from '@/providers/Auth'
import { trpc } from '@/trpc/client'
import { ticketsMetadata } from '@/utils/tickets-metadata'

const ContestCard = ({
  itm,
  wishlist,
}: {
  itm: Contest
  wishlist: Boolean
}) => {
  const { status } = useAuth()

  const queryClient = useQueryClient()

  const { data: wishlistData } = trpc.wishlist.getWishListByContestId.useQuery(
    {
      id: itm.id,
    },
    {
      initialData: { id: undefined, isWishlist: false },
    },
  )

  const { isWishlist, id: wishlistId } = wishlistData

  const queryKey = [
    ['wishlist', 'getWishListByContestId'],
    {
      input: {
        id: itm.id,
      },
      type: 'query',
    },
  ]
  const date = new Date(itm?.threshold_reached_date || '1')

  const milliseconds = itm?.day_remain ? sd.parse(itm?.day_remain) * 1000 : 1

  const winnerAnnouncingDate = new Date(date.getTime() + milliseconds)
    .toISOString()
    .split('T')[0]

  const { mutate: addToWishlist, isPending: isWishlistUpdated } =
    trpc.wishlist.addToWishlist.useMutation({
      onMutate: () => {
        queryClient.setQueryData(queryKey, (prev: typeof wishlistData) => ({
          ...prev,
          isWishlist: true,
        }))
      },
      onSuccess: async () => {
        toast.success('Successfully added to wishlist')
      },
      onError: async () => {
        queryClient.setQueryData(queryKey, (prev: typeof wishlistData) => ({
          ...prev,
          isWishlist: false,
        }))
        toast.error('Unable to add to wishlist')
      },
    })

  const { mutate: removeFromWishlist, isPending: isWishlistDeleted } =
    trpc.wishlist.removeWishlistById.useMutation({
      onMutate: async () => {
        if (wishlist) {
          queryClient.setQueryData(
            [
              ['wishlist', 'getWishlistTickets'],
              { input: { id: '' }, type: 'query' },
            ],
            (prev: Wishlist[]) => {
              return prev.filter(
                (wishlist: Wishlist) =>
                  (wishlist?.contest?.value as Contest)?.id !== itm?.id,
              )
            },
          )
        } else
          queryClient.setQueryData(queryKey, (prev: typeof wishlistData) => ({
            ...prev,
            isWishlist: false,
          }))
      },
      onSuccess: async () => {
        toast.success('Successfully remove from wishlist.')
      },
      onError: async () => {
        queryClient.setQueryData(queryKey, (prev: typeof wishlistData) => ({
          ...prev,
          isWishlist: true,
        }))
        toast.error('Failed to remove from wishlist.')
      },
    })

  const wishlistClickHandler = (e: any) => {
    e.stopPropagation()
    if (status !== 'loggedIn') {
      toast.error('Login to add tickets to wishlist')
      return
    }

    addToWishlist({
      contest_id: itm?.id,
    })
  }

  const router = useRouter()

  return (
    <div
      className='contest-card'
      onClick={() => router.push(`/contest/${itm.id}`)}>
      <div className='contest-card__thumb'>
        <Image
          src={(itm.img as Media)?.sizes?.contestImage?.url || '/'}
          alt={itm.title}
          width={(itm?.img as Media)?.sizes?.contestImage?.width || 100}
          height={(itm?.img as Media)?.sizes?.contestImage?.height || 100}
          style={{ cursor: 'pointer' }}
        />
        <div className='action-icon1' style={{ cursor: 'pointer' }}>
          {isWishlist ? (
            <FaHeart
              className='zoomin'
              onClick={e => {
                e.stopPropagation()

                removeFromWishlist({ id: wishlistId! })
              }}
              size={25}
              fill='red'
              pointerEvents={isWishlistUpdated ? 'none' : 'auto'}
            />
          ) : (
            <FaRegHeart
              className='zoomin'
              size={25}
              onClick={e => {
                e.stopPropagation()
                wishlistClickHandler(e)
              }}
              style={{ color: 'white' }}
              pointerEvents={isWishlistDeleted ? 'none' : 'auto'}
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
          <span className='contest-card__price'>
            {ticketsMetadata.currency} {itm.ticket_price}
          </span>
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
      ) : itm?.reached_threshold &&
        itm?.threshold_reached_date &&
        !itm?.contest_status &&
        !itm?.winner_ticket ? (
        // actual fotter
        <div className='contest-card__footer'>
          <ul className='contest-card__meta'>
            <li>
              <i className='las la-clock'></i>
              <span>{winnerAnnouncingDate}</span>
            </li>
            <li>
              <i className='las la-ticket-alt'></i>
              <p>tickets available</p>
            </li>
          </ul>
        </div>
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
