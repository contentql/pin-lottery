import { Metadata } from 'next'

import BlogView from '@/views/BlogView'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'This is a blog page',
  openGraph: {
    title: 'Blog',
    description: 'This is a blog page',
    images: [`/images/blog/b1.jpg`],
    type: 'website',
    locale: 'en_US',
    url: `${process.env.NEXT_PUBLIC_SERVER_URL}/blog`,
  },
}

const Blog = () => {
  return <BlogView />
}

export default Blog
