import { Metadata } from 'next'
import { Suspense } from 'react'

import Loading from '@/components/loading/PageLoading'
import WinnerView from '@/views/WinnerView'

export const metadata: Metadata = {
  title: 'Winner',
  description: 'This is a winner page',
  openGraph: {
    title: 'Winner',
    description: 'This is a Winner page',
    images: [`/images/icon/winner-tab/2.png`],
    type: 'website',
    locale: 'en_US',
    url: `${process.env.NEXT_PUBLIC_SERVER_URL}/winner`,
  },
}

const Winner = async () => {
  return (
    <Suspense fallback={<Loading />}>
      <WinnerView />
    </Suspense>
  )
}

export default Winner
