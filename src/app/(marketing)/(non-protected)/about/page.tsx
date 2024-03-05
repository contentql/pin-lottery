import { Metadata } from 'next'

import AboutView from '@/views/AboutView'

export const metadata: Metadata = {
  title: 'About',
  description: 'This is a about page',
}

const About = () => {
  return <AboutView />
}

export default About
