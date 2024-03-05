import Image from 'next/image'

import feature_car from '/public/images/elements/feature-car.png'
import feature_10 from '/public/images/icon/feature/10.png'
import feature_5 from '/public/images/icon/feature/5.png'
import feature_6 from '/public/images/icon/feature/6.png'
import feature_7 from '/public/images/icon/feature/7.png'
import feature_8 from '/public/images/icon/feature/8.png'
import feature_9 from '/public/images/icon/feature/9.png'

const Exhaustive = () => {
  return (
    <section className='pt-120 pb-120 position-relative'>
      <div className='feature-car'>
        <Image src={feature_car} alt='feature car' />
      </div>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-lg-10'>
            <div className='section-header text-center'>
              <span className='section-sub-title'>
                An Exhaustive list of amazing features
              </span>
              <h2 className='section-title style--two'>
                What makes Rifa different?
              </h2>
              <p>
                These are the key drivers that make us different: Safe, Social,
                Reliable and Fun. Rifa Lotto is dedicated to trust and safety.
              </p>
            </div>
          </div>
        </div>
        <div className='row align-items-center'>
          <div className='col-xl-9'>
            <div className='row mb-none-30'>
              {[
                ['No Commission on Winnings', feature_5],
                ['Safe and Secure Playing', feature_6],
                ['Biggest lottery jackpots', feature_7],
                ['Instant payout system', feature_8],
                ['Dedicated Support', feature_9],
                ['Unlimited Affiliates', feature_10],
              ].map(([title, icon], i) => (
                <div key={i} className='col-lg-4 col-sm-6 mb-30'>
                  <div className='feature-card style--two'>
                    <div className='feature-card__icon'>
                      <div className='inner'>
                        <Image src={icon} alt={title as string} />
                      </div>
                    </div>
                    <div className='feature-card__content'>
                      <h3>{title as string}</h3>
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
