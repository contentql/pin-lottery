import { Metadata } from 'next'

import HowWorksView from '@/views/HowWorksView'

export const metadata: Metadata = {
  title: 'How it works',
  description: 'This is a  how works page',
  openGraph: {
    title: 'How it works',
    description: 'This is a how-it-works page',
    images: [`/images/icon/how-work/2.png`],
    type: 'website',
    locale: 'en_US',
    url: `${process.env.NEXT_PUBLIC_SERVER_URL}/how-work`,
  },
}

const HowWork = () => {
  return <HowWorksView />
}

export default HowWork
