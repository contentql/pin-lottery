import ContestCard from '../cards/ContestCard'
import ContestSkeletons from '../skeletons/ContestSkeletons'
import Image from 'next/image'
import Link from 'next/link'
import { FaAngleLeft } from 'react-icons/fa6'

import { useAuth } from '@/providers/Auth'
import { trpc } from '@/trpc/client'

const RightSide = () => {
  const { status } = useAuth()
  const {
    data: wishlistData,
    refetch: refetchWishlistData,
    isPending: isWishlistPending,
  } = trpc.wishlist.getWishlistTickets.useQuery({ id: '' })

  return (
    <div className='col-lg-8 mt-lg-0 mt-4'>
      {/* Upcoming Draw  */}
      {/* <UpcomingDraw /> */}

      {isWishlistPending ? (
        <div className='row mb-none-30'>
          {[1, 2, 3, 4].map((ele, index) => (
            <div key={index} className='col-xl-6 col-lg-12 col-md-6 mb-30'>
              <ContestSkeletons />
            </div>
          ))}
        </div>
      ) : wishlistData?.length! <= 0 ? (
        <div className='wishlist-button-center'>
          <div className='wishlist-empty-image'>
            <Image
              src='/images/empty-states/empty-wishlist.png'
              alt='empty wishlist'
              width={500}
              height={500}
            />
          </div>
          <Link className='cmn-btn text-capitalize ' href='/contest'>
            <span>
              <FaAngleLeft
                size={18}
                color='white'
                style={{ marginRight: '20px' }}
              />
            </span>
            go to Contests
          </Link>
        </div>
      ) : (
        <div className='row mb-none-30'>
          {wishlistData?.map((itm: any) => (
            <div key={itm.id} className='col-xl-6 col-lg-12 col-md-6 mb-30'>
              {/* Contest card */}
              <ContestCard wishlist={true} itm={itm?.contest?.value} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default RightSide
