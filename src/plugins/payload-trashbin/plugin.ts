import type { Config, Plugin } from 'payload/config'
import Trash from './collections/trash'
import { AfterDeleteHook } from 'payload/dist/collections/config/types'
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
  await payload.create({
    collection: 'trash',
    data: trashDoc,
  })
}

export const trashBin =
  (pluginOptions: PluginTypes): Plugin =>
  (incomingConfig: Config): Config => {
    const updatedCollectionWithAfterDelete = (
      incomingConfig.collections || []
    ).map(collection => {
      return {
        ...collection,
        hooks: {
          ...collection.hooks,
          afterDelete: [addDocumentToTrashCollection],
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
            // @ts-ignore (JWT User issues, it is mandatory to save the roles in JWT here)
            hidden: ({ user }) => {
              if (user) {
                const { roles } = user
                if (
                  !pluginOptions.displayToRoles?.some(role =>
                    roles.includes(role),
                  )
                )
                  return true
              }

              return false
            },
          },
        },
      ],
    }

    return config
  }
