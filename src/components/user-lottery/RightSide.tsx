import { trpc } from '@/trpc/client'
import ContestCard from '../cards/ContestCard'

const RightSide = () => {
  const { data: wishlistData, refetch: refetchWishlistData } =
    trpc.wishlist.getWishlistTickets.useQuery()

  console.log('wishlist data', wishlistData)

  return (
    <div className='col-lg-8 mt-lg-0 mt-4'>
      {/* Upcoming Draw  */}
      {/* <UpcomingDraw /> */}

      <div className='row mb-none-30'>
        {wishlistData?.map((itm: any) => (
          <div key={itm.id} className='col-xl-6 col-lg-12 col-md-6 mb-30'>
            {/* Contest card */}
            <ContestCard
              wishlistId={itm.id}
              itm={itm?.contest?.value}
              wishlist={true}
              refetchWishlistData={refetchWishlistData}
              wishlistIds={undefined}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default RightSide
