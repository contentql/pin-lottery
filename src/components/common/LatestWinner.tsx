import '../../../src/styles/layout/custom/_pagination.scss'
import WinnerCard from '../cards/WinnerCard'
import FilterByTag from '../filters/FilterByTag'
import WinnerCardSkeleton from '../skeletons/WinnerCardSkeleton'
import w_el_1 from '/public/images/elements/w-el-1.png'
import w_el_2 from '/public/images/elements/w-el-2.png'
import w_el_3 from '/public/images/elements/w-el-3.png'
import Image from 'next/image'
import { useState } from 'react'
import ResponsivePagination from 'react-responsive-pagination'
import { useLocalStorage } from 'usehooks-ts'

import TicketCheckCard from '@/components/cards/TicketCheckCard'
import { Winner } from '@/payload-types'
import { trpc } from '@/trpc/client'

interface WinnerFiltersProps {
  filterWinnerByTag: string
  ticketNumber: string
  contestNumber: string
}

const LatestWinner = () => {
  const initialValue: WinnerFiltersProps = {
    filterWinnerByTag: 'all',
    ticketNumber: '',
    contestNumber: '',
  }
  const [filters, setFilters, removeFilters] =
    useLocalStorage<WinnerFiltersProps>('winnerFilters', initialValue)
  const [winnerFilters, setWinnerFilters] = useState({
    filterWinnerByTag: filters?.filterWinnerByTag
      ? filters?.filterWinnerByTag
      : 'all',
    ticketNumber: filters?.ticketNumber ? filters?.ticketNumber : '',
    contestNumber: filters?.contestNumber ? filters?.contestNumber : '',
  })

  const [pageNumber, setPageNumber] = useState(1)
  const templatesPerPage = 5

  const { data: WinnersData, isPending: isWinnerDataPending } =
    trpc.winner.getWinners.useQuery()

  const handleSearchByTicketNumber = (data: any) => {
    setFilters({
      ...filters,
      ticketNumber: data?.ticketNumber,
      contestNumber: data.contestNumber,
    })
    setWinnerFilters({
      ...winnerFilters,
      ticketNumber: data.ticketNumber,
      contestNumber: data.contestNumber,
    })
    setPageNumber(1)
  }

  const handleSearchTag = (tag: string) => {
    setFilters({ ...filters, filterWinnerByTag: tag })
    setWinnerFilters({
      ...winnerFilters,
      filterWinnerByTag: tag,
    })
    setPageNumber(1)
  }

  const handleFilterByTag = (contest: any) => {
    if (winnerFilters.filterWinnerByTag === 'all') return true
    return (
      contest?.contest?.value.product_type === winnerFilters.filterWinnerByTag
    )
  }

  const handleFilterByTicketNumber = (winner: any) => {
    if (
      winnerFilters?.ticketNumber === '' ||
      winnerFilters?.contestNumber === ''
    )
      return true
    return (
      winner?.ticket?.value?.ticket_number === winnerFilters.ticketNumber &&
      winner?.contest?.value?.contest_no === winnerFilters.contestNumber
    )
  }
  const handleClearFilters = () => {
    removeFilters()
    setWinnerFilters({
      ...winnerFilters,
      filterWinnerByTag: 'all',
      ticketNumber: '',
      contestNumber: '',
    })
    setPageNumber(1)
  }

  const contestsLength = WinnersData?.filter(handleFilterByTag).filter(
    handleFilterByTicketNumber,
  ).length

  const indexOfLastTemplate = pageNumber * templatesPerPage
  const indexOfFirstTemplate = indexOfLastTemplate - templatesPerPage
  const currentTemplates = WinnersData?.filter(handleFilterByTag)
    .filter(handleFilterByTicketNumber)
    .slice(indexOfFirstTemplate, indexOfLastTemplate)

  return (
    <section
      className='latest-winner-section position-relative pt-120 pb-120'
      id='winner_id'>
      <div className='el-1'>
        <Image src={w_el_1} alt='image' />
      </div>
      <div className='el-2'>
        <Image src={w_el_2} alt='image' />
      </div>
      <div className='el-3'>
        <Image src={w_el_3} alt='image' />
      </div>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-lg-8'>
            <div className='section-header text-center'>
              <span className='section-sub-title'>
                Meet the latest winners from your favorite contest
              </span>
              <h2 className='section-title'>Latest Winners</h2>
              <p>
                Check your ticket number&#39;s to see if you are a Winner in the
                Dream Lottery.
              </p>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-12'>
            <FilterByTag
              filter={winnerFilters?.filterWinnerByTag}
              handleSearch={handleSearchTag}
            />
            <div className='tab-content mt-50' id='winnerTabContent'>
              <div
                className='tab-pane fade show active'
                id='dream'
                role='tabpanel'
                aria-labelledby='dream-tab'>
                <div className='row mb-none-30'>
                  <div className='col-lg-4 mb-30'>
                    {/* ticket check card */}
                    <TicketCheckCard
                      winnerFilters={winnerFilters}
                      setWinnerFilters={setWinnerFilters}
                      handleClearFilters={handleClearFilters}
                      handleSearchByTicketNumber={handleSearchByTicketNumber}
                    />
                  </div>
                  <div className='col-lg-8 mb-30'>
                    {/* winner card */}

                    {isWinnerDataPending ? (
                      <WinnerCardSkeleton />
                    ) : currentTemplates?.length! > 0 ? (
                      currentTemplates?.map((winner: any) => (
                        <WinnerCard key={winner.id} winner={winner as Winner} />
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className='row pagination-bottom'>
          {/* <WinnerPagination
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            totalContests={contestsLength}
          /> */}
          <ResponsivePagination
            current={pageNumber}
            total={Math.ceil((contestsLength as number) / templatesPerPage)}
            onPageChange={setPageNumber}
          />
        </div>
      </div>
    </section>
  )
}

export default LatestWinner
