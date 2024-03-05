import Image from 'next/image'
import Link from 'next/link'
import { FaPhoneAlt, FaRegEnvelope } from 'react-icons/fa'

import support_1 from '/public/images/icon/support/1.png'
import support_2 from '/public/images/icon/support/2.png'

const Support = () => {
  return (
    <section className='pb-120'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-lg-8'>
            <div className='section-header text-center'>
              <span className='section-sub-title'>
                Get in touch with our friendly support
              </span>
              <h2 className='section-title'>Customer Support</h2>
              <p>
                Have a question or need help? Contact our friendly support team.
              </p>
            </div>
          </div>
        </div>
        <div className='row mb-none-30'>
          <div className='col-lg-6 mb-30'>
            <div className='support-card'>
              <div className='support-card__thumb'>
                <Image src={support_1} alt='image' />
              </div>
              <div className='support-card__content'>
                <h3 className='support-card__title'>
                  Talk to our support team
                </h3>
                <p>
                  Got a question about Lotteries? Get in touch with our friendly
                  staff.
                </p>
                <div className='btn-grp justify-content-xl-start mt-3'>
                  <a
                    href='tel:6564545'
                    className='btn-border btn-sm text-capitalize'
                  >
                    Call us
                    <FaPhoneAlt />
                  </a>
                  <a
                    href='mailto:dhdj@gmail.com'
                    className='cmn-btn btn-sm text-capitalize'
                  >
                    Email us <FaRegEnvelope />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-6 mb-30'>
            <div className='support-card'>
              <div className='support-card__thumb'>
                <Image src={support_2} alt='image' />
              </div>
              <div className='support-card__content'>
                <h3 className='support-card__title'>Our Guide to Rifa</h3>
                <p>Check out our FAQs to see if we can help you out. </p>
                <div className='btn-grp justify-content-xl-start mt-3'>
                  <Link
                    href='/faq'
                    className='btn-border btn-sm text-capitalize'
                  >
                    FAQs & Help
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Support
