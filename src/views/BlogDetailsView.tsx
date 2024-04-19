'use client'

import inner_hero_shape_2 from '/public/images/elements/inner-hero-shape-2.png'
import Image from 'next/image'

import LatestPost from '@/components/blog/LatestPost'
import Details from '@/components/single-blog/Details'
import { Blog } from '@/payload-types'
import { trpc } from '@/trpc/client'

interface PageProps {
  blogId: string
  blog: Blog
}

const BlogDetailsView = ({ blogId, blog }: PageProps) => {
  const { data: blogDetails } = trpc.public.getBlogDetailsById.useQuery(
    {
      id: blogId,
    },
    {
      initialData: blog,
    },
  )

  const { data: similarBlogs } = trpc.public.getSimilarBlogs.useQuery(
    { similarTag: blogDetails?.tag! },
    { enabled: !!blogDetails?.tag },
  )

  return (
    <>
      {/* Banner section here */}
      <div className='inner-hero-section style--six'>
        <div className='bg-shape'>
          <Image src={inner_hero_shape_2} alt='inner hero shape 2' />
        </div>
      </div>

      {/* Details section here */}
      <Details blogDetails={blogDetails} />
      {similarBlogs?.length! >= 2 && (
        <div className='container mb-50'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='blog-single'>
                <div className='sidebar'>
                  <LatestPost blogData={similarBlogs as Blog[]} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default BlogDetailsView
