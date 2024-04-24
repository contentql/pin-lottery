import FilterByTag from '../filters/FilterByTag'
import ContestSkeletons from '../skeletons/ContestSkeletons'
import Image from 'next/image'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useDebounceCallback } from 'usehooks-ts'

import ContestCard from '@/components/cards/ContestCard'
import { trpc } from '@/trpc/client'

const LatestContest = ({
  contestDetails,
  isContestsPending,
  filters,
  setFilters,
  setPageNumber,
  setContentFilters,
  contentFilters,
  removeContestFilters,
}: any) => {
  const { data: wishlistData, refetch: refetchWishlistData } =
    trpc.wishlist.getWishlistTickets.useQuery({ id: '' })

  const price = contentFilters?.filterByPrice ?? 0
  const MAX = 1000

  const [resetValues, setResetValues] = useState({
    sliderValue: contentFilters?.filterByPrice
      ? Number(contentFilters?.filterByPrice)
      : 0,
    inputValue: contentFilters?.filterByTitle
      ? contentFilters?.filterByTitle
      : '',
    selectValue: contentFilters?.filterBySelect
      ? contentFilters?.filterBySelect
      : '',
    contestStatus: contentFilters?.filterByContestStatus
      ? contentFilters?.filterByContestStatus
      : '',
  })

  const getBackgroundSize = () => {
    return {
      backgroundSize: `${(resetValues?.sliderValue * 100) / MAX}% 100%`,
    }
  }

  // const handleFilterByName = (tag: any) => {
  //   if (filters.filterByName === 'all') return true
  //   return filters.filterByName?.includes(tag?.tag?.value?.tag)
  // }

  // const handleFilterByPrice = (contest: any) => {
  //   if (filters.filterByPrice === 0) return true
  //   return contest?.ticket_price <= filters.filterByPrice
  // }

  // const handleFilterByTitle = (contest: any) => {
  //   if (title === '') return true
  //   return contest?.title
  //     ?.toLowerCase()
  //     ?.includes(filters.filterByTitle?.toLowerCase())
  // }

  const handleFilterBySort = (value1: any, value2: any) => {
    if (filters.filterBySelect === 'priceLowToHigh') {
      return value1.ticket_price - value2.ticket_price
    } else if (filters.filterBySelect === 'priceHighToLow') {
      return value2.ticket_price - value1.ticket_price
    } else if (filters.filterBySelect === 'sortByName') {
      return value1.title.localeCompare(value2.title)
    } else return false
  }

  const handleSearchTag = (tag: string) => {
    setContentFilters({ ...contentFilters, filterByName: tag })
    setFilters({ ...filters, filterByName: contentFilters.filterByName })
    setPageNumber(1)
  }

  const handleSearchTitle = (value: string) => {
    setContentFilters({ ...contentFilters, filterByTitle: value })
    setFilters({ ...filters, filterByTitle: contentFilters.filterByTitle })
    setPageNumber(1)
  }

  const handleSearchPrice = (value: number) => {
    setContentFilters({ ...contentFilters, filterByPrice: value })
    setFilters({ ...filters, filterByPrice: contentFilters.filterByPrice })
    setPageNumber(1)
  }

  const handleSearchSortBy = (value: string) => {
    setContentFilters({ ...contentFilters, filterBySelect: value })
    setFilters({ ...filters, filterBySelect: contentFilters.filterBySelect })
    setPageNumber(1)
  }

  const handleSearchContestStatus = (value: string) => {
    setContentFilters({ ...contentFilters, filterByContestStatus: value })
    setFilters({
      ...filters,
      filterByContestStatus: contentFilters.filterByContestStatus,
    })
    setPageNumber(1)
  }

  const updatedTitle = useDebounceCallback(handleSearchTitle, 500)
  const updatedPrice = useDebounceCallback(handleSearchPrice, 500)

  const handleClearFilters = () => {
    removeContestFilters('filterByContent')
    setFilters({
      filterByName: 'all',
      filterByTitle: '',
      filterByPrice: 0,
      pageNumber: 1,
      filterByContestStatus: '',
    })
    setResetValues({
      sliderValue: 0,
      inputValue: '',
      selectValue: '',
      contestStatus: '',
    })
  }

  return (
    <section className='pb-120 mt-minus-100' id='contest'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='contest-wrapper'>
              <div className='contest-wrapper__header pt-120'>
                <h2 className='contest-wrapper__title'>All Contests</h2>

                <FilterByTag
                  filter={filters?.filterByName}
                  handleSearch={handleSearchTag}
                />
              </div>
              <div className='contest-wrapper__body'>
                <div className='row contest-filter-wrapper justify-content-center mt-30 mb-none-30'>
                  <div className='col-lg-2 mb-30'>
                    <div className='select border border-dark rounded-pill'>
                      <select
                        value={resetValues.selectValue}
                        onChange={e => {
                          setResetValues({
                            ...resetValues,
                            selectValue: e.target.value,
                          })
                          handleSearchSortBy(e.target.value)
                        }}
                        className='border-0 rounded-pill'>
                        <option value={''}>SORT BY</option>
                        <option value={'priceLowToHigh'}>
                          Price -- Low to High
                        </option>
                        <option value={'priceHighToLow'}>
                          Price -- High to Low
                        </option>
                        <option value={'sortByName'}>Contest Name</option>
                      </select>
                    </div>
                  </div>
                  <div className='col-lg-2 mb-30'>
                    <div className='select border border-dark rounded-pill'>
                      <select
                        value={resetValues.contestStatus}
                        onChange={e => {
                          setResetValues({
                            ...resetValues,
                            contestStatus: e.target.value,
                          })
                          handleSearchContestStatus(e.target.value)
                        }}
                        className='border-0 rounded-pill'>
                        <option value={''}>SHOW ONLY</option>
                        <option value={'thresholdReached'}>
                          Contests -- Date Announced
                        </option>
                        <option value={'ongoingContests'}>
                          Contests -- Ongoing Contests
                        </option>
                        <option value={'winnerAnnounced'}>
                          Contests -- Winner announced
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className='col-lg-3 mb-30'>
                    <div className='rang-slider'>
                      <span className='caption'>Ticket Price</span>

                      <div className='amount-wrapper'>
                        <div className='main-amount w-100'>
                          <input
                            type={'range'}
                            min='0'
                            max={MAX}
                            onChange={e => {
                              setResetValues({
                                ...resetValues,
                                sliderValue: Number(e.target.value),
                              })
                              updatedPrice(Number(e.target.value))
                            }}
                            style={getBackgroundSize()}
                            value={resetValues.sliderValue}
                          />
                        </div>
                        <span className='min-amount'>0</span>
                        <span className='max-amount'>
                          {price !== 0 ? price : resetValues.sliderValue}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-3 mb-30'>
                    <form className='contest-search-form'>
                      <input
                        className='pe-5'
                        type='text'
                        placeholder='SEARCH HERE'
                        onChange={e => {
                          setResetValues({
                            ...resetValues,
                            inputValue: e.target.value,
                          })
                          updatedTitle(e.target.value)
                        }}
                        value={resetValues.inputValue}
                      />
                      <button>
                        <FaSearch />
                      </button>
                    </form>
                  </div>
                  <div className='col-lg-2 mb-30'>
                    <button
                      className='cmn-btn active'
                      onClick={handleClearFilters}>
                      Clear filters
                    </button>
                  </div>
                </div>

                <div
                  className='tab-con tent mt-50 contests-body'
                  id='contestContent'>
                  {isContestsPending ? (
                    <div
                      className='tab-pane fade show active '
                      id='dream'
                      role='tabpanel'
                      aria-labelledby='dream-tab'>
                      <div className='row mb-none-30 mt-50'>
                        {[1, 2, 3].map((ele, index) => (
                          <div key={index} className='col-xl-4 col-md-6 mb-30'>
                            <ContestSkeletons />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div
                      className='tab-pane fade show active '
                      id='dream'
                      role='tabpanel'
                      aria-labelledby='dream-tab'>
                      <div className='row mb-none-30 mt-50'>
                        {contestDetails?.allContests.length > 0 ? (
                          contestDetails?.allContests
                            ?.sort(handleFilterBySort)
                            ?.map((contest: any) => (
                              <div
                                key={contest.id}
                                className='col-xl-4 col-md-6 mb-30'>
                                <ContestCard itm={contest} wishlist={false} />
                              </div>
                            ))
                        ) : (
                          <div className='wishlist-button-center'>
                            <Image
                              src='/images/empty-states/empty-wishlist.png'
                              alt='empty wishlist'
                              width={600}
                              height={400}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {/* <div
                    className='tab-pane fade'
                    id='bike'
                    role='tabpanel'
                    aria-labelledby='bike-tab'>
                    <div className='row mb-none-30 mt-50'>
                      {contestData.map(itm => (
                        <div key={itm.id} className='col-xl-4 col-md-6 mb-30'>
                          <ContestCard itm={itm} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div
                    className='tab-pane fade'
                    id='watch'
                    role='tabpanel'
                    aria-labelledby='watch-tab'>
                    <div className='row mb-none-30 mt-50'>
                      {contestData.map(itm => (
                        <div key={itm.id} className='col-xl-4 col-md-6 mb-30'>
                          <ContestCard itm={itm} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div
                    className='tab-pane fade'
                    id='laptop'
                    role='tabpanel'
                    aria-labelledby='laptop-tab'>
                    <div className='row mb-none-30 mt-50'>
                      {contestData.map(itm => (
                        <div key={itm.id} className='col-xl-4 col-md-6 mb-30'>
                          <ContestCard itm={itm} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div
                    className='tab-pane fade'
                    id='money'
                    role='tabpanel'
                    aria-labelledby='money-tab'>
                    <div className='row mb-none-30 mt-50'>
                      {contestData.map(itm => (
                        <div key={itm.id} className='col-xl-4 col-md-6 mb-30'>
                          <ContestCard itm={itm} />
                        </div>
                      ))}
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className='row pagination-bottom'>
        <Pagination />
      </div> */}
    </section>
  )
}

export default LatestContest
