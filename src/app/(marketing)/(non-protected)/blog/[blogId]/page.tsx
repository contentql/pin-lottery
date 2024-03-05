import BlogDetailsView from '@/views/BlogDetailsView'
import { Metadata } from 'next'

interface PageProps {
  params: {
    blogId: string
  }
}

export const metadata: Metadata = {
  title: 'Blog Details',
  description: 'This is a blog details page',
}

const BlogDetails = ({ params }: PageProps) => {
  const { blogId } = params
  console.log('parmas in page', params)
  return <BlogDetailsView params={params} />
}

export default BlogDetails
