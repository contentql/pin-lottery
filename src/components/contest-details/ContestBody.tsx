import Countdown from 'react-countdown'
import * as sd from 'simple-duration'

import RendererCountdown from '@/components/common/RendererCountdown'
import VehicleOverview from '@/components/common/VehicleOverview'
import { Contest } from '@/payload-types'

import { useState } from 'react'
import WinningNumber from '../winner/WinningNumber'
import ContestRight from './ContestRight'
import ContestSlider from './ContestSlider'

const ContestBody = ({
  contestDetails,
  handleContestTimerUpdate,
}: {
  contestDetails: Contest
  handleContestTimerUpdate: Function
}) => {
  const [countdownCompleted, setCountdownCompleted] = useState(false)

  const milliseconds = contestDetails?.day_remain
    ? sd.parse(contestDetails?.day_remain) * 1000
    : 1

  const onComplete = () => {
    if (!countdownCompleted) {
      handleContestTimerUpdate()
      setCountdownCompleted(true)
    }
  }

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
                  onClick={() => handleContestTimerUpdate()}>
                  draw tickets now
                </button>
              </div>

              <div className='clock-wrapper'>
                <p className='mb-2'>This contest ends in:</p>
                <div className='clock'>
                  <Countdown
                    key={countdownCompleted ? 'completed' : 'incomplete'}
                    date={
                      Date.parse(contestDetails?.threshold_reached_date) +
                      milliseconds
                    }
                    onComplete={onComplete}
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
              <ContestSlider contestDetails={contestDetails} />

              {/* Contest right section */}
              <ContestRight contestDetails={contestDetails} />
            </div>
          </div>
          <div className='col-lg-10'>
            <div className='contest-description'>
              <VehicleOverview contestDetails={contestDetails} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContestBody
