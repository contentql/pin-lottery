'use client'

import { useSearchParams } from 'next/navigation'

import Banner from '@/components/common/Banner'
import PaginationTwo from '@/components/common/Pagination'
import Feature from '@/components/contest/Feature'
import LatestContest from '@/components/contest/LatestContest'
import { useState } from 'react'
import { trpc } from '../trpc/client'
const ContestView = () => {
  const searchParams = useSearchParams()
  //filters
  const [filters, setFilters] = useState({
    pageNumber: 1,
    filterByName: searchParams?.get('tag') ? searchParams?.get('tag') : 'all',
    filterByTitle: searchParams?.get('title') ? searchParams?.get('title') : '',
    filterByPrice: searchParams?.get('price') ? searchParams?.get('price') : 0,
    filterBySelect: searchParams?.get('select')
      ? searchParams?.get('select')
      : 0,
  })

  // getting all contests

  const {
    data: contestDetails,
    isLoading,
    isPending: isContestsPending,
  } = trpc.contest.getContests.useQuery({
    pageNumber: filters?.pageNumber,
    filterByName: filters?.filterByName!,
  })

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
        isContestsPending={isContestsPending}
        allTags={allTags}
        filters={filters}
        setFilters={setFilters}
      />

      <div>
        <div className='row pagination-bottom'>
          <PaginationTwo
            filters={filters}
            setFilters={setFilters}
            totalContests={contestDetails?.totalContests}
          />
        </div>
      </div>
      {/* Feature section here */}
      <Feature />
    </>
  )
}

export default ContestView
