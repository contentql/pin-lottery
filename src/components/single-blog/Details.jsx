import Image from 'next/image'
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaRedditAlien,
  FaTwitter,
} from 'react-icons/fa'

import Social from '@/components/social/Social'
import ConvertToHtml from '@/utils/convertToHtml'
import { DateConverter } from '@/utils/date-converter'

const Details = ({ blogDetails }) => {
  return (
    <section className='mt-minus-270 pb-120'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='blog-single'>
              <div className='blog-single__header'>
                <h3 className='blog-single__title'>{blogDetails?.title}</h3>
                <div className='blog-single__meta'>
                  <div className='left'>
                    <span className='post-date'>
                      {DateConverter(blogDetails?.createdAt)}
                    </span>
                    {/* <div className='post-author'>
                      <Image src={author} alt='author' />
                      <span className='name'>Alvin Mcdaniel</span>
                    </div> */}
                  </div>
                  <div className='right'>
                    <span>Share : </span>

                    {/* social links here */}
                    <Social
                      items={[
                        [FaFacebookF, '/'],
                        [FaTwitter, '/'],
                        [FaInstagram, '/'],
                        [FaPinterestP, '/'],
                        [FaRedditAlien, '/'],
                      ]}
                    />
                  </div>
                </div>
              </div>
              <div className='blog-single__body'>
                <Image
                  src={blogDetails?.img?.url}
                  width={100}
                  height={100}
                  alt='b2'
                />
                <ConvertToHtml htmlContent={blogDetails?.content_html} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Details
