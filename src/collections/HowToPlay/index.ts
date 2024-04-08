import { CollectionConfig } from 'payload/types'

export const HowToPlayInfo: CollectionConfig = {
  slug: 'howToPlayInfo',
  admin: {
    useAsTitle: 'caption',
  },
  fields: [
    {
      name: 'caption',
      label: 'Caption',
      type: 'text',
      required: true,
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'sub_title',
      label: 'Sub Title',
      type: 'text',
      required: true,
    },
    {
      name: 'step',
      label: 'Step',
      type: 'array',
      fields: [
        {
          name: 'icon',
          type: 'upload',
          label: 'Icon',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'how to play icon',
          },
        },
        {
          name: 'step_number',
          label: 'Step Number',
          type: 'number',
          required: true,
        },
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
        },
        {
          name: 'sub_title',
          label: 'Sub Title',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
