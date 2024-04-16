import Image from 'next/image'
import Link from 'next/link'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'

import { Blog, Media } from '@/payload-types'

const NextBtn = ({ onClick }: any) => {
  return (
    <button type='button' className='slick-arrow prev' onClick={onClick}>
      <i className='d-flex align-items-center justify-content-center'>
        <BsChevronLeft />
      </i>
    </button>
  )
}

const PrevBtn = ({ onClick }: any) => {
  return (
    <button type='button' className='slick-arrow next' onClick={onClick}>
      <i className='d-flex align-items-center justify-content-center'>
        <BsChevronRight />
      </i>
    </button>
  )
}

const LatestPost = ({ blogData }: { blogData: Blog[] }) => {
  const settings = {
    infinite: false,
    speed: 700,
    arrows: true,
    dots: false,
    nextArrow: <PrevBtn />,
    prevArrow: <NextBtn />,
  }
  return (
    <div className='widget'>
      <h3 className='widget__title'>Similar Posts</h3>
      <Slider {...settings} className='small-post-slider'>
        {blogData?.map((blog: any, i: any) => (
          <div key={i} className='small-post'>
            <div className='small-post__thumb'>
              <Image
                src={(blog.img as Media)?.url || ''}
                height={100}
                width={100}
                alt={blog.title}
              />
            </div>
            <div className='small-post__content'>
              <Link href={`/blog/${blog.id}`}>
                <h3 className='small-post__title line-clamp-1'>
                  {blog?.title}
                </h3>
              </Link>
              <p className='line-clamp-2 mt-30'>{blog.short_desc}</p>

              {/* <ul className='blog-card__meta'>
                <li className='d-flex align-items-center gap-1'>
                  <FaRegComments className='fs-6' />
                  <span>{blog.comments} Comments</span>
                </li>
                <li className='d-flex align-items-center gap-1'>
                  <FaRegEye className='fs-6' />
                  <span>{blog.views} Views</span>
                </li>
              </ul> */}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default LatestPost
