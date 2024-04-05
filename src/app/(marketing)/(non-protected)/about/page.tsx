import { Metadata } from 'next'

import AboutView from '@/views/AboutView'

export const metadata: Metadata = {
  title: 'About',
  description: 'This is a about page',
  openGraph: {
    title: 'about',
    description: 'This is a about page',
    images: [`/images/client/3.png`],
    type: 'website',
    locale: 'en_US',
    url: `${process.env.NEXT_PUBLIC_SERVER_URL}/about`,
  },
}

const About = () => {
  return <AboutView />
}

export default About
