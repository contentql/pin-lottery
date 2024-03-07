import { Blog } from '@/payload-types'
import { generateMeta } from '@/utils/generateMeta'
import BlogDetailsView from '@/views/BlogDetailsView'
import { Metadata } from 'next'
import payload from 'payload'

interface PageProps {
  params: {
    blogId: string
  }
}

const BlogDetails = ({ params }: PageProps) => {
  const { blogId } = params
  console.log('parmas in page', params)
  return <BlogDetailsView params={params} />
}

export async function getStaticParams() {
  return [{ blogId: '65e701cfce4aa870f5168e0d' }]
}

export const generateMetadata = async ({
  params: { blogId },
}: {
  params: { blogId: string }
}): Promise<Metadata> => {
  let blog: Blog | null = null

  try {
    const result = await payload.find({
      collection: 'blog',
      where: {
        id: {
          equals: blogId,
        },
      },
    })

    blog = (await result?.docs?.at(0)) as Blog
  } catch (error) {
    console.error('Error fetching blog:', error)
  }

  return generateMeta({ doc: blog as Blog })
}

export default BlogDetails
