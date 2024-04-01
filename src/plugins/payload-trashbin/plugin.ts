import type { Config, Plugin } from 'payload/config'
import Trash from './collections/trash'
import { AfterDeleteHook } from 'payload/dist/collections/config/types'

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

export const trashBin: Plugin = (incomingConfig: Config): Config => {
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
    collections: [...updatedCollectionWithAfterDelete, Trash],
  }

  return config
}
