import type { Config, Plugin } from 'payload/config'

import { UploadsGridView } from './UploadsGridView'

export const mediaGridView: Plugin = (incomingConfig: Config): Config => {
  // @ts-ignore
  const updatedCollection = incomingConfig.collections.map(collection => {
    if (collection.slug === 'media') {
      const filteredImageSizes =
        (typeof collection.upload === 'object' &&
          collection.upload?.imageSizes?.filter(size => size !== undefined)) ||
        []

      const thumbnailAlreadyExits = Boolean(
        filteredImageSizes.find(image => image.name === 'thumbnail'),
      )

      if (!thumbnailAlreadyExits) {
        filteredImageSizes.push({
          name: 'thumbnail',
          width: 400,
          height: 300,
          position: 'centre',
        })
      }

      return {
        ...collection,
        admin: {
          ...collection.admin,
          components: { views: { List: UploadsGridView } },
          pagination: { defaultLimit: 12, limits: [12, 24, 48] },
        },
        upload: {
          imageSizes: [...filteredImageSizes],
          adminThumbnail:
            (typeof collection.upload === 'object' &&
              collection.upload.adminThumbnail) ||
            'thumbnail',
        },
      }
    }

    return collection
  })

  const config = {
    ...incomingConfig,
    collections: updatedCollection,
  }

  return config
}
