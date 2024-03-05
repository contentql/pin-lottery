import Image from 'next/image'
import Link from 'next/link'
import { FaRegComments, FaRegEye } from 'react-icons/fa'

import author from '/public/images/blog/author.png'
import blog_b1 from '/public/images/blog/b1.jpg'

const Winner = () => {
  return (
    <div className='row'>
      <div className='col-lg-12'>
        <div className='blog-card has-link'>
          <Link href='/blog' className='item-link'></Link>
          <div className='blog-card__thumb'>
            <Image src={blog_b1} alt='blog b1' />
          </div>
          <div className='blog-card__content'>
            <h3 className='blog-card__title'>
              Lottery mistakes – check out the most common mistakes of lotto
              players and winners
            </h3>
            <ul className='blog-card__meta'>
              <li className='d-flex align-items-center gap-1'>
                <FaRegComments className='fs-6' />
                <span>20 Comments</span>
              </li>
              <li className='d-flex align-items-center gap-1'>
                <FaRegEye className='fs-6' />
                <span>466 Views</span>
              </li>
            </ul>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et magna aliqua. Quis ipsum
              suspendisse ultrices gravida. Risus commodo viverra maecenas
              accumsan.{' '}
            </p>
            <div className='blog-card__footer'>
              <div className='left'>
                <span className='post-date'>Dece 15, 2020 BY</span>
                <div className='post-author'>
                  <Image src={author} alt='author' />
                  <span className='name'>Alvin Mcdaniel</span>
                </div>
              </div>
              <div className='right'>
                <a href='#0' className='read-btn'>
                  Read More <i className='las la-arrow-right'></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Winner
