'use client'

import '../../src/styles/layout/custom/_pagination.scss'
import inner_hero_shape_2 from '/public/images/elements/inner-hero-shape-2.png'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import ResponsivePagination from 'react-responsive-pagination'

import Blogs from '@/components/blog/Blogs'
import Winner from '@/components/blog/Winner'
import { Blog } from '@/payload-types'
import { trpc } from '@/trpc/client'

const BlogView = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const [blogFilters, setBlogFilters] = useState({
    pageNumber: 1,
    filterByTag: searchParams?.get('tag') ? searchParams?.get('tag') : 'all',
    filterByTitle: searchParams?.get('title') ? searchParams?.get('title') : '',
  })
  const { data: blogData } = trpc.public.getBlogData.useQuery({
    filterByTag: blogFilters.filterByTag!,
    filterByTitle: blogFilters.filterByTitle!,
    pageNumber: blogFilters.pageNumber,
  })

  const handleSearchByTag = (data: string) => {
    const search = new URLSearchParams(searchParams)
    search.set('tag', data)
    router.push(`${pathname}?${search.toString()}#blog`)
    setBlogFilters({ ...blogFilters, pageNumber: 1, filterByTag: data })
  }
  const handleSearchByTitle = (data: string) => {
    const search = new URLSearchParams(searchParams)
    search.set('title', data)
    router.push(`${pathname}?${search.toString()}#blog`)
    setBlogFilters({ ...blogFilters, pageNumber: 1 })
  }

  return (
    <>
      <div className='inner-hero-section style--four'>
        <div className='bg-shape'>
          <Image src={inner_hero_shape_2} alt='inner hero shape 2' />
        </div>
      </div>

      <section className='pb-120'>
        <div className='container'>
          {/* Winner section here */}
          {blogData?.totalBlogs! > 0 && (
            <Winner latestBlog={blogData?.blogDetails?.at(0) as Blog} />
          )}

          {/* Blogd section here */}
          <Blogs
            blogData={blogData?.blogDetails as Blog[]}
            handleSearchByTag={handleSearchByTag}
            handleSearchByTitle={handleSearchByTitle}
            blogFilters={
              blogFilters as { filterByTag: string; filterByTitle: string }
            }
            setBlogFilters={setBlogFilters as any}
          />
          {blogData?.totalBlogs! > 4 && (
            <div className='mt-50'>
              <ResponsivePagination
                current={blogFilters?.pageNumber}
                total={Math.ceil((blogData?.totalBlogs as number) / 4)}
                onPageChange={pageNumber =>
                  setBlogFilters({ ...blogFilters, pageNumber })
                }
              />
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default BlogView
