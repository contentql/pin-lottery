'use client'

import Image from 'next/image'

import inner_hero_shape from '/public/images/elements/inner-hero-shape.png'

import Details from '@/components/checkout/Details'
import Banner from '@/components/common/Banner'

const CheckoutView = () => {
  return (
    <>
      {/* Banner section here */}
      <div className='inner-hero-section'>
        <div className='bg-shape'>
          <Image src={inner_hero_shape} alt='inner hero shape' />
        </div>

        <Banner
          breadcrumb={[
            ['Home', '/'],
            ['Lottery', '/'],
            ['Contest No: B2T', '/'],
            ['Pick your Lottery Number', '/'],
            ['My Cart', '/'],
            ['Checkout', '/'],
          ]}
        />
      </div>

      {/* Details section here */}
      <Details />
    </>
  )
}

export default CheckoutView
