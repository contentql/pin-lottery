'use client'

import inner_hero_shape from '/public/images/elements/inner-hero-shape.png'
import Image from 'next/image'

import Banner from '@/components/common/Banner'
import ContestBody from '@/components/contest-details/ContestBody'
import SimilarContest from '@/components/contest/SimilarContest'
import ContestSkeletons from '@/components/skeletons/ContestSkeletons'
import IndividualContestSkeletone from '@/components/skeletons/IndividualContestSkeletone'
import { Contest } from '@/payload-types'
import { trpc } from '@/trpc/client'

interface PageProps {
  contestId: string
  contest: Contest
}

const ContestDetailsView = ({ contestId, contest }: PageProps) => {
  const {
    data: contestDetails,
    isPending: pendingContestDetails,
    refetch: refetchContestDetails,
  } = trpc.contest.getContestById.useQuery(
    {
      id: contestId,
    },
    { initialData: contest },
  )

  const { data: similarContest, isPending: isSimilarContestsPending } =
    trpc.contest.getSimilarContests.useQuery(
      {
        productType: contestDetails?.product_type!,
      },
      { enabled: !!contestDetails?.product_type },
    )

  return (
    <>
      {/* Banner section here */}
      <div className='inner-hero-section'>
        <div className='bg-shape'>
          <Image src={inner_hero_shape} alt='inner_hero_shape' />
        </div>
        <Banner
          breadcrumb={[
            ['Home', '/'],
            ['Contest', '/contest'],
            [
              `Contest No: ${contestDetails?.contest_no}`,
              `/contest/${contestDetails?.id}`,
            ],
          ]}
        />
      </div>
      {/* Bdy section here */}
      {pendingContestDetails ? (
        <IndividualContestSkeletone />
      ) : (
        <ContestBody
          contestDetails={contestDetails as Contest}
          refetchContestDetails={refetchContestDetails}
        />
      )}
      {isSimilarContestsPending ? (
        <>
          <section className='pb-120 mt-minus-100'>
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
                  {[1, 2, 3].map((ele, index) => (
                    <div key={index} className='col-xl-4 col-md-6 mb-30'>
                      <ContestSkeletons />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        similarContest?.length! > 0 && (
          <SimilarContest contests={similarContest as Contest[]} />
        )
      )}
    </>
  )
}

export default ContestDetailsView
