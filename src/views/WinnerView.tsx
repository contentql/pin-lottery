'use client'

import LatestWinner from '@/components/common/LatestWinner'
import Support from '@/components/common/Support'
import Testimonial from '@/components/common/Testimonial'
import Banner from '@/components/winner/Banner'
import { trpc } from '@/trpc/client'

const WinnerView = () => {
  const { data } = trpc.winner.getWinnersByAggregations.useQuery()

  console.log('aggregations', data)
  return (
    <>
      <Banner />
      {/* <WinningNumber /> */}
      <LatestWinner />
      <Testimonial />
      <Support />
    </>
  )
}

export default WinnerView
