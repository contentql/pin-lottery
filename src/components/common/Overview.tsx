import Image from 'next/image'

import map from '/public/images/elements/map.png'
import overview_obj_1 from '/public/images/elements/overview-obj-1.png'
import overview_obj_2 from '/public/images/elements/overview-obj-2.png'
import overview_obj_3 from '/public/images/elements/overview-obj-3.png'
import overview_obj_4 from '/public/images/elements/overview-obj-4.png'
import overview_1 from '/public/images/icon/overview/1.png'
import overview_2 from '/public/images/icon/overview/2.png'
import overview_3 from '/public/images/icon/overview/3.png'

const Overview = () => {
  return (
    <section className='overview-section pt-120'>
      <div className='map-el'>
        <Image src={map} alt='image' />
      </div>
      <div className='obj-1'>
        <Image src={overview_obj_1} alt='image' />
      </div>
      <div className='obj-2'>
        <Image src={overview_obj_2} alt='image' />
      </div>
      <div className='obj-3'>
        <Image src={overview_obj_3} alt='image' />
      </div>
      <div className='obj-4'>
        <Image src={overview_obj_4} alt='image' />
      </div>

      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-xl-7 col-lg-8 col-md-10'>
            <div className='section-header text-center'>
              <span className='section-sub-title'>
                Our Users Around the World
              </span>
              <h2 className='section-title'>Let the number speak for us</h2>
              <p>
                Over the years we have provided millions of players with tickets
                to lotteries across the globe and enjoyed having more than one
                million winners
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='map-pointer'>
        <div className='pointer num-1'></div>
        <div className='pointer num-2'></div>
        <div className='pointer num-3'></div>
        <div className='pointer num-4'></div>
        <div className='pointer num-5'></div>
        <div className='pointer num-6'></div>
        <div className='pointer num-7'></div>
        <div className='pointer num-8'></div>
        <div className='pointer num-9'></div>
      </div>

      <div className='container'>
        <div className='row justify-content-center mb-none-30'>
          <div className='col-lg-4 col-sm-6 mb-30'>
            <div className='overview-card hover--effect-1'>
              <div className='overview-card__icon'>
                <Image src={overview_1} alt='overview_1' />
              </div>
              <div className='overview-card__content'>
                <span className='number'>12000+</span>
                <p>Verified Users</p>
              </div>
            </div>
          </div>
          <div className='col-lg-4 col-sm-6 mb-30'>
            <div className='overview-card hover--effect-1'>
              <div className='overview-card__icon'>
                <Image src={overview_2} alt='overview_1' />
              </div>
              <div className='overview-card__content'>
                <span className='number'>13</span>
                <p>Years on the market</p>
              </div>
            </div>
          </div>
          <div className='col-lg-4 col-sm-6 mb-30'>
            <div className='overview-card hover--effect-1'>
              <div className='overview-card__icon'>
                <Image src={overview_3} alt='overview_1' />
              </div>
              <div className='overview-card__content'>
                <span className='number'>98%</span>
                <p>Customer Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Overview
