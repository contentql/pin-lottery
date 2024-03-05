import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import contest_bg from '/public/images/elements/contest-bg.png'
import box from '/public/images/icon/btn/box.png'
import car from '/public/images/icon/btn/car.png'

import ContestCard from '@/components/cards/ContestCard'

import contestData from '@/data/contestData'

const Contest = () => {
  const [filterData, setFilterData] = useState([])
  const [filterBy, setFilterBy] = useState('dream_car')

  useEffect(() => {
    const data = contestData.filter(itm =>
      itm.tags?.find(itme => itme === filterBy),
    ) as []

    setFilterData(data)
  }, [filterBy])

  return (
    <section className='position-relative pt-120 pb-120'>
      <div className='bg-el'>
        <Image src={contest_bg} alt='image' />
      </div>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-lg-8'>
            <div className='section-header text-center'>
              <span className='section-sub-title'>
                Try your chance at winning
              </span>
              <h2 className='section-title'>Current Contest</h2>
              <p>
                Participants buy tickets and lots are drawn to determine the
                winners.
              </p>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-lg-12'>
            <ul
              className='nav nav-tabs justify-content-center mb-30 border-0'
              id='myTab'
              role='tablist'
            >
              <li className='nav-item' role='presentation'>
                <button
                  className='cmn-btn style--two d-flex align-items-center active'
                  id='home-tab'
                  data-bs-toggle='tab'
                  data-bs-target='#home-tab-pane'
                  type='button'
                  role='tab'
                  aria-controls='home-tab-pane'
                  aria-selected='true'
                  onClick={() => setFilterBy('dream_car')}
                >
                  <span className='me-3'>
                    <Image src={car} alt='icon' />
                  </span>
                  Dream Car
                </button>
              </li>
              <li className='nav-item' role='presentation'>
                <button
                  className='cmn-btn style--two d-flex align-items-center'
                  id='profile-tab'
                  data-bs-toggle='tab'
                  data-bs-target='#profile-tab-pane'
                  type='button'
                  role='tab'
                  aria-controls='profile-tab-pane'
                  aria-selected='false'
                  onClick={() => setFilterBy('lifestyle')}
                >
                  <span className='me-3'>
                    <Image src={box} alt='icon' />
                  </span>
                  All lifestyle
                </button>
              </li>
            </ul>
            <div className='tab-content' id='myTabContent'>
              <div
                className='tab-pane fade show active'
                id='home-tab-pane'
                role='tabpanel'
                aria-labelledby='home-tab'
              >
                <div className='row mb-none-30'>
                  {filterData.map((itm: any) => (
                    <div key={itm.id} className='col-xl-4 col-md-6 mb-30'>
                      <ContestCard itm={itm} />
                    </div>
                  ))}
                </div>
              </div>
              <div
                className='tab-pane fade'
                id='profile-tab-pane'
                role='tabpanel'
                aria-labelledby='profile-tab'
              >
                <div className='row mb-none-30'>
                  {filterData.map((itm: any) => (
                    <div key={itm.id} className='col-xl-4 col-md-6 mb-30'>
                      <ContestCard itm={itm} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row mt-30'>
          <div className='col-lg-12'>
            <div className='btn-grp'>
              <Link href='/contest' className='btn-border'>
                browse more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contest
