import Image from 'next/image'
import Link from 'next/link'
import { FaPhoneAlt, FaRegEnvelope } from 'react-icons/fa'

import { Media, SupportInfo } from '@/payload-types'
import { trpc } from '@/trpc/client'

const Support = () => {
  const { data: supportData }: { data: SupportInfo | undefined } =
    trpc.public.getSupportInfo.useQuery()

  return (
    <section className='pb-120'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-lg-8'>
            <div className='section-header text-center'>
              <span className='section-sub-title'>{supportData?.caption}</span>
              <h2 className='section-title'>{supportData?.title}</h2>
              <p>{supportData?.sub_title}</p>
            </div>
          </div>
        </div>
        <div className='row mb-none-30'>
          <div className='col-lg-6 mb-30'>
            <div className='support-card'>
              <div className='support-card__thumb'>
                <Image
                  src={(supportData?.support_img as Media)?.url || ''}
                  alt={(supportData?.support_img as Media)?.alt || ''}
                  height={150}
                  width={150}
                />
              </div>
              <div className='support-card__content'>
                <h3 className='support-card__title'>{supportData?.heading1}</h3>
                <p>{supportData?.description1}</p>
                <div className='btn-grp justify-content-xl-start mt-3'>
                  <a
                    href='tel:6564545'
                    className='btn-border btn-sm text-capitalize'>
                    Call us
                    <FaPhoneAlt />
                  </a>
                  <a
                    href='mailto:dhdj@gmail.com'
                    className='cmn-btn btn-sm text-capitalize'>
                    Email us <FaRegEnvelope />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-6 mb-30'>
            <div className='support-card'>
              <div className='support-card__thumb'>
                <Image
                  src={(supportData?.guide_img as Media)?.url || ''}
                  alt={(supportData?.guide_img as Media)?.alt || ''}
                  height={150}
                  width={150}
                />
              </div>
              <div className='support-card__content'>
                <h3 className='support-card__title'>{supportData?.heading2}</h3>
                <p>{supportData?.description2} </p>
                <div className='btn-grp justify-content-xl-start mt-3'>
                  <Link
                    href='/faq'
                    className='btn-border btn-sm text-capitalize'>
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
