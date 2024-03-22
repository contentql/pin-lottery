import type { CollectionConfig, Field } from 'payload/types'

const urlField: Field = {
  name: 'url',
  type: 'text',
}

export const Media: CollectionConfig = {
  access: {
    read: () => true,
    delete: () => true,
  },
  slug: 'media',
  hooks: {
    afterRead: [
      ({ doc }) => {
        const pubR2URL =
          'https://pub-4569e4e5d557441e896fc4fbf32626f3.r2.dev/cql-storage-r2'

        doc.url = `${pubR2URL}/${doc.filename}`

        Object.keys(doc.sizes).forEach(
          csize =>
            (doc.sizes[csize].url = `${pubR2URL}/${doc.sizes[csize].filename}`),
        )
      },
    ],
  },
  upload: {
    imageSizes: [
      {
        height: 40,
        width: undefined,
        crop: 'center',
        name: 'navUserImage',
      },
      {
        height: 200,
        width: undefined,
        crop: 'center',
        name: 'contestImage',
      },
      {
        height: undefined,
        width: 160,
        crop: 'center',
        name: 'userProfile',
      },
      {
        height: 400,
        width: 400,
        crop: 'center',
        name: 'square',
      },
      {
        width: 900,
        height: 450,
        crop: 'center',
        name: 'sixteenByNineMedium',
      },
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        // By specifying `undefined` or leaving a height undefined,
        // the image will be sized to a certain width,
        // but it will retain its original aspect ratio
        // and calculate a height automatically.
        height: undefined,
        position: 'centre',
      },
    ],
    focalPoint: false,
    crop: false,
  },
  fields: [
    {
      name: 'alt',
      label: 'Alt Text',
      type: 'text',
      admin: {
        description: 'The alternative text for the media file.',
      },
    },

    // The following fields should be able to be merged in to default upload fields
    urlField,
    {
      name: 'sizes',
      type: 'group',
      fields: [
        {
          name: 'square',
          type: 'group',
          fields: [urlField],
        },
      ],
    },
  ],
}
