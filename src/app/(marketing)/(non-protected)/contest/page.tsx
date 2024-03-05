import { Metadata } from 'next'

import ContestView from '@/views/ContestView'

export const metadata: Metadata = {
  title: 'Contest',
  description: 'This is a contest page',
}

const Contest = () => {
  return <ContestView />
}

export default Contest
