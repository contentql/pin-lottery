import { Metadata } from 'next'

import { Suspense } from 'react'

import Loading from '@/components/loading/PageLoading'
import { getPayloadClient } from '@/get-payload'
import ContestView from '@/views/ContestView'

export const metadata: Metadata = {
  title: 'Contest',
  description: 'This is a contest page',
  openGraph: {
    title: 'Contest',
    description: 'This is a contest page',
    images: [`/images/icon/contest-feature/2.png`],
    type: 'website',
    locale: 'en_US',
    url: `${process.env.NEXT_PUBLIC_SERVER_URL}/contest`,
  },
}

export async function generateStaticParams(): Promise<any> {
  const payload = await getPayloadClient()
  try {
    const contests = await payload.find({
      collection: 'contest',
      depth: 6,
      limit: 9,
    })
    return contests as any
  } catch (error: any) {
    console.error('Error fetching about:', error)
  }
}

const ContestPage = async () => {
  let contestsData = null
  const payload = await getPayloadClient()
  try {
    const { docs, totalDocs } = await payload.find({
      collection: 'contest',
      depth: 6,
      limit: 9,
    })
    contestsData = { allContests: docs, totalContests: totalDocs } as any
  } catch (error: any) {
    console.error('Error fetching about:', error)
  }
  return (
    <Suspense fallback={<Loading />}>
      <ContestView contestsData={contestsData as any} />
    </Suspense>
  )
}

export default ContestPage
