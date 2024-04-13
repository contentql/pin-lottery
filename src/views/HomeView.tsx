'use client'

import { useSearchParams } from 'next/navigation'

import ContestCategories from '@/components/common/ContestCategories'
import ContestDetailsPage from '@/components/common/ContestDetailsPage'
import Features from '@/components/common/Features'
import HowToPlay from '@/components/common/HowToPlay'
import LatestWinner from '@/components/common/LatestWinner'
import Overview from '@/components/common/Overview'
import Support from '@/components/common/Support'
import Testimonial from '@/components/common/Testimonial'
import Hero from '@/components/home/Hero'
import WinnerDetails from '@/components/home/WinnerDetails'
import HeroSkeleton from '@/components/skeletons/HeroSkeleton'
import { Contest, Feature, Tag, Winner } from '@/payload-types'
import { validatePaystackPaymentStatus } from '@/plugins/payload-paystack'
import { trpc } from '@/trpc/client'

const HomeView = ({ heroData }: { heroData: Contest[] }) => {
  const searchParams = useSearchParams()
  // const router =

  // get hero contests
  const {
    data: HeroContests,
    refetch: refetchHeroContests,
    isPending: heroContestsPending,
  } = trpc.contest.getHeroContests.useQuery(
    { id: '' },
    { initialData: heroData },
  )
  // get ongoing contests
  const { data: contestDetails } = trpc.contest.getOngoingContests.useQuery()

  // features

  const { data: featuresDetails } = trpc.public.getFeatures.useQuery()

  // get tags
  const { data: allTags } = trpc.public.getTags.useQuery()

  // get winners

  const { data: winnerDetails } = trpc.winner.getWinners.useQuery()
  const reference = searchParams.get('reference')

  if (reference) {
    const testFunction = async () => {
      const paymentStatus = await validatePaystackPaymentStatus({
        reference,
      })
      // router.push
    }
    testFunction()
  }

  return (
    <>
      {heroContestsPending ? (
        <HeroSkeleton />
      ) : (
        <Hero
          HeroContests={HeroContests as Contest[]}
          refetchHeroContests={refetchHeroContests}
        />
      )}
      <ContestCategories allTags={allTags as Tag[]} />
      <ContestDetailsPage contestDetails={contestDetails as Contest[]} />
      <WinnerDetails winnerDetails={winnerDetails?.slice(0, 10) as Winner[]} />
      <LatestWinner />
      <Overview />
      <Features featuresDetails={featuresDetails as Feature} />
      <HowToPlay />
      <Testimonial />
      <Support />
    </>
  )
}

export default HomeView
