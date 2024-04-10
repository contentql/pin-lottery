import {
  HTMLConverterFeature,
  lexicalEditor,
  lexicalHTML,
} from '@payloadcms/richtext-lexical'
import { GlobalConfig } from 'payload/types'

const About: GlobalConfig = {
  slug: 'about',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HTMLConverterFeature({}),
        ],
      }),
      admin: {
        description: 'Description to display in about section.',
      },
    },
    lexicalHTML('description', {
      name: 'description_html',
    }),
  ],
}
export default About
