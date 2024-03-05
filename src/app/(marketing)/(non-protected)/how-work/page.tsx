import { Metadata } from 'next'

import HowWorksView from '@/views/HowWorksView'

export const metadata: Metadata = {
  title: 'How it works',
  description: 'This is a  how works page',
}

const HowWork = () => {
  return <HowWorksView />
}

export default HowWork
