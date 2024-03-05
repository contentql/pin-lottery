import Image from 'next/image'
import Link from 'next/link'
import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa'

import round_shape_2 from '/public/images/elements/round-shape-2.png'
import store_btn_1 from '/public/images/icon/store-btn/1.png'
import store_btn_2 from '/public/images/icon/store-btn/2.png'

const Footer = () => {
  return (
    <footer className='footer-section'>
      <div className='bg-shape--top'>
        <Image src={round_shape_2} alt='image' />
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='subscribe-area'>
              <div className='left'>
                <span className='subtitle'>Subscribe to Sorko</span>
                <h3 className='title'>To Get Exclusive Benefits</h3>
              </div>
              <div className='right'>
                <form className='subscribe-form'>
                  <input
                    type='email'
                    name='subscribe_email'
                    id='subscribe_email'
                    placeholder='Enter Your Email'
                    required
                  />
                  <button type='submit'>Subscribe</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container pt-120'>
        <div className='row pb-5 align-items-center'>
          <div className='col-lg-4'>
            <ul className='app-btn'>
              <li>
                <Link href='/#'>
                  <Image src={store_btn_1} alt='image' />
                </Link>
              </li>
              <li>
                <Link href='/#'>
                  <Image src={store_btn_2} alt='image' />
                </Link>
              </li>
            </ul>
          </div>
          <div className='col-lg-8'>
            <ul className='short-links justify-content-lg-end justify-content-center'>
              <li>
                <Link href='/#'>About</Link>
              </li>
              <li>
                <Link href='/#'>FAQs</Link>
              </li>
              <li>
                <Link href='/#'>Contact</Link>
              </li>
              <li>
                <Link href='/#'>Terms of Services</Link>
              </li>
              <li>
                <Link href='/#'>Privacy</Link>
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <div className='row py-5 align-items-center'>
          <div className='col-lg-6'>
            <p className='copy-right-text text-lg-start text-center mb-lg-0 mb-3'>
              Copyright © 2020.All Rights Reserved By{' '}
              <Link href='/'>Rifa</Link>
            </p>
          </div>
          <div className='col-lg-6'>
            <ul className='social-links justify-content-lg-end justify-content-center'>
              <li>
                <Link href='/#'>
                  <FaFacebookF />
                </Link>
              </li>
              <li>
                <Link href='/#'>
                  <FaTwitter />
                </Link>
              </li>
              <li>
                <Link href='/#'>
                  <FaLinkedinIn />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
