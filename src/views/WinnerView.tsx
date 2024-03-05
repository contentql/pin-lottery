'use client'

import LatestWinner from '@/components/common/LatestWinner'
import Support from '@/components/common/Support'
import Testimonial from '@/components/common/Testimonial'
import Banner from '@/components/winner/Banner'
import WinningNumber from '@/components/winner/WinningNumber'

const WinnerView = () => {
  return (
    <>
      <Banner />
      <WinningNumber />
      <LatestWinner />
      <Testimonial />
      <Support />
    </>
  )
}

export default WinnerView
