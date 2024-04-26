import Image from 'next/image'
import Link from 'next/link'

import { Blog, Media } from '@/payload-types'
import { DateConverter } from '@/utils/date-converter'

const LeftSide = ({ blogData }: { blogData: Blog[] }) => {
  return (
    <div className='col-lg-8 mb-none-30'>
      {/* blog section here */}
      {blogData?.map(blog => (
        <div key={blog.id} className='blog-card style--two mb-30 has-link'>
          <Link href={`/blog/${blog.id}`} className='item-link'></Link>
          {/* <div className='blog-card__thumb'> */}
          <Image
            style={{ height: '300px', borderRadius: '15px' }}
            src={(blog.img as Media)?.url || ''}
            alt={blog.title}
            width={1000}
            height={100}
          />
          {/* </div> */}
          <div className='blog-card__content'>
            <h3 className='blog-card__title line-clamp-1'>{blog.title}</h3>
            <p className='line-clamp-2'>{blog.short_desc}</p>
            <div className='blog-card__footer'>
              <div className='left'>
                <span className='post-date'>
                  {DateConverter(blog.createdAt)} By
                </span>
                <div className='post-author'>
                  <Image
                    src={(blog?.author_image as Media)?.url || ''}
                    width={100}
                    height={100}
                    alt='author image'
                  />
                  <span className='name'>{blog.author_name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default LeftSide
