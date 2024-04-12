'use client'

import Image from 'next/image'

import inner_hero_shape_2 from '/public/images/elements/inner-hero-shape-2.png'

import AboutUs from '@/components/about/AboutUs'
import Exhaustive from '@/components/about/Exhaustive'
import Testimonial from '@/components/common/Testimonial'
import Team from '@/components/team/Team'
import { About } from '@/payload-types'

const AboutView = ({ aboutInfo }: any) => {
  return (
    <>
      {/* Banner section here */}
      <div className='inner-hero-section style--four'>
        <div className='bg-shape'>
          <Image src={inner_hero_shape_2} alt='inner hero shape 2' />
        </div>
      </div>
      <AboutUs aboutInfo={aboutInfo as About} />
      <Exhaustive />
      <Testimonial />
      <Team />
    </>
  )
}

export default AboutView
