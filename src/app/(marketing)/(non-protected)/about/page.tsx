import { Metadata } from 'next'

import { getPayloadClient } from '@/get-payload'
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

export async function generateStaticParams(): Promise<any> {
  const payload = await getPayloadClient()
  try {
    const about = await payload.findGlobal({
      slug: 'about',
      depth: 6,
    })
    return about as any
  } catch (error: any) {
    console.error('Error fetching about:', error)
  }
}

const AboutPage = async () => {
  let aboutInfo = null
  const payload = await getPayloadClient()
  try {
    const about = await payload.findGlobal({
      slug: 'about',
      depth: 6,
    })
    aboutInfo = about
  } catch (error: any) {
    console.error('Error fetching about:', error)
  }

  return <AboutView aboutInfo={aboutInfo as any} />
}

export default AboutPage
