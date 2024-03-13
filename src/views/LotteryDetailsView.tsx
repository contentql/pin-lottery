'use client'

import Banner from '@/components/common/Banner'
import LotteryBody from '@/components/lottery-details/LotteryBody'
import { Contest } from '@/payload-types'
import { trpc } from '@/trpc/client'

interface Props {
  contestId: string
}

const LotteryDetailsView = ({ contestId }: Props) => {
  const { data: contestDetails } = trpc.contest.getContestById.useQuery({
    id: contestId,
  })

  return (
    <>
      {/* Banaer section Here */}
      <div className='inner-hero-section style--two'>
        <Banner
          breadcrumb={[
            ['Home', '/'],
            ['Lottery', '/'],
            [`Contest No: ${contestDetails?.contest_no}`, '/'],
            ['Pick your Lottery Number', '/'],
          ]}
        />
      </div>

      {/* Lottery body here */}
      <LotteryBody contestDetails={contestDetails as Contest} />
    </>
  )
}

export default LotteryDetailsView
