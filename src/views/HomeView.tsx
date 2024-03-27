'use client'

import { trpc } from '@/trpc/client'

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
import { Contest, Tag, Winner } from '@/payload-types'

const HomeView = () => {
  // get contests
  const { data: contestDetails, isLoading } = trpc.contest.getContests.useQuery(
    { pageNumber: 1, filterByName: 'all', filterByPrice: 0, filterByTitle: '' },
  )

  const contest = contestDetails?.allContests?.slice(0, 6)

  // get tags
  const { data: allTags } = trpc.public.getTags.useQuery()

  // get winners

  const { data: winnerDetails } = trpc.winner.getWinners.useQuery()

  return (
    <>
      <Hero />
      <ContestCategories allTags={allTags as [Tag]} />
      <ContestDetailsPage contestDetails={contest as Contest[]} />
      <WinnerDetails winnerDetails={winnerDetails as Winner[]} />
      <LatestWinner />
      <Overview />
      <Features />
      <HowToPlay />
      <Testimonial />
      <Support />
    </>
  )
}

export default HomeView
