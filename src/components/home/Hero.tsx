import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import car_light from '/public/images/elements/car-light.png'
import car_ray from '/public/images/elements/car-ray.png'
import car_shadow from '/public/images/elements/car-shadow.png'
import car_star from '/public/images/elements/car-star.png'
import hero_building from '/public/images/elements/hero-building.png'
import hero_shape from '/public/images/elements/hero-shape.jpg.png'
import main_mobile from '/public/images/mobiles/main-mobile.png'

import VedioModal from '@/components/vedioModal/VedioModal'
import { Contest, Media } from '@/payload-types'
import Slider from 'react-slick'
const Hero = ({ HeroContests }: { HeroContests: Contest[] }) => {
  const [isOpen, setIsOpen] = useState(false)
  const NextBtn = ({ onClick }: any) => {
    return (
      <button
        type='button'
        className='next-button-slick next-slick-button-position'
        onClick={onClick}>
        <i className='las la-angle-left'></i>
      </button>
    )
  }

  const PrevBtn = ({ onClick }: any) => {
    return (
      <button
        type='button'
        className='next-button-slick prev-slick-button'
        onClick={onClick}>
        <i className='las la-angle-right'></i>
      </button>
    )
  }
  const settings = {
    autoplay: true,
    speed: 700,
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
      <VedioModal
        link='https://www.youtube.com/embed/d6xn5uflUjg'
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <Slider {...settings}>
        {HeroContests?.map((contest, i) => (
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
                    {/* <div className='hero__subtitle'>
                      Contest FOR YOUR CHANCE to Win
                    </div> */}
                    <h1>{contest?.title}</h1>
                    <p className='line-clamp'>{contest?.hero_description}</p>
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
                      <Link
                        className='cmn-btn'
                        href={`/contest/${contest?.id}`}>
                        {' '}
                        Buy Now
                      </Link>
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
        ))}
      </Slider>
    </>
  )
}

export default Hero
