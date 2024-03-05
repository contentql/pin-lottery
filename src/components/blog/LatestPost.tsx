import Image from 'next/image'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { FaRegComments, FaRegEye } from 'react-icons/fa'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'

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

const LatestPost = ({ blogData }: any) => {
  const settings = {
    infinite: false,
    speed: 700,
    arrows: true,
    dots: false,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
  }
  return (
    <div className='widget'>
      <h3 className='widget__title'>Latest Post</h3>
      <Slider {...settings} className='small-post-slider'>
        {blogData.map((blog: any, i: any) => (
          <div key={i} className='small-post'>
            <div className='small-post__thumb'>
              <Image src={blog.img} alt={blog.title} />
            </div>
            <div className='small-post__content'>
              <h3 className='small-post__title'>
                {blog.short_desc.slice(0, 40)} ...
              </h3>
              <ul className='blog-card__meta'>
                <li className='d-flex align-items-center gap-1'>
                  <FaRegComments className='fs-6' />
                  <span>{blog.comments} Comments</span>
                </li>
                <li className='d-flex align-items-center gap-1'>
                  <FaRegEye className='fs-6' />
                  <span>{blog.views} Views</span>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default LatestPost
