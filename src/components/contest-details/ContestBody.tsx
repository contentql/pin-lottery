import Countdown from 'react-countdown'
import * as sd from 'simple-duration'

import RendererCountdown from '@/components/common/RendererCountdown'
import VehicleOverview from '@/components/common/VehicleOverview'
import { Contest, Media } from '@/payload-types'

import WinningNumber from '../winner/WinningNumber'
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

const ContestBody = ({
  contestDetails,
  handleDrawTickets,
}: {
  contestDetails: Contest
  handleDrawTickets: Function
}) => {
  const milliseconds = contestDetails?.day_remain
    ? sd.parse(contestDetails?.day_remain) * 1000
    : 1

  return (
    <section className='pb-120 mt-minus-300'>
      {contestDetails?.contest_status && (
        <WinningNumber contestDetails={contestDetails} />
      )}
      <div className='container'>
        <div className='row justify-content-center'>
          {!!contestDetails?.reached_threshold &&
          !!contestDetails?.threshold_reached_date &&
          !contestDetails?.contest_status ? (
            <div className='col-lg-6'>
              <div className='draw-tickets-btn'>
                <button
                  className='cmn-btn style--one btn-sm'
                  onClick={() => handleDrawTickets()}>
                  draw tickets now
                </button>
              </div>

              <div className='clock-wrapper'>
                <p className='mb-2'>This contest ends in:</p>
                <div className='clock'>
                  <Countdown
                    date={
                      Date.parse(contestDetails?.threshold_reached_date) +
                      milliseconds
                    }
                    renderer={props => <RendererCountdown {...props} />}
                  />
                </div>
              </div>
            </div>
          ) : (
            ''
          )}

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
              <VehicleOverview
                contestDetails={contestDetails as ContestDetails}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContestBody
