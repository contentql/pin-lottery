import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FaPlay } from 'react-icons/fa'

import car_light from '/public/images/elements/car-light.png'
import car_main from '/public/images/elements/car-main.png'
import car_ray from '/public/images/elements/car-ray.png'
import car_shadow from '/public/images/elements/car-shadow.png'
import car_star from '/public/images/elements/car-star.png'
import hero_building from '/public/images/elements/hero-building.png'
import hero_car from '/public/images/elements/hero-car.png'
import hero_shape from '/public/images/elements/hero-shape.jpg.png'

import VedioModal from '@/components/vedioModal/VedioModal'

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <VedioModal
        link='https://www.youtube.com/embed/d6xn5uflUjg'
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

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
          <Image src={hero_car} alt='image' className='hero-car' />
          <Image src={car_star} alt='image' className='car-star' />
        </div>
        <div className='container'>
          <div className='row justify-content-center justify-content-lg-start'>
            <div className='col-lg-6 col-md-8'>
              <div className='hero__content'>
                <div className='hero__subtitle'>Contest FOR YOUR CHANCE to</div>
                <h2 className='hero__title'>big win</h2>
                <p>
                  Now&#39;s your chance to win a car! Check out the prestige
                  cars you can win in our car prize draws. Will you be our next
                  lucky winner?
                </p>
                <div className='hero__btn'>
                  <Link href='/contest' className='cmn-btn'>
                    Participate Now
                  </Link>
                  <button className='video-btn' onClick={() => setIsOpen(true)}>
                    <FaPlay />
                  </button>
                </div>
              </div>
            </div>
            <div className='col-lg-6'>
              <div className='hero__thumb'>
                <Image src={car_main} alt='' />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero
