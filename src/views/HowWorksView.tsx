'use client'

import Image from 'next/image'

import inner_hero_shape_2 from '/public/images/elements/inner-hero-shape-2.png'

import Banner from '@/components/common/Banner'
import HowToPlay from '@/components/common/HowToPlay'
import BuyTicket from '@/components/how-work/BuyTicket'
import Faq from '@/components/how-work/Faq'
import Vedio from '@/components/how-work/Vedio'

const HowWorksView = () => {
  return (
    <>
      {/* Banner section here */}
      <div className='inner-hero-section style--four'>
        <div className='bg-shape'>
          <Image src={inner_hero_shape_2} alt='inner hero shape 2' />
        </div>

        <Banner
          breadcrumb={[
            ['Home', '/'],
            ['Lottery', '/'],
            ['Contest No: B2T', '/'],
            ['Pick your Lottery Number', '/'],
          ]}
        />
      </div>

      {/* Vedio play here */}
      <Vedio />

      {/* how to play */}
      <HowToPlay />

      {/* Buy a ticke  */}
      <BuyTicket />

      {/* You Have Questions */}
      <Faq />
    </>
  )
}

export default HowWorksView
