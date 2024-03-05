'use client'

import LeftSideMenu from '@/components/common/LeftSideMenu'
import RightSide from '@/components/user/RightSide'

const UserView = () => {
  return (
    <>
      <div className='inner-hero-section style--five'></div>

      <div className='mt-minus-150 pb-120'>
        <div className='container'>
          <div className='row'>
            {/* left side menu */}
            <LeftSideMenu />

            {/* Right side  */}
            <RightSide />
          </div>
        </div>
      </div>
    </>
  )
}

export default UserView
