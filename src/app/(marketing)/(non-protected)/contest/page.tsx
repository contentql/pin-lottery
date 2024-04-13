import { Metadata } from 'next'
import { Suspense } from 'react'

import Loading from '@/components/loading/PageLoading'
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

const Contest = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ContestView />
    </Suspense>
  )
}

export default Contest
