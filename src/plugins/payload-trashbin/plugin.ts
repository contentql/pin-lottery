import type { Config, Plugin } from 'payload/config'
import { AfterDeleteHook } from 'payload/dist/collections/config/types'

import Trash from './collections/trash'
import { PluginTypes } from './types'

const addDocumentToTrashCollection: AfterDeleteHook = async ({
  req,
  doc,
  collection,
}) => {
  const { payload } = req

  const trashDoc = {
    collectionName: collection.slug, // should be same as slug
    value: doc,
  }

  // @ts-ignore (just in case user was not generating types after adding plugin)
  try {
    await payload.create({
      collection: 'trash',
      data: trashDoc,
    })
  } catch (error) {
    console.log(`Error while adding ${collection.slug} to trash: `, error)
  }
}

export const trashBin =
  (pluginOptions: PluginTypes): Plugin =>
  (incomingConfig: Config): Config => {
    const { displayToRoles, doNotEnableTrash } = pluginOptions

    const mediaEnabledCollections = (incomingConfig.collections || [])
      .filter(collection => collection.upload)
      .map(collection => collection.slug)

    const doNotEnableTrashFromPluginConfigWithMedia = [
      ...new Set([...(doNotEnableTrash || []), ...mediaEnabledCollections]),
    ]

    const updatedCollectionWithAfterDelete = (
      incomingConfig.collections || []
    ).map(collection => {
      if (
        doNotEnableTrashFromPluginConfigWithMedia?.includes(collection.slug)
      ) {
        return collection
      }

      return {
        ...collection,
        hooks: {
          ...collection.hooks,
          afterDelete: [
            ...(collection.hooks?.afterDelete || []),
            addDocumentToTrashCollection,
          ],
        },
      }
    })

    const config = {
      ...incomingConfig,
      collections: [
        ...updatedCollectionWithAfterDelete,

        {
          ...Trash,
          admin: {
            ...Trash.admin,
            // @ts-ignore (JWT User issues, it is mandatory to save the roles in JWT here)
            hidden: ({ user }) => {
              if (!displayToRoles?.length) {
                return false
              }

              if (displayToRoles?.includes('all')) {
                return false
              }

              if (user) {
                const { roles } = user
                if (displayToRoles?.some(role => roles.includes(role)))
                  return false
              }

              return true
            },
          },
        },
      ],
    }

    return config
  }
