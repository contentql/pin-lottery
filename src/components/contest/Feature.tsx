import Image from 'next/image'

import contest_feature_1 from '/public/images/icon/contest-feature/1.png'
import contest_feature_2 from '/public/images/icon/contest-feature/2.png'
import contest_feature_3 from '/public/images/icon/contest-feature/3.png'

const Feature = () => {
  return (
    <section className='pb-120'>
      <div className='container'>
        <div className='row mb-none-30 justify-content-center'>
          <div className='col-lg-4 col-sm-6 mb-30'>
            <div className='icon-item2'>
              <div className='icon-item2__icon'>
                <Image src={contest_feature_1} alt='contest feature 1' />
              </div>
              <div className='icon-item2__content'>
                <h3 className='title'>Secure Checkout</h3>
                <p>
                  Pay with the world’s most popular and secure payment methods.
                </p>
              </div>
            </div>
          </div>
          <div className='col-lg-4 col-sm-6 mb-30'>
            <div className='icon-item2'>
              <div className='icon-item2__icon'>
                <Image src={contest_feature_2} alt='contest feature 2' />
              </div>
              <div className='icon-item2__content'>
                <h3 className='title'>Great Value</h3>
                <p>We offer competitive prices for every lottery tickets</p>
              </div>
            </div>
          </div>
          <div className='col-lg-4 col-sm-6 mb-30'>
            <div className='icon-item2'>
              <div className='icon-item2__icon'>
                <Image src={contest_feature_3} alt='contest feature 3' />
              </div>
              <div className='icon-item2__content'>
                <h3 className='title'>Free Worldwide Delivery</h3>
                <p>
                  We are available for providing our services in major countries
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Feature
