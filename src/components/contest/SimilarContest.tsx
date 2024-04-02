import { Contest } from '@/payload-types'
import { trpc } from '@/trpc/client'
import ContestCard from '../cards/ContestCard'
import ContestSkeletons from '../skeletons/ContestSkeletons'


const SimilarContest = ({
  contests,
  isSimilarContestsPending,
}: {
  contests: Contest[]
  isSimilarContestsPending: boolean
}) => {
  const { data: wishlistData, refetch: refetchWishlistData } =
    trpc.wishlist.getWishlistTickets.useQuery()

  const getWishlistId = (id: string) =>
    wishlistData
      ?.filter(ele => (ele?.contest?.value as Contest)?.id === id)
      ?.at(0)?.id

  const wishlistIds = wishlistData?.map((ele: any) => ele?.contest?.value?.id)


  return (
   <section className='pb-120 mt-minus-100'>
      <div className='container'>
        <div className='section-header text-center'>
          <h2 className=''>Similar Contests</h2>
        </div>

        {isSimilarContestsPending ? (
          <div
            className='tab-pane fade show active '
            id='dream'
            role='tabpanel'
            aria-labelledby='dream-tab'>
            <div className='row mb-none-30 mt-50'>
              {[1, 2, 3].map((ele, index) => (
                <div key={index} className='col-xl-4 col-md-6 mb-30'>
                  <ContestSkeletons />
                </div>
              ))}
            </div>

          </div>
        ) : (
          <div
            className='tab-pane fade show active '
            id='dream'
            role='tabpanel'
            aria-labelledby='dream-tab'>
            <div className='row mb-none-30 mt-50'>
              {contests?.map(contest => (
                <div key={contest.id} className='col-xl-4 col-md-6 mb-30'>
                  <ContestCard
                  itm={contest}
                  wishlist={false}
                  wishlistId={getWishlistId(contest?.id) as string}
                  refetchWishlistData={refetchWishlistData}
                  wishlistIds={wishlistIds}
                />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default SimilarContest
