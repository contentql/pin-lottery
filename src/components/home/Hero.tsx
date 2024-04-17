import RendererCountdown from '../common/RendererCountdown'
import car_light from '/public/images/elements/car-light.png'
import car_ray from '/public/images/elements/car-ray.png'
import car_shadow from '/public/images/elements/car-shadow.png'
import car_star from '/public/images/elements/car-star.png'
import hero_building from '/public/images/elements/hero-building.png'
import hero_shape from '/public/images/elements/hero-shape.jpg.png'
import main_mobile from '/public/images/mobiles/main-mobile.png'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Countdown from 'react-countdown'
import { FaPlay } from 'react-icons/fa'
import Slider from 'react-slick'
import * as sd from 'simple-duration'

import { Contest, Media, Ticket, Winner } from '@/payload-types'
import { trpc } from '@/trpc/client'
import { splitTicketNumber } from '@/utils/split-ticket-number'

const Hero = ({
  HeroContests,
  refetchHeroContests,
}: {
  HeroContests: Contest[]
  refetchHeroContests: Function
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [countdownCompleted, setCountdownCompleted] = useState(false)

  const { mutate: updateContestTimerStatus } =
    trpc.contest.updateContestTimerStatus.useMutation({
      onSuccess: async () => {
        refetchHeroContests()
      },
    })

  const handleContestTimerUpdate = (contestDetails: Contest) => {
    if (
      contestDetails &&
      contestDetails?.reached_threshold &&
      !!contestDetails?.threshold_reached_date &&
      !contestDetails?.contest_timer_status
    ) {
      updateContestTimerStatus({
        id: contestDetails?.id,
        contest_timer_status: true,
      })

      return
    }
  }

  const NextBtn = ({ onClick }: any) => {
    return (
      <button
        type='button'
        className='next-button-slick-hero next-slick-button-position-hero'
        onClick={onClick}>
        <i className='las la-angle-left'></i>
      </button>
    )
  }

  const PrevBtn = ({ onClick }: any) => {
    return (
      <button
        type='button'
        className='next-button-slick-hero prev-slick-button-hero'
        onClick={onClick}>
        <i className='las la-angle-right'></i>
      </button>
    )
  }
  const settings = {
    autoplay: true,
    speed: 1000,
    infinite: true,
    // arrows: false,
    nextArrow: <PrevBtn />,
    prevArrow: <NextBtn />,
    slidesToShow: 1,
    slidesToScroll: 1,
    // vertical: true,
    //verticalSwiping: true,
    // swipeToSlide: true,
    // draggable: true,
  }
  return (
    <>
      {/* <VedioModal
        link='https://www.youtube.com/embed/d6xn5uflUjg'
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      /> */}
      {HeroContests?.length <= 1 ? (
        <section className='hero'>
          <div className='hero__shape'>
            <Image src={hero_shape} alt='image' />
          </div>
          <div className='hero__element'>
            <Image src={hero_building} alt='image' />
          </div>
          <div className='hero__car wow bounceIn'>
            <Image src={car_shadow} alt='image' className='car-shadow' />
            <Image src={car_ray} alt='image' className='car-ray' />
            <Image src={car_light} alt='image' className='car-light' />
            <Image src={main_mobile} alt='image' className='hero-car' />
            <Image src={car_star} alt='image' className='car-star' />
          </div>
          <div className='container'>
            <div className='row justify-content-center justify-content-lg-start'>
              <div className='col-lg-6 col-md-8'>
                <div className='hero__content'>
                  <div className='hero__subtitle'>
                    Contest FOR YOUR CHANCE to
                  </div>
                  <h2 className='hero__title'>big win</h2>
                  <p>
                    Now&#39;s your chance to win a car! Check out the prestige
                    cars you can win in our car prize draws. Will you be our
                    next lucky winner?
                  </p>
                  <div className='hero__btn'>
                    <Link href='/contest' className='cmn-btn'>
                      Participate Now
                    </Link>
                    <button
                      className='video-btn'
                      onClick={() => setIsOpen(true)}>
                      <FaPlay />
                    </button>
                  </div>
                </div>
              </div>
              <div className='col-lg-6'>
                <div className='hero__thumb'>
                  <Image src={main_mobile} alt='' />
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Slider {...settings}>
          {HeroContests?.map((contest, i) => {
            const milliseconds = contest?.day_remain
              ? sd.parse(contest?.day_remain) * 1000
              : 1

            const onComplete = () => {
              if (!countdownCompleted) {
                handleContestTimerUpdate(contest)
                setCountdownCompleted(true)
              }
            }

            return (
              <section key={contest?.id} className='hero'>
                <div className='hero__shape'>
                  <Image src={hero_shape} alt='image' />
                </div>
                <div className='hero__element'>
                  <Image src={hero_building} alt='image' />
                </div>
                <div className='hero__car wow bounceIn'>
                  <Image src={car_shadow} alt='image' className='car-shadow' />
                  <Image src={car_ray} alt='image' className='car-ray' />
                  <Image src={car_light} alt='image' className='car-light' />
                  <Image
                    src={(contest?.img as Media)?.url || ''}
                    width={500}
                    height={200}
                    alt='image'
                    className='hero-car'
                  />
                  <Image src={car_star} alt='image' className='car-star' />
                </div>
                <div className='container'>
                  <div className='row justify-content-center justify-content-lg-start'>
                    <div className='col-lg-6 col-md-8'>
                      <div className='hero__content'>
                        {contest?.threshold_reached_date &&
                          !contest?.contest_status &&
                          !contest?.winner_ticket && (
                            <div className='clock-wrapper-hero'>
                              <p>This competition ends in:</p>
                              <div className='clock'>
                                <Countdown
                                  key={
                                    countdownCompleted
                                      ? 'completed'
                                      : 'incomplete'
                                  }
                                  date={
                                    Date.parse(
                                      contest?.threshold_reached_date,
                                    ) + milliseconds
                                  }
                                  onComplete={onComplete}
                                  renderer={props => (
                                    <RendererCountdown {...props} />
                                  )}
                                />
                              </div>
                            </div>
                          )}
                        {contest?.contest_status &&
                          contest?.winner_ticket &&
                          contest?.reached_threshold &&
                          contest?.threshold_reached_date && (
                            <div className='clock-wrapper-hero'>
                              <p>Winning number:</p>
                              <div className='winner-card__hero'>
                                <div className='content-bottom'>
                                  <div className='number-list-wrapper'>
                                    <ul className='number-list'>
                                      {splitTicketNumber(
                                        (
                                          (
                                            contest?.winner_ticket
                                              ?.value as Winner
                                          )?.ticket?.value as Ticket
                                        )?.ticket_number,
                                      )?.map((itm: any, i: any) => (
                                        <li key={i}>{itm}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        {!contest?.winner_ticket &&
                          !contest?.reached_threshold &&
                          !contest?.threshold_reached_date && (
                            <div className='clock-wrapper-hero'>
                              <p>
                                Ticket price :
                                <span className='hero-span-data'>
                                  ${contest?.ticket_price}
                                </span>
                              </p>
                              <p className='mt-3'>
                                Contest number:{' '}
                                <span className='hero-span-data'>
                                  {contest?.contest_no}
                                </span>
                              </p>
                            </div>
                          )}
                        <h1>{contest?.title}</h1>
                        <p className='line-clamp-3'>
                          {contest?.hero_description}
                        </p>
                        {/* <div className='hero__btn'>
                      <p>
                        <span className='strong'>Contest Number: </span>
                        <span>{contest?.contest_no}</span>
                      </p>
                      <p>
                        <span className='strong'>Ticket Price: </span>
                        <span>{contest?.ticket_price}</span>
                      </p>
                    </div> */}

                        <div className='hero__btn'>
                          {!contest?.contest_status &&
                          !contest?.winner_ticket ? (
                            <Link
                              className='cmn-btn'
                              href={`/contest/${contest?.id}`}>
                              {' '}
                              Buy Now
                            </Link>
                          ) : (
                            <Link
                              className='cmn-btn'
                              href={`/contest/${contest?.id}`}>
                              {' '}
                              View more details
                            </Link>
                          )}
                          {/* <button
                        className='video-btn'
                        onClick={() => setIsOpen(true)}>
                        <FaPlay />
                      </button> */}
                        </div>
                      </div>
                    </div>
                    <div className='col-lg-6'>
                      <div className='hero__thumb'>
                        <Image src={main_mobile} alt='' />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )
          })}
        </Slider>
      )}
    </>
  )
}

export default Hero
