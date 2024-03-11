'use client'

import Banner from '@/components/common/Banner'
import Feature from '@/components/contest/Feature'
import LatestContest from '@/components/contest/LatestContest'
import { trpc } from '../trpc/client'

const ContestView = () => {

  // getting all contests

  const { data: contestDetails, isLoading } =
    trpc.contest.getContests.useQuery()
  
  //getting tags details

  const {data:allTags}=trpc.public.getTags.useQuery()

  console.log('contest', contestDetails)
  return (
    <>
      {/* Banner section here */}
      <div className='inner-hero-section style--three'>
        <Banner
          breadcrumb={[
            ['Home', '/'],
            ['Lottery', '/'],
            ['Contest', '/'],
          ]}
        />
      </div>

      {/* Letest contest here */}
      <LatestContest contestDetails={contestDetails} allTags={allTags} />

      {/* Feature section here */}
      <Feature />
    </>
  )
}

export default ContestView
