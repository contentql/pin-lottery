'use client'
import Image from 'next/image'
import { useState } from 'react'
import Slider from 'react-slick'

import { Contest, Media } from '@/payload-types'
import 'slick-carousel/slick/slick.css'

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

const ContestSlider = ({ contestDetails }: { contestDetails: Contest }) => {
  const [nav1, setNav1] = useState()
  const [nav2, setNav2] = useState()

  const [toggleView, setToggleView] = useState(false)

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
    <>
      <div className='contest-cart__left'>
        {contestDetails?.winner_ticket && contestDetails.contest_status && (
          <div className='badge badge-top-right'>
            <span>Ended</span>
          </div>
        )}
        <div>
          <Slider
            asNavFor={nav2}
            arrows={false}
            ref={(slider1: any) => setNav1(slider1)}>
            {contestDetails?.images?.map(itm => (
              <div key={itm?.id} className='contest-cart__thumb-slider'>
                <div key={itm?.id} className='single-slide'>
                  <Image
                    style={{
                      cursor: 'zoom-in',
                      alignSelf: 'center',
                      objectFit: 'cover',
                    }}
                    src={(itm?.product_images as Media)?.url || '/'}
                    width={(itm?.product_images as Media)?.width as number}
                    height={(itm?.product_images as Media)?.height as number}
                    alt='contest b2'
                    // className='hide-bg'
                    // onClick={() => {
                    //   setToggleView(true)
                    // }}
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
                      style={{
                        alignSelf: 'center',
                        objectFit: 'contain',
                      }}
                      src={(itm?.product_images as Media)?.url || '/'}
                      width={100}
                      height={20}
                      alt='contest s1'
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* {toggleView && (
          <div className='overlay'>
            <div className='overlay-content'>
              <div className='contest-big__center'>
                <div className='contest-image'>
                  <Slider
                    asNavFor={nav2}
                    arrows={true}
                    ref={(slider1: any) => setNav1(slider1)}>
                    {contestDetails?.images?.map(itm => (
                      <div key={itm?.id} className='contest-big__thumb-slider'>
                        <div key={itm?.id} className='single-slide'>
                          <Image
                            src={(itm?.product_images as Media)?.url || '/'}
                            width={1290}
                            height={1290}
                            alt='contest b2'
                          />
                        </div>
                      </div>
                    ))}
                  </Slider>
                  <div className='modal-close'>
                    <span
                      onClick={() => {
                        setToggleView(false)
                      }}
                      className='close-button-x'>
                      X
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </>
  )
}

export default ContestSlider
