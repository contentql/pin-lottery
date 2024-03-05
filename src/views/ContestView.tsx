'use client'

import Banner from '@/components/common/Banner'
import Feature from '@/components/contest/Feature'
import LatestContest from '@/components/contest/LatestContest'
import { trpc } from '../trpc/client'

const ContestView = () => {
  const { data: contestDetails, isLoading } =
    trpc.contest.getContests.useQuery()

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
      <LatestContest contestDetails={contestDetails} />

      {/* Feature section here */}
      <Feature />
    </>
  )
}

export default ContestView
