import type { Config, Plugin } from 'payload/config'
import { CollectionAfterReadHook } from 'payload/types'
import { PluginTypes } from './types'

export const mediaCloudflareURLHandler =
  (pluginOptions: PluginTypes): Plugin =>
  (incomingConfig: Config): Config => {
    const { pubR2URL } = pluginOptions

    const changeUrlOfMediaAfterRead: CollectionAfterReadHook = ({ doc }) => {
      doc.url = `${pubR2URL}/${doc.filename}`

      Object.keys(doc.sizes).forEach(
        csize =>
          (doc.sizes[csize].url = `${pubR2URL}/${doc.sizes[csize].filename}`),
      )
    }

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
