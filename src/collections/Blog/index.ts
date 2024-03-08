import {
  HTMLConverterFeature,
  lexicalEditor,
  lexicalHTML,
} from '@payloadcms/richtext-lexical'
import { CollectionConfig } from 'payload/types'
const Blog: CollectionConfig = {
  slug: 'blog',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', type: 'text', label: 'Title' },
    { name: 'short_desc', type: 'textarea', label: 'Description' },
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HTMLConverterFeature({}),
        ],
      }),
    },
    { name: 'img', type: 'upload', relationTo: 'media' },
    lexicalHTML('content', {
      name: 'content_html',
    }),
  ],
}

export default Blog
