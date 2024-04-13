'use client'

import inner_hero_shape_2 from '/public/images/elements/inner-hero-shape-2.png'
import Image from 'next/image'

import FaqBody from '@/components/faq/FaqBody'
import { Faq } from '@/payload-types'
import { trpc } from '@/trpc/client'

const FaqView = () => {
  const { data: faqsData } = trpc.public.getFaqs.useQuery()

  return (
    <>
      {/* Banner section */}
      <div className='inner-hero-section style--four'>
        <div className='bg-shape'>
          <Image src={inner_hero_shape_2} alt='inner hero shape 2' />
        </div>
      </div>

      {/* Faq boday here */}
      <FaqBody faqsData={faqsData as Faq} />
    </>
  )
}

export default FaqView
