import { Metadata } from 'next'

import { Suspense } from 'react'

import Loading from '@/components/loading/PageLoading'
import WinnerView from '@/views/WinnerView'

export const metadata: Metadata = {
  title: 'Winner',
  description: 'This is a winner page',
}

const Winner = async () => {
  return (
    <Suspense fallback={<Loading />}>
      <WinnerView />
    </Suspense>
  )
}

export default Winner
