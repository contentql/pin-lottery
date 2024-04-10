import { Metadata } from 'next'

import { getPayloadClient } from '@/get-payload'
import HomeView from '@/views/HomeView'

export const metadata: Metadata = {
  title: 'Lottery',
  description: 'This is a home page',
}

export async function generateStaticParams(): Promise<any[]> {
  const payload = await getPayloadClient()
  try {
    const heroContests = await payload.find({
      collection: 'contest',
      depth: 6,
      pagination: false,
      where: {
        show_in_hero: {
          equals: true,
        },
      },
    })
    return [{ id: '/' }]
  } catch (error: any) {
    console.error('Error fetching contests:', error)
  }
  return [{ id: '/' }]
}

const Home = async () => {
  const payload = await getPayloadClient()
  try {
    const { docs: heroContests } = await payload.find({
      collection: 'contest',
      depth: 6,
      pagination: false,
      where: {
        show_in_hero: {
          equals: true,
        },
      },
    })

    return <HomeView heroData={heroContests} />
  } catch (error) {
    console.error('Error: ' + error)
  }
}

export default Home
