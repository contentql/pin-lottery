import {
  HTMLConverterFeature,
  lexicalEditor,
  lexicalHTML,
} from '@payloadcms/richtext-lexical'
import { CollectionConfig } from 'payload/types'
import { JWTUser } from '../../custom-payload-types'

const Blog: CollectionConfig = {
  slug: 'blog',
  admin: {
    useAsTitle: 'title',
    hidden: ({ user }: { user: JWTUser }) => {
      const { roles } = user

      if (roles?.includes('manager')) return true

      return false
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      admin: { description: 'Title of the blog post.' },
    },
    {
      name: 'short_desc',
      type: 'textarea',
      label: 'Description',
      required: true,
      admin: { description: 'Summary of the blog post content.' },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HTMLConverterFeature({}),
        ],
      }),
      admin: {
        description:
          'Main content of the blog post. Use the rich text editor for formatting.',
      },
    },
    {
      name: 'img',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Image associated with the blog post.',
      },
    },
    lexicalHTML('content', {
      name: 'content_html',
    }),
  ],
}

export default Blog
