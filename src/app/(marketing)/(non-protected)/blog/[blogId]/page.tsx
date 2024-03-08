import { Blog } from '@/payload-types'
import { generateMeta } from '@/utils/generateMeta'
import BlogDetailsView from '@/views/BlogDetailsView'
import { Metadata } from 'next'
// import { headers } from 'next/headers'
import { getPayloadClient } from '@/get-payload'

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

    // const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/blog/${blogId}`).then((res) => res.json()).catch((error) => console.log(error))

    blog = result as Blog
  } catch (error) {
    console.error('Error fetching blog:', error)
  }

  return generateMeta({ doc: blog as Blog })
}

export default BlogDetails
