import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import FilterByTag from '../filters/FilterByTag'
import w_el_1 from '/public/images/elements/w-el-1.png'
import w_el_2 from '/public/images/elements/w-el-2.png'
import w_el_3 from '/public/images/elements/w-el-3.png'

import TicketCheckCard from '@/components/cards/TicketCheckCard'
import { Winner } from '@/payload-types'
import { trpc } from '@/trpc/client'
import { useState } from 'react'
import WinnerCard from '../cards/WinnerCard'

import WinnerPagination from './WinnerPagination'

const LatestWinner = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const [winnerFilters, setWinnerFilters] = useState({
    filterWinnerByTag: searchParams?.get('tag')
      ? searchParams?.get('tag')
      : 'all',
    ticketNumber: searchParams?.get('ticketNumber')
      ? searchParams?.get('ticketNumber')
      : '',
  })

  const [pageNumber, setPageNumber] = useState(1)
  const templatesPerPage = 5

  const { data: WinnersData } = trpc.winner.getWinners.useQuery()
  console.log('winners', WinnersData)

  const handleSearchByTicketNumber = (data: any) => {
    console.log('hook form', data)
    const search = new URLSearchParams(searchParams)
    search.set('ticketNumber', data?.ticketNumber)
    router.push(`${pathname}?${search.toString()}#winner_id`)
    setWinnerFilters({ ...winnerFilters, ticketNumber: data.ticketNumber })
    setPageNumber(1)
  }

  const handleSearchTag = (tag: string) => {
    const search = new URLSearchParams(searchParams)
    search.set('tag', tag.toString())
    router.push(`${pathname}?${search.toString()}#winner_id`)
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
    if (winnerFilters?.ticketNumber === '') return true
    return winner?.ticket?.value?.ticket_number === winnerFilters.ticketNumber
  }

  const handleClearFilters = () => {
    const params = new URLSearchParams()
    router.push(`${pathname}?${params.toString()}#winner_id`)
    setWinnerFilters({
      ...winnerFilters,
      filterWinnerByTag: 'all',
      ticketNumber: '',
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
    <section className='latest-winner-section position-relative pt-120 pb-120'>
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
          <div className='col-lg-12' id='winner_id'>
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

                    {currentTemplates?.map((winner: any) => (
                      <WinnerCard key={winner.id} winner={winner as Winner} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className='row pagination-bottom'>
          <WinnerPagination
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            totalContests={contestsLength}
          />
        </div>
      </div>
    </section>
  )
}

export default LatestWinner
