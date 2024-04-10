import { GlobalConfig } from 'payload/types'

const Team: GlobalConfig = {
  slug: 'team',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      required: true,
    },
    {
      name: 'team',
      type: 'array',
      fields: [
        {
          name: 'user_image',
          label: 'User Image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
          label: 'Name',
          required: true,
        },
        {
          name: 'designation',
          type: 'text',
          label: 'Designation',
          required: true,
        },
      ],
    },
  ],
}
export default Team
