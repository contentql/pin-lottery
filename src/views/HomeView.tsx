'use client'

import ContestDetailsPage from '@/components/common/ContestDetailsPage'
import Features from '@/components/common/Features'
import HowToPlay from '@/components/common/HowToPlay'
import LatestWinner from '@/components/common/LatestWinner'
import Overview from '@/components/common/Overview'
import Support from '@/components/common/Support'
import Testimonial from '@/components/common/Testimonial'
import Hero from '@/components/home/Hero'
import Winner from '@/components/home/Winner'
import { Contest } from '@/payload-types'
import { trpc } from '@/trpc/client'

const HomeView = () => {

  // get contests

  const { data: contestDetails, isLoading } =
    trpc.contest.getContests.useQuery()
  
  console.log('contest home', contestDetails)
  return (
    <>
      <Hero />
      <HowToPlay />
      <ContestDetailsPage contestDetails={contestDetails as [Contest]} />
      <Winner />
      <LatestWinner />
      <Overview />
      <Features />
      <Testimonial />
      <Support />
    </>
  )
}

export default HomeView
