'use client'

import Banner from '@/components/common/Banner'
import ContestBody from '@/components/contest-details/ContestBody'
import { Contest } from '@/payload-types'
import { trpc } from '@/trpc/client'
import Image from 'next/image'
import inner_hero_shape from '/public/images/elements/inner-hero-shape.png'

interface PageProps {
  contestId: string
}

const ContestDetailsView = ({ contestId }: PageProps) => {
  const { data } = trpc.contest.getContestById.useQuery({
    id: contestId,
  })

  const contestDetails = data?.at(0)

  return (
    <>
      {/* Banner section here */}
      <div className='inner-hero-section'>
        <div className='bg-shape'>
          <Image src={inner_hero_shape} alt='inner_hero_shape' />
        </div>
        <Banner
          breadcrumb={[
            ['Home', '/'],
            ['Lottery', '/'],
            ['Contest No: B2T', '/'],
          ]}
        />
      </div>

      {/* Bdy section here */}
      <ContestBody contestDetails={contestDetails as Contest} />
    </>
  )
}

export default ContestDetailsView
