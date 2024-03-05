import Image from 'next/image'
import { useState } from 'react'
import { FaRedo, FaRegHeart, FaSearch } from 'react-icons/fa'

import winner_tab_1 from '/public/images/icon/winner-tab/1.png'
import winner_tab_2 from '/public/images/icon/winner-tab/2.png'
import winner_tab_3 from '/public/images/icon/winner-tab/3.png'
import winner_tab_4 from '/public/images/icon/winner-tab/4.png'
import winner_tab_5 from '/public/images/icon/winner-tab/5.png'

import ContestCard from '@/components/cards/ContestCard'

import contestData from '@/data/contestData'

const LatestContest = ({ contestDetails }: any) => {
  const [sliderValue, setSliderValue] = useState<number>(0)
  const MAX = 16

  const getBackgroundSize = () => {
    return {
      backgroundSize: `${(sliderValue * 100) / MAX}% 100%`,
    }
  }

  return (
    <section className='pb-120 mt-minus-100'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='contest-wrapper'>
              <div className='contest-wrapper__header pt-120'>
                <h2 className='contest-wrapper__title'>Latest Contest</h2>
                <ul
                  className='nav nav-tabs winner-tab-nav'
                  id='myTab'
                  role='tablist'
                >
                  <li className='nav-item' role='presentation'>
                    <button
                      className='nav-link active'
                      id='dream-tab'
                      data-bs-toggle='tab'
                      data-bs-target='#dream'
                      role='tab'
                      aria-controls='dream'
                      aria-selected='true'
                    >
                      <span className='icon-thumb'>
                        <Image src={winner_tab_1} alt='winner tab 1' />
                      </span>
                      <span>Dream Car</span>
                    </button>
                  </li>
                  <li className='nav-item' role='presentation'>
                    <button
                      className='nav-link'
                      id='bike-tab'
                      data-bs-toggle='tab'
                      data-bs-target='#bike'
                      role='tab'
                      aria-controls='bike'
                      aria-selected='false'
                    >
                      <span className='icon-thumb'>
                        <Image src={winner_tab_2} alt='winner tab 2' />
                      </span>
                      <span>bike</span>
                    </button>
                  </li>
                  <li className='nav-item' role='presentation'>
                    <button
                      className='nav-link'
                      id='watch-tab'
                      data-bs-toggle='tab'
                      data-bs-target='#watch'
                      role='tab'
                      aria-controls='watch'
                      aria-selected='false'
                    >
                      <span className='icon-thumb'>
                        <Image src={winner_tab_3} alt='winner tab 3' />
                      </span>
                      <span>watch</span>
                    </button>
                  </li>
                  <li className='nav-item' role='presentation'>
                    <button
                      className='nav-link'
                      id='laptop-tab'
                      data-bs-toggle='tab'
                      data-bs-target='#laptop'
                      role='tab'
                      aria-controls='laptop'
                      aria-selected='false'
                    >
                      <span className='icon-thumb'>
                        <Image src={winner_tab_4} alt='winner tab 4' />
                      </span>
                      <span>laptop</span>
                    </button>
                  </li>
                  <li className='nav-item' role='presentation'>
                    <button
                      className='nav-link'
                      id='money-tab'
                      data-bs-toggle='tab'
                      data-bs-target='#money'
                      role='tab'
                      aria-controls='money'
                      aria-selected='false'
                    >
                      <span className='icon-thumb'>
                        <Image src={winner_tab_5} alt='winner tab 5' />
                      </span>
                      <span>Money</span>
                    </button>
                  </li>
                </ul>
              </div>
              <div className='contest-wrapper__body'>
                <div className='row contest-filter-wrapper justify-content-center mt-30 mb-none-30'>
                  <div className='col-lg-2 col-sm-6 mb-30'>
                    <div className='select border border-dark rounded-pill'>
                      <select className='border-0 rounded-pill'>
                        <option>SORT BY</option>
                        <option>Filter option</option>
                        <option>Filter option</option>
                        <option>Filter option</option>
                        <option>Filter option</option>
                        <option>Filter option</option>
                        <option>Filter option</option>
                      </select>
                    </div>
                  </div>
                  <div className='col-lg-2 col-sm-6 mb-30'>
                    <div className='select border border-dark rounded-pill pe-2'>
                      <select className='border-0 rounded-pill'>
                        <option>ALL MAKES</option>
                        <option>Filter option</option>
                        <option>Filter option</option>
                        <option>Filter option</option>
                        <option>Filter option</option>
                        <option>Filter option</option>
                        <option>Filter option</option>
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
                            onChange={e =>
                              setSliderValue(Number(e.target.value))
                            }
                            style={getBackgroundSize()}
                            value={sliderValue}
                          />
                        </div>
                        <span className='min-amount'>0</span>
                        <span className='max-amount'>{sliderValue}</span>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-2 col-sm-4 mb-30'>
                    <div className='action-btn-wrapper'>
                      <button type='button' className='action-btn'>
                        <FaRegHeart />
                      </button>
                      <button type='button' className='action-btn'>
                        <FaRedo />
                      </button>
                    </div>
                  </div>
                  <div className='col-lg-3 col-sm-8 mb-30'>
                    <form className='contest-search-form'>
                      <input
                        className='pe-5'
                        type='text'
                        placeholder='SEARCH HERE'
                      />
                      <button>
                        <FaSearch />
                      </button>
                    </form>
                  </div>
                </div>

                <div className='tab-content mt-50' id='myTabContent'>
                  <div
                    className='tab-pane fade show active'
                    id='dream'
                    role='tabpanel'
                    aria-labelledby='dream-tab'
                  >
                    <div className='row mb-none-30 mt-50'>
                      {contestDetails?.map((contest: any) => (
                        <div
                          key={contest.id}
                          className='col-xl-4 col-md-6 mb-30'
                        >
                          <ContestCard itm={contest} />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div
                    className='tab-pane fade'
                    id='bike'
                    role='tabpanel'
                    aria-labelledby='bike-tab'
                  >
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
                    aria-labelledby='watch-tab'
                  >
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
                    aria-labelledby='laptop-tab'
                  >
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
                    aria-labelledby='money-tab'
                  >
                    <div className='row mb-none-30 mt-50'>
                      {contestData.map(itm => (
                        <div key={itm.id} className='col-xl-4 col-md-6 mb-30'>
                          <ContestCard itm={itm} />
                        </div>
                      ))}
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

export default LatestContest
