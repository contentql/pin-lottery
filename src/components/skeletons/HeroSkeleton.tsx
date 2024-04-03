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

const HeroSkeleton = () => {
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
          {/* <Image src={main_mobile} alt='image' className='hero-car' /> */}
          <Image src={car_star} alt='image' className='car-star' />
        </div>
        <div className='container'>
          <div className='row justify-content-center justify-content-lg-start'>
            <div className='col-lg-6 col-md-8'>
              <div className='hero-isloading'>
                <h2 className='loading-h2'></h2>
                <p className='loading-p'></p>
                <p className='loading-p'></p>
                <p className='loading-p'></p>
                <div className='hero__btn'>
                  <Link href='/contest' className='loading-btn'></Link>
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
    </>
  )
}

export default HeroSkeleton
