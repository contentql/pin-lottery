import { Metadata } from 'next'

import BlogView from '@/views/BlogView'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'This is a blog page',
}

const Blog = () => {
  return <BlogView />
}

export default Blog
