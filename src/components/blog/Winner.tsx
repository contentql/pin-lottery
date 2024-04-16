import Image from 'next/image'
import Link from 'next/link'

import { Blog, Media } from '@/payload-types'
import { DateConverter } from '@/utils/date-converter'

const Winner = ({ latestBlog }: { latestBlog: Blog }) => {
  return (
    <div className='row'>
      <div className='col-lg-12'>
        <div className='blog-card has-link'>
          <Link href={`/blog/${latestBlog?.id}`} className='item-link'></Link>
          <div className='blog-card__content'>
            <h3 className='blog-card__title'>{latestBlog?.title}</h3>
            {/* <ul className='blog-card__meta'>
              <li className='d-flex align-items-center gap-1'>
                <FaRegComments className='fs-6' />
                <span>20 Comments</span>
              </li>
              <li className='d-flex align-items-center gap-1'>
                <FaRegEye className='fs-6' />
                <span>466 Views</span>
              </li>
            </ul> */}
            <p>{latestBlog?.short_desc}</p>
            <div className='blog-card__footer'>
              <div className='left'>
                <span className='post-date'>
                  {DateConverter(latestBlog?.createdAt)} BY
                </span>
                <div className='post-author'>
                  <Image
                    src={(latestBlog?.author_image as Media)?.url || ''}
                    alt='author'
                    width={100}
                    height={100}
                  />
                  <span className='name'>{latestBlog?.author_name}</span>
                </div>
              </div>
              <div className='right'>
                <Link href={`/blog/${latestBlog?.id}`} className='read-btn'>
                  Read More <i className='las la-arrow-right'></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Winner
