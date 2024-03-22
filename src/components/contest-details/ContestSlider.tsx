'use client'
import Image from 'next/image'
import { useState } from 'react'
import Slider from 'react-slick'

import { Contest, Media } from '@/payload-types'
import 'slick-carousel/slick/slick.css'

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
    slidesToScroll: 1,
    dots: false,
    centerMode: true,
    nextArrow: <PrevBtn />,
    prevArrow: <NextBtn />,
    centerPadding: '0px',
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 481,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  return (
    <div className='contest-cart__left'>
      <div className='contest-details__slider-area'>
        <Slider
          asNavFor={nav2}
          arrows={false}
          ref={(slider1: any) => setNav1(slider1)}>
          {contestDetails?.images?.map(itm => (
            <div key={itm?.id} className='contest-cart__thumb-slider'>
              <div key={itm?.id} className='single-slide'>
                <Image
                  src={itm?.product_images?.url || '/'}
                  width={1000}
                  height={100}
                  alt='contest b2'
                />
              </div>
            </div>
          ))}
        </Slider>

        <div>
          <Slider
            asNavFor={nav1}
            ref={(slider2: any) => setNav2(slider2)}
            {...settings}
            className='contest-cart__nav-slider'>
            {contestDetails?.images?.map(itm => (
              <div key={itm?.id} className='single'>
                <div key={itm?.id} className='single-slide'>
                  <Image
                    src={itm?.product_images?.url || '/'}
                    width={1000}
                    height={10}
                    alt='contest s1'
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default ContestSlider
