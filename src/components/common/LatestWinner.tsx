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

interface WinnerFilters {
  filterWinnerByTag: string
  ticketNumber: string
}

const LatestWinner = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const [winners, setWinners] = useState<Winner[]>([])

  const [winnerFilters, setWinnerFilters] = useState<WinnerFilters>({
    filterWinnerByTag: 'all',
    ticketNumber: '',
  })

  const { mutate: contestWinners } =
    trpc.winner.getWinnerByTicketNumber.useMutation({
      onSuccess: data => {
        setWinners(data)
        toast.success(`congrats winner found`)
      },
    })

  console.log('winner', winners)

  // const { data: contestId } = trpc.contest?.getContestIds.useQuery({
  //   id: winnerFilters?.filterWinnerByTag,
  // })

  // const temp = contestId?.map(contest => contest?.id)

  const { mutate: getTicketId } = trpc.ticket.getTicketId.useMutation({
    onSuccess: (data: any) => {
      contestWinners({ filterWinnerByTag: 'all', ticketNumber: data.id })
    },
    onError: () => {
      toast.error(`invalid ticket number`)
    },
  })

  const { data: winnersData } = trpc.winner.getWinners.useQuery()

  const handleCheckWinner = (e: any) => {
    e.preventDefault()
    getTicketId({ ticket_no: winnerFilters?.ticketNumber })
  }

  const handleClearFilters = () => {
    setWinners([])
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

  console.log('tag filter', winnerFilters?.filterWinnerByTag)

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
                    />
                  </div>
                  <div className='col-lg-8 mb-30'>
                    {/* winner card */}

                    {winners.length <= 0
                      ? winnersData?.map(winner => (
                          <WinnerCard
                            key={winner.id}
                            winner={winner as Winner}
                          />
                        ))
                      : winners?.map(winner => (
                          <WinnerCard
                            key={winner.id}
                            winner={winner as Winner}
                          />
                        ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LatestWinner
