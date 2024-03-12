import { Metadata } from 'next'

import { Suspense } from 'react'

import Loading from '@/components/loading/PageLoading'
import ContestView from '@/views/ContestView'

export const metadata: Metadata = {
  title: 'Contest',
  description: 'This is a contest page',
}

const Contest = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ContestView />
    </Suspense>
  )
}

export default Contest
