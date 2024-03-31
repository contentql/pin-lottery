'use client'

import Banner from '@/components/common/Banner'
import ContestBody from '@/components/contest-details/ContestBody'
import SimilarContest from '@/components/contest/SimilarContest'
import IndividualContestSkeletone from '@/components/skeletons/IndividualContestSkeletone'
import { Contest } from '@/payload-types'
import { trpc } from '@/trpc/client'
import Image from 'next/image'
import { toast } from 'react-toastify'
import inner_hero_shape from '/public/images/elements/inner-hero-shape.png'

interface PageProps {
  contestId: string
}

const ContestDetailsView = ({ contestId }: PageProps) => {
  const {
    data: contestDetails,
    isPending: pendingContestDetails,
    refetch: refetchContestDetails,
  } = trpc.contest.getContestById.useQuery({
    id: contestId,
  })
  const { data: similarContest } = trpc.contest.getSimilarContests.useQuery(
    {
      productType: contestDetails?.product_type!,
    },
    { enabled: !!contestDetails?.product_type },
  )
  console.log('contest ', similarContest)
  const { mutate: updateContestTimerStatus } =
    trpc.contest.updateContestTimerStatus.useMutation({
      onSuccess: async () => {
        refetchContestDetails()
      },
    })

  const handleContestTimerUpdate = () => {
    if (
      contestDetails &&
      contestDetails?.reached_threshold &&
      !!contestDetails?.threshold_reached_date &&
      !contestDetails?.contest_timer_status
    ) {
      updateContestTimerStatus({
        id: contestDetails?.id,
        contest_timer_status: true,
      })

      return
    }

    toast.error('Draw has already been completed.')
  }

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
          handleContestTimerUpdate={handleContestTimerUpdate}
        />
      )}
      <SimilarContest contests={similarContest as Contest[]} />
    </>
  )
}

export default ContestDetailsView
