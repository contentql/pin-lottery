import { Contest, Media } from '@/payload-types'
import Image from 'next/image'
import { useState } from 'react'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'

interface ContestDetails extends Contest {
  img: Media
  images?:
    | {
        product_images: Media
        id?: string | null
      }[]
    | null
}

const NextBtn = ({ onClick }: any) => {
  return (
    <button type='button' className='slick-arrow prev' onClick={onClick}>
      <i className='las la-angle-left'></i>
    </button>
  )
}

const PrevBtn = ({ onClick }: any) => {
  return (
    <button type='button' className='slick-arrow next' onClick={onClick}>
      <i className='las la-angle-right'></i>
    </button>
  )
}

const ContestSlider = ({
  contestDetails,
}: {
  contestDetails: ContestDetails
}) => {
  const [nav1, setNav1] = useState()
  const [nav2, setNav2] = useState()

  const settings = {
    slidesToShow: 3,
    swipeToSlide: true,
    focusOnSelect: true,
    nextArrow: <PrevBtn />,
    prevArrow: <NextBtn />,
    centerPadding: '0px',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  return (
    <div className='contest-cart__left'>
      <div className='contest-cart__slider-area'>
        <Slider
          asNavFor={nav2}
          arrows={false}
          ref={(slider1: any) => setNav1(slider1)}
          className='contest-cart__thumb-slider'
        >
          {contestDetails?.images?.map(itm => (
            <div key={itm.id} className='single'>
              <div className='single-slide'>
                <Image
                  src={itm?.product_images?.url || '/'}
                  width={100}
                  height={100}
                  alt='image'
                />
              </div>
            </div>
          ))}
        </Slider>

        <Slider
          asNavFor={nav1}
          ref={(slider2: any) => setNav2(slider2)}
          {...settings}
          className='contest-cart__nav-slider'
        >
          {contestDetails?.images?.map(itm => (
            <div key={itm.id} className='single'>
              <div className='single-slide'>
                <Image
                  src={itm?.product_images?.url || '/'}
                  width={100}
                  height={100}
                  alt='image'
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default ContestSlider
