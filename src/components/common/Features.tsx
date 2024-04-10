import Image from 'next/image'

import { Feature, Media } from '@/payload-types'

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
                        <Image
                          src={
                            (
                              featuresDetails?.features?.at(2)
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
                          {featuresDetails?.features?.at(2)?.name}
                        </h3>
                        <p>{featuresDetails?.features?.at(2)?.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-12 col-md-6 mb-30'>
                    <div className='feature-card hover--effect-1'>
                      <div className='feature-card__icon'>
                        <Image
                          src={
                            (
                              featuresDetails?.features?.at(3)
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
                          {featuresDetails?.features?.at(3)?.name}
                        </h3>
                        <p>{featuresDetails?.features?.at(3)?.description}</p>
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
