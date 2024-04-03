import type { Config, Plugin } from 'payload/config'
import { CollectionAfterReadHook } from 'payload/types'
import { PluginTypes } from './types'

const changeUrlOfMediaAfterRead: CollectionAfterReadHook = ({ doc }) => {
  const pubR2URL =
    'https://pub-4569e4e5d557441e896fc4fbf32626f3.r2.dev/cql-storage-r2'

  doc.url = `${pubR2URL}/${doc.filename}`

  Object.keys(doc.sizes).forEach(
    csize =>
      (doc.sizes[csize].url = `${pubR2URL}/${doc.sizes[csize].filename}`),
  )
}

export const mediaCloudflareURLHandler =
  (pluginOptions: PluginTypes): Plugin =>
  (incomingConfig: Config): Config => {
    const {} = pluginOptions

    const updatedCollectionWithAfterRead = (
      incomingConfig.collections || []
    )?.map(collection => {
      if (collection.slug === 'media') {
        return {
          ...collection,
          hooks: {
            ...collection.hooks,
            afterRead: [
              ...(collection.hooks?.afterRead || []),
              changeUrlOfMediaAfterRead,
            ],
          },
        }
      }

      return { ...collection }
    })

    return {
      ...incomingConfig,
      collections: [...updatedCollectionWithAfterRead],
    }
  }
