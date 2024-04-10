import { Metadata } from 'next'

import { trpc } from '@/trpc/client'
import HomeView from '@/views/HomeView'

export const metadata: Metadata = {
  title: 'Lottery',
  description: 'This is a home page',
}

export async function generateStaticParams(): Promise<any[]> {
  // Call an external API endpoint to get posts
  let contest: any | null = null
  try {
    const result = trpc.contest.getOngoingContests.useQuery()
    contest = result as any
  } catch (error) {
    console.log('error')
  }

  return contest
}

const Home = ({ params }: { params: any[] }) => {
  return <HomeView contest={params} />
}

export default Home
