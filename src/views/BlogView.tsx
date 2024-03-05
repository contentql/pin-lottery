'use client'

import { trpc } from '@/trpc/client'

import Image from 'next/image'

import inner_hero_shape_2 from '/public/images/elements/inner-hero-shape-2.png'

import Blogs from '@/components/blog/Blogs'
import Winner from '@/components/blog/Winner'
import Banner from '@/components/common/Banner'

const BlogView = () => {
  const { data: blogData } = trpc.public.getBlogData.useQuery()
  console.log('blogs data', blogData)
  return (
    <>
      <div className='inner-hero-section style--four'>
        <div className='bg-shape'>
          <Image src={inner_hero_shape_2} alt='inner hero shape 2' />
        </div>
        <Banner
          breadcrumb={[
            ['Home', '/'],
            ['Pages', '/'],
            ['Blog', '/'],
          ]}
        />
      </div>

      <section className='mt-minus-150 pb-120'>
        <div className='container'>
          {/* Winner section here */}
          <Winner />

          {/* Blogd section here */}
          <Blogs blogData={blogData} />
        </div>
      </section>
    </>
  )
}

export default BlogView
