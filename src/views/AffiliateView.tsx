'use client'

import Image from 'next/image'

import inner_hero_shape_2 from '/public/images/elements/inner-hero-shape-2.png'

import Boost from '@/components/affiliate/Boost'
import Getting from '@/components/affiliate/Getting'
import Partner from '@/components/affiliate/Partner'
import TopAffiliate from '@/components/affiliate/TopAffiliate'
import Trusted from '@/components/affiliate/Trusted'
import Banner from '@/components/common/Banner'

const AffiliateView = () => {
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
            ['Pages', '/'],
            ['Affiliate', '/'],
          ]}
        />
      </div>
      <Boost />
      <Getting />
      <Trusted />
      <Partner />
      <TopAffiliate />
    </>
  )
}

export default AffiliateView
