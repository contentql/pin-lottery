import { CollectionConfig } from 'payload/types'
const Blog: CollectionConfig = {
  slug: 'blog',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'title', type: 'text', label: 'Title' },
    { name: 'short_desc', type: 'textarea', label: 'Description' },
    { name: 'content', type: 'richText', label: 'Content' },
    { name: 'img', type: 'upload', relationTo: 'media' },
  ],
}

export default Blog
