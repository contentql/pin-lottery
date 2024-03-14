import Countdown from 'react-countdown'

import RendererCountdown from '@/components/common/RendererCountdown'
import VehicleOverview from '@/components/common/VehicleOverview'
import { Contest, Media } from '@/payload-types'
import { isThresholdReached } from '@/utils/is-threshold-reached'

import { AppContext } from '@/context/context'
import { useContext } from 'react'
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
  const { tickets }: any = useContext(AppContext)

  const totalTicketsSold = tickets?.length

  return (
    <section className='pb-120 mt-minus-300'>
      <div className='container'>
        <div className='row justify-content-center'>
          {isThresholdReached(
            contestDetails?.product_price,
            contestDetails?.ticket_price,
            totalTicketsSold,
          ) ? (
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
