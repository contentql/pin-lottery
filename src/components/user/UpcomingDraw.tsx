import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import Slider from 'react-slick'

import circle_border from '/public/images/elements/circle-border.png'

import 'slick-carousel/slick/slick.css'

import { Contest, Ticket } from '@/payload-types'
import { splitTicketNumber } from '@/utils/split-ticket-number'

const NextBtn = ({ onClick }: any) => {
  return (
    <button
      type='button'
      className='d-flex align-items-center justify-content-center slick-arrow prev'
      onClick={onClick}>
      <BsArrowLeft />
    </button>
  )
}

const PrevBtn = ({ onClick }: any) => {
  return (
    <button
      type='button'
      className='d-flex align-items-center justify-content-center slick-arrow next'
      onClick={onClick}>
      <BsArrowRight />
    </button>
  )
}

const UpcomingDraw = ({
  upcomingDrawTicketsData,
}: {
  upcomingDrawTicketsData: Ticket[]
}) => {
  const router = useRouter()

  const settings = {
    slidesToShow: 2,
    slidesToScroll: 1,
    infinite: false,
    speed: 700,
    arrows: true,
    dots: false,
    prevArrow: <NextBtn />,
    nextArrow: <PrevBtn />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  return (
    <div className='upcoming-draw-wrapper'>
      <h3 className='title'>Upcoming Draws</h3>
      <Slider {...settings} className='draw-ticket-slider'>
        {upcomingDrawTicketsData?.map((ticket, index) => {
          const contestId = (ticket?.contest_id?.value as Contest)?.id

          return (
            <div key={index} className='silgle'>
              <div
                className='draw-single-ticket upcoming-draw-ticket'
                onClick={() => {
                  router.push(`/contest/${contestId}`)
                }}>
                <div className='draw-single-ticket__header'>
                  <div className='left'>Ticket #{index + 1}</div>
                  <div className='right'>
                    Contest No:{' '}
                    {(ticket?.contest_id?.value as Contest)?.contest_no}
                  </div>
                </div>
                <div className='circle-divider'>
                  <Image src={circle_border} alt='circle border' />
                </div>
                <ul className='ticket-numbers-list'>
                  {splitTicketNumber(ticket?.ticket_number).map(
                    (num: string, idx: number) => (
                      <li key={idx}>{num}</li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          )
        })}
      </Slider>
    </div>
  )
}

export default UpcomingDraw
