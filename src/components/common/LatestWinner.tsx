import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import FilterByTag from '../filters/FilterByTag'
import w_el_1 from '/public/images/elements/w-el-1.png'
import w_el_2 from '/public/images/elements/w-el-2.png'
import w_el_3 from '/public/images/elements/w-el-3.png'

import TicketCheckCard from '@/components/cards/TicketCheckCard'
import WinnerCard from '@/components/cards/WinnerCard'

import winnerData from '@/data/winnerData'
import { Winner } from '@/payload-types'
import { trpc } from '@/trpc/client'

const LatestWinner = () => {
  const [winners, setWinners] = useState(winnerData)
  const { data: contestWinners } = trpc.winner.getWinners.useQuery()
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
          <div className='col-lg-12'>
            <FilterByTag />
            <div className='tab-content mt-50' id='winnerTabContent'>
              <div
                className='tab-pane fade show active'
                id='dream'
                role='tabpanel'
                aria-labelledby='dream-tab'>
                <div className='row mb-none-30'>
                  <div className='col-lg-4 mb-30'>
                    {/* ticket check card */}
                    <TicketCheckCard />
                  </div>
                  <div className='col-lg-8 mb-30'>
                    {/* winner card */}

                    {contestWinners?.map(winner => (
                      <WinnerCard key={winner.id} winner={winner as Winner} />
                    ))}

                    <div className='btn-grp'>
                      <Link href='winner' className='btn-border'>
                        browse more
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className='tab-pane fade'
                id='bike'
                role='tabpanel'
                aria-labelledby='bike-tab'>
                <div className='row mb-none-30'>
                  <div className='col-lg-4 mb-30'>
                    {/* ticket check card */}
                    <TicketCheckCard />
                  </div>
                  <div className='col-lg-8 mb-30'>
                    {/* winner card */}

                    {/* {winners.map(winner => (
                      <WinnerCard key={winner.id} winner={winner} />
                    ))} */}

                    <div className='btn-grp'>
                      <Link href='winner' className='btn-border'>
                        browse more
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className='tab-pane fade'
                id='watch'
                role='tabpanel'
                aria-labelledby='watch-tab'>
                <div className='row mb-none-30'>
                  <div className='col-lg-4 mb-30'>
                    {/* ticket check card */}
                    <TicketCheckCard />
                  </div>
                  <div className='col-lg-8 mb-30'>
                    {/* winner card */}

                    {/* {winners.map(winner => (
                      <WinnerCard key={winner.id} winner={winner} />
                    ))} */}

                    <div className='btn-grp'>
                      <Link href='/winner' className='btn-border'>
                        browse more
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className='tab-pane fade'
                id='laptop'
                role='tabpanel'
                aria-labelledby='laptop-tab'>
                <div className='row mb-none-30'>
                  <div className='col-lg-4 mb-30'>
                    {/* ticket check card */}
                    <TicketCheckCard />
                  </div>
                  <div className='col-lg-8 mb-30'>
                    {/* winner card */}

                    {/* {winners.map(winner => (
                      <WinnerCard key={winner.id} winner={winner} />
                    ))} */}

                    <div className='btn-grp'>
                      <Link href='winner' className='btn-border'>
                        browse more
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className='tab-pane fade'
                id='money'
                role='tabpanel'
                aria-labelledby='money-tab'>
                <div className='row mb-none-30'>
                  <div className='col-lg-4 mb-30'>
                    {/* ticket check card */}
                    <TicketCheckCard />
                  </div>
                  <div className='col-lg-8 mb-30'>
                    {/* winner card */}
                    {/* {winners.map(winner => (
                      <WinnerCard key={winner.id} winner={winner} />
                    ))} */}

                    <div className='btn-grp'>
                      <Link href='/winner' className='btn-border'>
                        browse more
                      </Link>
                    </div>
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
