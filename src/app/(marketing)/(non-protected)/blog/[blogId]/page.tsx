import { Metadata } from 'next'

import { getPayloadClient } from '@/get-payload'
import { Blog } from '@/payload-types'
import { generateMeta } from '@/utils/generate-meta'
import BlogDetailsView from '@/views/BlogDetailsView'

interface PageProps {
  params: {
    blogId: string
  }
}

const BlogDetails = async ({ params }: PageProps) => {
  const { blogId } = params
  const payload = await getPayloadClient()
  try {
    const blog = await payload.findByID({
      collection: 'blog',
      id: blogId,
    })
    return <BlogDetailsView blogId={blogId} blog={blog} />
  } catch (error) {
    console.error('Error: ' + error)
  }

  return
}

export async function generateStaticParams() {
  const payload = await getPayloadClient()

  const allBlogs = await payload.find({
    collection: 'blog',
    pagination: false,
  })

  const blogIdsArray = allBlogs.docs.map(blog => ({ blogId: blog.id }))

  return blogIdsArray
}

export const generateMetadata = async ({
  params: { blogId },
}: {
  params: { blogId: string }
}): Promise<Metadata> => {
  let blog: Blog | null = null

  const payload = await getPayloadClient()

  try {
    const result = await payload.findByID({
      collection: 'blog',
      id: blogId,
    })

    blog = result as Blog
  } catch (error) {
    console.error('Error fetching blog:', error)
  }

  return generateMeta({ doc: blog as Blog })
}

export default BlogDetails
