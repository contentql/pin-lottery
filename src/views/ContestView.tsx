'use client'

import { useSearchParams } from 'next/navigation'

import Banner from '@/components/common/Banner'
import Pagination from '@/components/common/Pagination'
import Feature from '@/components/contest/Feature'
import LatestContest from '@/components/contest/LatestContest'
import { useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'
import { trpc } from '../trpc/client'
const ContestView = () => {
  const searchParams = useSearchParams()
  //filters
  const [pageNumber, setPageNumber] = useState(1)
  const [filters, setFilters] = useDebounceValue(
    {
      filterByName: searchParams?.get('tag') ? searchParams?.get('tag') : 'all',
      filterByTitle: searchParams?.get('title')
        ? searchParams?.get('title')
        : '',
      filterByPrice: searchParams?.get('price')
        ? searchParams?.get('price')
        : 0,
      filterBySelect: searchParams?.get('select')
        ? searchParams?.get('select')
        : 0,
    },
    500,
  )

  // getting all contests

  const {
    data: contestDetails,
    isLoading,
    isPending: isContestsPending,
  } = trpc.contest.getContests.useQuery({
    pageNumber: pageNumber,
    filterByName: filters?.filterByName!,
    filterByPrice: Number(filters?.filterByPrice),
    filterByTitle: filters?.filterByTitle!,
  })

  //getting tags details

  const { data: allTags } = trpc.public.getTags.useQuery()

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
        setPageNumber={setPageNumber}
      />
      {contestDetails?.totalContests && contestDetails?.totalContests > 8 && (
        <div>
          <div className='row pagination-bottom'>
            <Pagination
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              totalContests={contestDetails?.totalContests}
            />
          </div>
        </div>
      )}
      {/* Feature section here */}
      <Feature />
    </>
  )
}

export default ContestView
