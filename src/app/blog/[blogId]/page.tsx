import { Metadata } from 'next';

import BlogDetailsView from '@/views/BlogDetailsView';

export const metadata: Metadata = {
  title: 'Blog Details',
  description: 'This is a blog details page',
};

const BlogDetails = () => {
  return <BlogDetailsView />;
};

export default BlogDetails;
