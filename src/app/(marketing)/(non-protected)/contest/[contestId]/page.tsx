import { Contest } from '@/payload-types'
import { generateMeta } from '@/utils/generateMeta'
import ContestDetailsView from '@/views/ContestDetailsView'
import { Metadata } from 'next'
import payload from 'payload'

interface PageProps {
  params: {
    [key: string]: string | string[] | undefined
  }
}

const ContestDetails = ({ params }: PageProps) => {
  return <ContestDetailsView params={params} />
}

export const generateMetadata = async ({
  params: { contestId },
}: {
  params: { contestId: string }
}): Promise<Metadata> => {
  let contest: Contest | null = null

  try {
    const result = await payload.find({
      collection: 'contest',
      where: {
        id: {
          equals: contestId,
        },
      },
    })

    contest = result?.docs?.at(0) as Contest
  } catch (error) {
    console.error('Error fetching contest:', error)
  }

  return generateMeta({ doc: contest as Contest })
}

export default ContestDetails
