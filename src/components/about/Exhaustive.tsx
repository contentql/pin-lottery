import Image from 'next/image'

import { Media } from '@/payload-types'
import { trpc } from '@/trpc/client'
import feature_car from '/public/images/elements/feature-car.png'

const Exhaustive = () => {
  const { data: features } = trpc.public.getFeatures.useQuery()
  return (
    <section className='pt-120 pb-120 position-relative'>
      <div className='feature-car'>
        <Image src={feature_car} alt='feature car' />
      </div>
      <div className='container' id='features'>
        <div className='row justify-content-center'>
          <div className='col-lg-10'>
            <div className='section-header text-center'>
              <span className='section-sub-title'>
                An Exhaustive list of amazing features
              </span>
              <h2 className='section-title style--two'>{features?.title}</h2>
              <p>{features?.description}</p>
            </div>
          </div>
        </div>
        <div className='row align-items-center'>
          <div className='col-xl-9'>
            <div className='row mb-none-30'>
              {features?.features?.map((item, i) => (
                <div key={i} className='col-lg-4 col-sm-6 mb-30'>
                  <div className='feature-card style--two'>
                    <div className='feature-card__icon'>
                      <div className='inner'>
                        <Image
                          src={(item?.feature_image as Media)?.url || ''}
                          width={80}
                          height={60}
                          alt='img'
                        />
                      </div>
                    </div>
                    <div className='feature-card__content'>
                      <h3>{item?.name}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Exhaustive
