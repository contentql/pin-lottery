import RendererCountdown from '@/components/common/RendererCountdown'
import VehicleOverview from '@/components/common/VehicleOverview'
import { Contest, Media } from '@/payload-types'
import Countdown from 'react-countdown'

import ContestRight from './ContestRight'
import ContestSlider from './ContestSlider'

interface ContestDetails extends Contest {
  img: Media
  images?:
    | {
        product_images: Media
        id?: string | null
      }[]
    | null
  features_html: string
  description_html: string
}

const ContestBody = ({ contestDetails }: { contestDetails: Contest }) => {
  return (
    <section className='pb-120 mt-minus-300'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-lg-6'>
            <div className='clock-wrapper'>
              <p className='mb-2'>This competition ends in:</p>
              <div className='clock'>
                <Countdown
                  date={Date.now() + 1000000000}
                  renderer={RendererCountdown}
                />
              </div>
            </div>
          </div>

          <div className='col-lg-12'>
            <div className='contest-cart'>
              {/* Context slider for one */}
              <ContestSlider
                contestDetails={contestDetails as ContestDetails}
              />

              {/* Contest right section */}
              <ContestRight contestDetails={contestDetails} />
            </div>
          </div>

          <div className='col-lg-10'>
            <div className='contest-description'>
              <ul
                className='nav nav-tabs justify-content-center mb-30 pb-4 border-0'
                id='myTab'
                role='tablist'
              >
                <li className='nav-item' role='presentation'>
                  <button
                    className='cmn-btn active'
                    id='description-tab'
                    data-bs-toggle='tab'
                    data-bs-target='#description'
                    role='tab'
                    aria-controls='description'
                    aria-selected='true'
                  >
                    <span className='mr-3'></span> description
                  </button>
                </li>
                <li className='nav-item' role='presentation'>
                  <button
                    className='cmn-btn'
                    id='details-tab'
                    data-bs-toggle='tab'
                    data-bs-target='#details'
                    role='tab'
                    aria-controls='details'
                    aria-selected='false'
                  >
                    <span className='mr-3'></span>competition details
                  </button>
                </li>
              </ul>

              <div className='tab-content' id='myTabContent'>
                <div
                  className='tab-pane fade show active'
                  id='description'
                  role='tabpanel'
                  aria-labelledby='description-tab'
                >
                  {/* vehicle Overview here */}
                  <VehicleOverview
                    contestDetails={contestDetails as ContestDetails}
                  />
                  s
                </div>
                <div
                  className='tab-pane fade'
                  id='details'
                  role='tabpanel'
                  aria-labelledby='details-tab'
                >
                  <div className='content-block'>
                    <h3 className='title'>Competition Details</h3>
                    <p>
                      Lorem ipsum dolor, consectetur adipiscing elit. Duis sed
                      ex eget mi sollicitudin consequat. Sed rhoncus ligula vel
                      justo dignissim aliquam. Maecenas non est vitae ipsum
                      luctus feugiat. Fusce purus nunc, sodales at condimentum
                      sed, ullamcorper a nulla. Nam justo est, venenatis quis
                      tellus in, volutpat eleifend nunc. Vestibulum congue
                      laoreet mi non interdum. Ut ut dapibus tellus.
                    </p>
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

export default ContestBody
