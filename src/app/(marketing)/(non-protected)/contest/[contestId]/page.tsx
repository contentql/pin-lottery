import { getPayloadClient } from '@/get-payload'
import { Contest } from '@/payload-types'
import { generateMeta } from '@/utils/generate-meta'
import ContestDetailsView from '@/views/ContestDetailsView'
import { Metadata } from 'next'

interface PageProps {
  params: {
    contestId: string
  }
}

const ContestDetails = ({ params }: PageProps) => {
  return <ContestDetailsView contestId={params.contestId} />
}

export async function generateStaticParams() {
  const payload = await getPayloadClient()

  const allContests = await payload.find({
    collection: 'contest',
    pagination: false,
  })

  const contestIdsArray = allContests.docs.map(contest => ({
    contestId: contest.id,
  }))

  return contestIdsArray
}

export const generateMetadata = async ({
  params: { contestId },
}: {
  params: { contestId: string }
}): Promise<Metadata> => {
  let contest: Contest | null = null

  const payload = await getPayloadClient()

  try {
    const result = await payload.findByID({
      collection: 'contest',
      id: contestId,
    })

    contest = result as Contest
  } catch (error) {
    console.error('Error fetching contest:', error)
  }

  return generateMeta({ doc: contest as Contest })
}

export default ContestDetails
