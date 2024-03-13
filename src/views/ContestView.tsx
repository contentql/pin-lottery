'use client'

import { useSearchParams } from 'next/navigation'

import Banner from '@/components/common/Banner'
import Feature from '@/components/contest/Feature'
import LatestContest from '@/components/contest/LatestContest'
import { useState } from 'react'
import { trpc } from '../trpc/client'

const ContestView = () => {
  const searchParams = useSearchParams()
  //filters
  const [filters, setFilters] = useState({
    filterByName: searchParams?.get('tag') ? searchParams?.get('tag') : 'all',
    filterByTitle: searchParams?.get('title') ? searchParams?.get('title') : '',
  })

  // getting all contests

  const { data: contestDetails, isLoading } =
    trpc.contest.getContests.useQuery()

  //getting tags details

  const { data: allTags } = trpc.public.getTags.useQuery()

  console.log('tags setting', allTags)
  return (
    <>
      {/* Banner section here */}
      <div className='inner-hero-section style--three'>
        <Banner
          breadcrumb={[
            ['Home', '/'],
            ['Contest', '/contest'],
          ]}
        />
      </div>

      {/* Letest contest here */}
      <LatestContest
        contestDetails={contestDetails}
        allTags={allTags}
        filters={filters}
        setFilters={setFilters}
      />

      {/* Feature section here */}
      <Feature />
    </>
  )
}

export default ContestView
