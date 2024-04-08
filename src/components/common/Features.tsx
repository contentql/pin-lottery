import Image from 'next/image'

import { Feature, Media } from '@/payload-types'
import feature_2 from '/public/images/icon/feature/2.png'
import feature_4 from '/public/images/icon/feature/4.png'

const Features = ({ featuresDetails }: { featuresDetails: Feature }) => {
  return (
    <section className='pt-120 pb-120'>
      <div className='container'>
        <div className='row align-items-center'>
          <div className='col-lg-6 order-lg-1 order-2'>
            <div className='row mb-none-30'>
              <div className='col-lg-6 mb-30'>
                <div className='row mb-none-30'>
                  <div className='col-lg-12 col-md-6 mb-30'>
                    <div className='feature-card hover--effect-1'>
                      <div className='feature-card__icon'>
                        <Image
                          src={
                            (
                              featuresDetails?.features?.at(0)
                                ?.feature_image as Media
                            )?.url || ''
                          }
                          width={80}
                          height={60}
                          alt='image'
                        />
                      </div>
                      <div className='feature-card__content'>
                        <h3 className='feature-title'>
                          {featuresDetails?.features?.at(0)?.name}
                        </h3>
                        <p>{featuresDetails?.features?.at(0)?.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-12 col-md-6 mb-30'>
                    <div className='feature-card hover--effect-1'>
                      <div className='feature-card__icon'>
                        <Image
                          src={
                            (
                              featuresDetails?.features?.at(1)
                                ?.feature_image as Media
                            )?.url || ''
                          }
                          width={80}
                          height={60}
                          alt='image'
                        />
                      </div>
                      <div className='feature-card__content'>
                        <h3 className='feature-title'>
                          {featuresDetails?.features?.at(1)?.name}
                        </h3>
                        <p>{featuresDetails?.features?.at(1)?.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-lg-6 mb-30 mt-lg-5'>
                <div className='row mb-none-30'>
                  <div className='col-lg-12 col-md-6 mb-30'>
                    <div className='feature-card hover--effect-1'>
                      <div className='feature-card__icon'>
                        <Image src={feature_2} alt='image' />
                      </div>
                      <div className='feature-card__content'>
                        <h3 className='feature-title'>Security</h3>
                        <p>
                          Nulla ultricies in nulla ac efficitur. In vel neque
                          arcu. Donec quis
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-12 col-md-6 mb-30'>
                    <div className='feature-card hover--effect-1'>
                      <div className='feature-card__icon'>
                        <Image src={feature_4} alt='image' />
                      </div>
                      <div className='feature-card__content'>
                        <h3 className='feature-title'>Support</h3>
                        <p>
                          Nulla ultricies in nulla ac efficitur. In vel neque
                          arcu. Donec quis
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-6 order-lg-2 order-1 text-lg-start text-center'>
            <div className='section-header'>
              <span className='section-sub-title'>An Exhaustive list of</span>
              <h2 className='section-title'>Our features.</h2>
              <p>{featuresDetails?.description}</p>
              <a
                href='/about#features'
                className='d-flex align-items-center mt-3 justify-content-lg-start justify-content-center'>
                Show all features
                <i className='las la-angle-double-right text-danger'></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
