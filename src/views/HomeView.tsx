'use client'

import ContestCategories from '@/components/common/ContestCategories'
import ContestDetailsPage from '@/components/common/ContestDetailsPage'
import Features from '@/components/common/Features'
import HowToPlay from '@/components/common/HowToPlay'
import LatestWinner from '@/components/common/LatestWinner'
import Overview from '@/components/common/Overview'
import Support from '@/components/common/Support'
import Testimonial from '@/components/common/Testimonial'
import Hero from '@/components/home/Hero'
import Winner from '@/components/home/Winner'
import { Contest, Tag } from '@/payload-types'
import { trpc } from '@/trpc/client'
const HomeView = () => {

  // get contests
  const { data: contestDetails, isLoading } =
    trpc.contest.getContests.useQuery()
  
  // get tags
  const { data: allTags } = trpc.public.getTags.useQuery()

  console.log('contest home', contestDetails)
  return (
    <>
      <Hero />
      <ContestCategories allTags={allTags as [Tag]} />
      <ContestDetailsPage contestDetails={contestDetails as [Contest]} />
      <Winner />
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
