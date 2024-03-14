import { Contest } from '@/payload-types'
import ConvertToHtml from '@/utils/convertToHtml'
import Tabs from './Tabs'

interface ContestDetails extends Contest {
  features_html: string
  description_html: string
}

const VehicleOverview = ({
  contestDetails,
}: {
  contestDetails: ContestDetails
  }) => {
   const tabs = [
     {
       title: 'Description',
       content: (
         <ConvertToHtml htmlContent={contestDetails?.description_html} />
       ),
     },
     {
       title: 'Features',
       content: <ConvertToHtml htmlContent={contestDetails?.features_html} />,
     },
  ]
  console.log('desc', contestDetails?.description_html)
  return (
    <>
      {/* <ul
        className='nav nav-tabs justify-content-center mb-30 border-0'
        id='myTab'
        role='tablist'>
        <li className='nav-item' role='presentation'>
          <button
            className='cmn-btn style--two d-flex align-items-center active'
            id='home-tab'
            data-bs-toggle='tab'
            data-bs-target='#home-tab-pane'
            type='button'
            role='tab'
            aria-controls='home-tab-pane'
            aria-selected='true'
            >
            <span className='me-3'>
            </span>
            Dream Car
          </button>
        </li>
        <li className='nav-item' role='presentation'>
          <button
            className='cmn-btn style--two d-flex align-items-center'
            id='profile-tab'
            data-bs-toggle='tab'
            data-bs-target='#profile-tab-pane'
            type='button'
            role='tab'
            aria-controls='profile-tab-pane'
            aria-selected='false'
            >
            <span className='me-3'>
            </span>
            All lifestyle
          </button>
        </li>
      </ul> */}
      <div>
        <Tabs tabs={tabs} />
      </div>
      {/* <div className='content-block'>
        <h3 className='title'>Description</h3>
        <ConvertToHtml htmlContent={contestDetails?.description_html} />
      </div>
      <div className='content-block'>
        <h3 className='title'>Features</h3>
        
      </div> */}
      {/* <div className='content-block'>
        <h3 className='title'>Specifications</h3>
        <div className='row mb-none-30'>
          <div className='col-lg-4 col-sm-6 mb-30'>
            <div className='icon-item'>
              <div className='icon-item__thumb'>
                <Image src={specification_1} alt='specification_1' />
              </div>
              <div className='icon-item__content'>
                <p>0-62mph</p>
                <span>4.0 secs</span>
              </div>
            </div>
          </div>
          <div className='col-lg-4 col-sm-6 mb-30'>
            <div className='icon-item'>
              <div className='icon-item__thumb'>
                <Image src={specification_2} alt='specification_2' />
              </div>
              <div className='icon-item__content'>
                <p>Top Speed</p>
                <span>181 mph</span>
              </div>
            </div>
          </div>
          <div className='col-lg-4 col-sm-6 mb-30'>
            <div className='icon-item'>
              <div className='icon-item__thumb'>
                <Image src={specification_3} alt='specification_3' />
              </div>
              <div className='icon-item__content'>
                <p>Power</p>
                <span>542 bhp</span>
              </div>
            </div>
          </div>
          <div className='col-lg-4 col-sm-6 mb-30'>
            <div className='icon-item'>
              <div className='icon-item__thumb'>
                <Image src={specification_4} alt='specification_4' />
              </div>
              <div className='icon-item__content'>
                <p>Displacement</p>
                <span>4.0ltr</span>
              </div>
            </div>
          </div>
          <div className='col-lg-4 col-sm-6 mb-30'>
            <div className='icon-item'>
              <div className='icon-item__thumb'>
                <Image src={specification_5} alt='specification_5' />
              </div>
              <div className='icon-item__content'>
                <p>bhp</p>
                <span>691</span>
              </div>
            </div>
          </div>
          <div className='col-lg-4 col-sm-6 mb-30'>
            <div className='icon-item'>
              <div className='icon-item__thumb'>
                <Image src={specification_6} alt='specification_6' />
              </div>
              <div className='icon-item__content'>
                <p>Year</p>
                <span>2019</span>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  )
}

export default VehicleOverview
