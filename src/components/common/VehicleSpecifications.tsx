import Image from 'next/image'

import { Contest } from '@/payload-types'
import specification_1 from '/public/images/icon/specification/1.png'
import specification_2 from '/public/images/icon/specification/2.png'
import specification_3 from '/public/images/icon/specification/3.png'
import specification_4 from '/public/images/icon/specification/4.png'
import specification_5 from '/public/images/icon/specification/5.png'
import specification_6 from '/public/images/icon/specification/6.png'

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
                <Image src={specification_1} alt='specification_1' />
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
                <Image src={specification_2} alt='specification_2' />
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
                <Image src={specification_3} alt='specification_3' />
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
                <Image src={specification_4} alt='specification_4' />
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
                <Image src={specification_5} alt='specification_5' />
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
                <Image src={specification_6} alt='specification_6' />
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
                <Image src={specification_1} alt='specification_1' />
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
                <Image src={specification_2} alt='specification_2' />
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
                <Image src={specification_3} alt='specification_3' />
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
                <Image src={specification_4} alt='specification_4' />
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
                <Image src={specification_5} alt='specification_5' />
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
                <Image src={specification_6} alt='specification_6' />
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
