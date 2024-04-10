import { GlobalConfig } from 'payload/types'

export const Support: GlobalConfig = {
  slug: 'supportInfo',
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
      name: 'support_img',
      type: 'upload',
      label: 'Support Image',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'support team image',
      },
    },
    {
      name: 'heading1',
      label: 'Heading 1',
      type: 'text',
      required: true,
    },
    {
      name: 'description1',
      label: 'Description 1',
      type: 'text',
      required: true,
    },
    {
      name: 'guide_img',
      type: 'upload',
      label: 'Guide Image',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'lottery guide image',
      },
    },
    {
      name: 'heading2',
      label: 'Heading 2',
      type: 'text',
      required: true,
    },
    {
      name: 'description2',
      label: 'Description 2',
      type: 'text',
      required: true,
    },
  ],
}
