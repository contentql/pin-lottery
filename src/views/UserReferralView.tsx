'use client'

import LeftSideMenu from '@/components/common/LeftSideMenu'
import RightSide from '@/components/user-referral/RightSide'

const UserReferralView = () => {
  return (
    <>
      <div className='inner-hero-section style--five'></div>

      <div className='mt-minus-150 pb-120'>
        <div className='container'>
          <div className='row'>
            {/* TODO: suer info */}
            <LeftSideMenu />

            {/* RIght side here */}
            <RightSide />
          </div>
        </div>
      </div>
    </>
  )
}

export default UserReferralView
