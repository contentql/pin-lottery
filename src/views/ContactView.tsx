'use client'

import inner_hero_shape_2 from '/public/images/elements/inner-hero-shape-2.png'
import Image from 'next/image'

import ContactBody from '@/components/contact/ContactBody'

const ContactView = () => {
  return (
    <>
      <div className='inner-hero-section style--six'>
        <div className='bg-shape'>
          <Image src={inner_hero_shape_2} alt='inner hero shape 2' />
        </div>
      </div>

      {/*Contact body section here */}
      <ContactBody />
    </>
  )
}

export default ContactView
