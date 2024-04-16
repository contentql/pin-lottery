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
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
          admin: { description: 'Title of the blog post.' },
        },

        {
          name: 'tag',
          type: 'select',
          label: 'Tag',
          options: [
            { label: 'Loot tips', value: 'Loot Tips' },
            { label: 'Mega Millions ', value: 'Mega Millions' },
            { label: 'Loot', value: 'Loot' },
            { label: 'Winners', value: 'Winners' },
            { label: 'Bonus', value: 'Bonus' },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'author_name',
          type: 'text',
          label: 'Author Name',
        },
        {
          name: 'author_image',
          type: 'upload',
          relationTo: 'media',
          label: 'Author Image',
        },
      ],
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
