import { Blog } from '@/payload-types'
import { trpc } from '@/trpc/client'
import { generateMeta } from '@/utils/generateMeta'
import BlogDetailsView from '@/views/BlogDetailsView'
import { Metadata } from 'next'
import { headers } from 'next/headers'
import payload from 'payload'

interface PageProps {
  params: {
    blogId: string
  }
}

const BlogDetails = ({ params }: PageProps) => {
  const { blogId } = params
  console.log('parmas in page', params)
  return <BlogDetailsView blogId={blogId} />
}

export async function generateStaticParams() {
  return [{ blogId: '65e748b51d080fcf7554a29a' }]
}

export const generateMetadata = async ({
  params: { blogId },
}: {
  params: { blogId: string }
}): Promise<Metadata> => {
  let blog: Blog | null = null

  try {
    // const result = await payload.find({
    //   collection: 'blog',
    //   where: {
    //     id: {
    //       equals: '65e748b51d080fcf7554a29a',
    //     },
    //   },
    // })

    const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/blog/${blogId}`).then((res) => res.json())

    blog = result?.docs?.at(0) as Blog
  } catch (error) {
    console.error('Error fetching blog:', error)
  }

  return generateMeta({ doc: blog as Blog })
}

export default BlogDetails
