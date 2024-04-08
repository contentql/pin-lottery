import Image from 'next/image'

import { Contest } from '@/payload-types'
import specification_10 from '/public/images/icon/specification/10.png'
import specification_11 from '/public/images/icon/specification/11.png'
import specification_12 from '/public/images/icon/specification/12.png'
import specification_13 from '/public/images/icon/specification/13.png'
import specification_14 from '/public/images/icon/specification/14.png'
import specification_15 from '/public/images/icon/specification/15.png'
import specification_16 from '/public/images/icon/specification/16.png'
import specification_17 from '/public/images/icon/specification/17.png'
import specification_18 from '/public/images/icon/specification/18.png'
import specification_7 from '/public/images/icon/specification/7.png'
import specification_8 from '/public/images/icon/specification/8.png'
import specification_9 from '/public/images/icon/specification/9.png'

function VehicleSpecifications({
  contestDetails,
}: {
  contestDetails: Contest
}) {
  return (
    <div className='content-block'>
      <h3 className='title'>Specifications</h3>
      {contestDetails?.product_type === 'Car' ||
      contestDetails?.product_type === 'Bike' ? (
        <div className='row mb-none-30'>
          <div className='col-lg-6 col-sm-6 mb-30'>
            <div className='icon-item'>
              <div className='icon-item__thumb'>
                <Image src={specification_13} alt='specification_13' />
              </div>
              <div className='icon-item__content'>
                <p>Zero to Sixty</p>
                <span>{contestDetails?.zero_sixty}</span>
              </div>
            </div>
          </div>
          <div className='col-lg-6 col-sm-6 mb-30'>
            <div className='icon-item'>
              <div className='icon-item__thumb'>
                <Image src={specification_14} alt='specification_14' />
              </div>
              <div className='icon-item__content'>
                <p>Top Speed</p>
                <h6>{contestDetails?.top_speed}</h6>
              </div>
            </div>
          </div>
          <div className='col-lg-6 col-sm-6 mb-30'>
            <div className='icon-item'>
              <div className='icon-item__thumb'>
                <Image src={specification_15} alt='specification_15' />
              </div>
              <div className='icon-item__content'>
                <p>Power</p>
                <h6>{contestDetails?.power}</h6>
              </div>
            </div>
          </div>
          <div className='col-lg-6 col-sm-6 mb-30'>
            <div className='icon-item'>
              <div className='icon-item__thumb'>
                <Image src={specification_16} alt='specification_16' />
              </div>
              <div className='icon-item__content'>
                <p>Displacement</p>
                <h6>{contestDetails?.displacement}</h6>
              </div>
            </div>
          </div>
          <div className='col-lg-6 col-sm-6 mb-30'>
            <div className='icon-item'>
              <div className='icon-item__thumb'>
                <Image src={specification_17} alt='specification_17' />
              </div>
              <div className='icon-item__content'>
                <p>Break Horsepower</p>
                <h6>{contestDetails?.bhp}</h6>
              </div>
            </div>
          </div>
          <div className='col-lg-6 col-sm-6 mb-30'>
            <div className='icon-item'>
              <div className='icon-item__thumb'>
                <Image src={specification_18} alt='specification_18' />
              </div>
              <div className='icon-item__content'>
                <p>Year</p>
                <h6>{contestDetails?.year}</h6>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='row mb-none-30'>
          <div className='col-lg-6 col-sm-6 mb-30'>
            <div className='icon-item'>
              <div className='icon-item__thumb'>
                <Image src={specification_7} alt='specification_7' />
              </div>
              <div className='icon-item__content'>
                <p>Processor/CPU</p>
                <span>{contestDetails?.processor_cpu}</span>
              </div>
            </div>
          </div>
          <div className='col-lg-6 col-sm-6 mb-30'>
            <div className='icon-item'>
              <div className='icon-item__thumb'>
                <Image src={specification_8} alt='specification_8' />
              </div>
              <div className='icon-item__content'>
                <p>RAM </p>
                <h6>{contestDetails?.ram}</h6>
              </div>
            </div>
          </div>
          <div className='col-lg-6 col-sm-6 mb-30'>
            <div className='icon-item'>
              <div className='icon-item__thumb'>
                <Image src={specification_9} alt='specification_9' />
              </div>
              <div className='icon-item__content'>
                <p>Storage</p>
                <h6>{contestDetails?.storage}</h6>
              </div>
            </div>
          </div>
          <div className='col-lg-6 col-sm-6 mb-30'>
            <div className='icon-item'>
              <div className='icon-item__thumb'>
                <Image src={specification_10} alt='specification_10' />
              </div>
              <div className='icon-item__content'>
                <p>Camera</p>
                <h6>{contestDetails?.Camera}</h6>
              </div>
            </div>
          </div>
          <div className='col-lg-6 col-sm-6 mb-30'>
            <div className='icon-item'>
              <div className='icon-item__thumb'>
                <Image src={specification_11} alt='specification_11' />
              </div>
              <div className='icon-item__content'>
                <p>Battery</p>
                <h6>{contestDetails?.battery}</h6>
              </div>
            </div>
          </div>
          <div className='col-lg-6 col-sm-6 mb-30'>
            <div className='icon-item'>
              <div className='icon-item__thumb'>
                <Image src={specification_12} alt='specification_12' />
              </div>
              <div className='icon-item__content'>
                <p>Display</p>
                <h6>{contestDetails?.display}</h6>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default VehicleSpecifications
