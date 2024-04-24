'use client'

import '../../src/styles/layout/custom/_pagination.scss'
import { trpc } from '../trpc/client'
import { useState } from 'react'
import ResponsivePagination from 'react-responsive-pagination'
import { useDebounceValue, useLocalStorage } from 'usehooks-ts'

import Banner from '@/components/common/Banner'
import Feature from '@/components/contest/Feature'
import LatestContest from '@/components/contest/LatestContest'

interface FilterByContent {
  filterByName: string
  filterByTitle: string
  filterByPrice: number
  filterBySelect: string
  filterByContestStatus: string
}

const ContestView = () => {
  const initialValue: FilterByContent = {
    filterByName: 'all',
    filterByContestStatus: '',
    filterByPrice: 0,
    filterBySelect: '',
    filterByTitle: '',
  }

  const [contentFilters, setContentFilters, removeContestFilters] =
    useLocalStorage<FilterByContent>('filterByContent', initialValue)
  const templatesPerPage = 9

  //filters
  const [pageNumber, setPageNumber] = useState(1)
  const [filters, setFilters] = useDebounceValue(
    {
      filterByName: contentFilters?.filterByName
        ? contentFilters?.filterByName
        : 'all',
      filterByTitle: contentFilters?.filterByTitle
        ? contentFilters?.filterByTitle
        : '',
      filterByPrice: contentFilters?.filterByPrice
        ? contentFilters?.filterByPrice
        : 0,
      filterBySelect: contentFilters?.filterBySelect
        ? contentFilters?.filterBySelect
        : 0,
      filterByContestStatus: contentFilters?.filterByContestStatus
        ? contentFilters?.filterByContestStatus
        : '',
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
    filterByContestStatus: filters?.filterByContestStatus!,
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
        contentFilters={contentFilters}
        setContentFilters={setContentFilters}
        setPageNumber={setPageNumber}
        removeContestFilters={removeContestFilters}
      />
      {contestDetails?.totalContests && contestDetails?.totalContests > 8 && (
        <div>
          <div className='row pagination-bottom'>
            {/* <Pagination
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              totalContests={}
            /> */}
            <ResponsivePagination
              current={pageNumber}
              total={Math.ceil(
                (contestDetails?.totalContests as number) / templatesPerPage,
              )}
              onPageChange={setPageNumber}
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
