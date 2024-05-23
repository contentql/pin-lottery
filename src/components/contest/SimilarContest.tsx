import ContestCard from '../cards/ContestCard'

import { Contest, Wishlist } from '@/payload-types'
import { trpc } from '@/trpc/client'

const SimilarContest = ({ contests }: { contests: Contest[] }) => {
  const { data: wishlistData, refetch: refetchWishlistData } =
    trpc.wishlist.getWishlistTickets.useQuery({
      id: '',
    })

  const getWishlistId = (id: string) =>
    wishlistData
      ?.filter(ele => (ele?.contest?.value as Contest)?.id === id)
      ?.at(0)?.id

  const wishlistIds = wishlistData?.map(
    (ele: Wishlist) => (ele?.contest?.value as Contest)?.id,
  )

  return (
    <section className='pb-120 pt-90 mt-minus-100'>
      <div className='container'>
        <div className='section-header text-center'>
          <h2 className=''>Similar Contests</h2>
        </div>

        <div
          className='tab-pane fade show active '
          id='dream'
          role='tabpanel'
          aria-labelledby='dream-tab'
        >
          <div className='row mb-none-30 mt-50'>
            {contests?.map(contest => (
              <div key={contest.id} className='col-xl-4 col-md-6 mb-30'>
                <ContestCard itm={contest} wishlist={false} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SimilarContest
