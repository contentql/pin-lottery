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
import { toast } from 'react-toastify'
import WinnerCard from '../cards/WinnerCard'

import Pagination from './Pagination'

const LatestWinner = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const ticketNumber = searchParams.get('ticketNumber') ?? ''
  const tag = searchParams.get('tag') ?? 'all'

  const [winnerFilters, setWinnerFilters] = useState({
    filterWinnerByTag: 'all',
    ticketNumber: '',
  })

  const [pageNumber, setPageNumber] = useState(1)

  // const { data: contestId } = trpc.contest?.getContestIds.useQuery({
  //   id: tag!,
  // })

  // const temp = contestId?.map(contest => contest?.id) ?? []

  // const { data: winnersData } = trpc.winner.getWinners.useQuery({
  //   pageNumber: pageNumber,
  //   ticketNumber: winner!,
  //   contestIds: temp!,
  // })

  const onsubmit = (data: any) => {
    console.log('hook form', data)
    const {} = data
    const search = new URLSearchParams(searchParams)
    search.set('ticketNumber', data?.ticketNumber)
    router.push(`${pathname}?${search.toString()}#winner_id`)
  }

  const { data: winnersData } = trpc.winner.getWinnersByAggregations.useQuery({
    tag: tag,
    pageNumber: 1,
    ticketNumber: ticketNumber,
  })

  console.log('aggregations', winnersData)

  const { mutate: getTicketId } = trpc.ticket.getTicketId.useMutation({
    onSuccess: (data: any) => {
      toast.success('Thanks for participating searching winner')
      if (data?.id === undefined) {
        toast.error('invalid ticket number')
      } else {
        const search = new URLSearchParams(searchParams)
        search.set('winner', data?.id)
        router.push(`${pathname}?${search.toString()}#winner_id`)
      }
    },
    onError: () => {
      toast.error(`incorrect ticket number`)
    },
  })

  const handleCheckWinner = (e: any) => {
    e.preventDefault()
    getTicketId({ ticket_no: winnerFilters?.ticketNumber })
  }

  const handleSearchTag = (tag: string) => {
    const search = new URLSearchParams(searchParams)
    search.set('tag', tag.toString())
    router.push(`${pathname}?${search.toString()}#winner_id`)
    setWinnerFilters({
      ...winnerFilters,
      filterWinnerByTag: tag,
    })
  }

  const handleClearFilters = () => {
    const params = new URLSearchParams()
    router.push(`${pathname}?${params.toString()}#winner_id`)
    setWinnerFilters({
      ...winnerFilters,
      filterWinnerByTag: 'all',
    })
  }

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
                      handleCheckWinner={handleCheckWinner}
                      handleClearFilters={handleClearFilters}
                      onsubmit={onsubmit}
                    />
                  </div>
                  <div className='col-lg-8 mb-30'>
                    {/* winner card */}

                    {winnersData?.winners.map((winner: any) => (
                      <WinnerCard key={winner.id} winner={winner as Winner} />
                    ))
                    // : contestWinners?.map(winner => (
                    //     <WinnerCard
                    //       key={winner.id}
                    //       winner={winner as Winner}
                    //     />
                    //   ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className='row pagination-bottom'>
          <Pagination
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            totalContests={winnersData?.totalDocs}
          />
        </div>
      </div>
    </section>
  )
}

export default LatestWinner
