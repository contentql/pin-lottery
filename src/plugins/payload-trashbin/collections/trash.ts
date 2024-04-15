import { DefaultCollectionEdit } from '../views/Edit/Default'
import DefaultListView from '../views/List/DefaultListView'
import type { CollectionConfig } from 'payload/types'
import qs from 'qs'

// This is an object converter that converts any expanded relation including nested to plain relation (where the value of the relation is just the id)
function convertObject(obj: any) {
  Object.keys(obj).forEach(key => {
    // To convert relations
    if (
      obj[key] &&
      Object.prototype.hasOwnProperty.call(obj[key], 'relationTo')
    ) {
      obj[key].value = obj[key].value.id || obj[key].value
    }

    // To convert images
    if (
      obj[key] &&
      Object.prototype.hasOwnProperty.call(obj[key], 'mimeType')
    ) {
      obj[key] = obj[key].id || obj[key]
    }
  })

  for (let key in obj) {
    // typeOf null is an object
    if (obj[key] && typeof obj[key] === 'object') {
      convertObject(obj[key])
    }
  }

  return obj
}

export const Trash: CollectionConfig = {
  slug: 'trash',
  labels: {
    plural: 'Trash Bin',
  },
  admin: {
    useAsTitle: 'collectionName',
    components: {
      views: {
        List: { Component: DefaultListView },
        Edit: {
          Default: { Component: DefaultCollectionEdit },
        },
      },
    },
  },
  access: {
    create: () => false,
    update: () => false,
  },
  fields: [
    {
      name: 'value',
      type: 'json',
      label: 'Deleted Document',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'collectionName',
      type: 'text',
      label: 'Collection Name',
      // admin: {
      //   components: {
      //     afterInput: [RestoreButton],
      //   },
      // },
    },
    // {
    //   name: 'actions',
    //   type: 'text',
    //   label: 'Actions',
    //   admin: {
    //     hidden: true,
    //     components: {
    //       Cell: RestoreButtonInCell,
    //     },
    //   },
    // },
  ],
  endpoints: [
    {
      path: '/restore/:id',
      method: 'get',
      handler: async (req, res) => {
        const { payload } = req

        try {
          const queryString = req.params.id
          const arrayOfIds = (qs.parse(queryString) as any).id

          // Ensure arrayOfIds is an array
          const restoreDocIds = Array.isArray(arrayOfIds)
            ? arrayOfIds
            : [arrayOfIds]

          // Use Promise.allSettled() to ensure all restoration operations are settled
          const results = await Promise.allSettled(
            restoreDocIds.map(async (restoreDocId: string) => {
              try {
                const trashDocument =
                  await payload.db.collections['trash'].findById(restoreDocId)

                if (!trashDocument) {
                  throw new Error(
                    `Trash document with ID ${restoreDocId} not found`,
                  )
                }

                const { value: newValue, collectionName } = trashDocument

                // Convert nested objects and relations to plain IDs
                const convertedData = convertObject(newValue)

                // Create a new document in the original collection
                await payload.create({
                  collection: collectionName,
                  data: convertedData,
                })

                // Delete the document from the trash collection
                await payload.delete({
                  collection: 'trash',
                  id: restoreDocId,
                })

                // Return a success result for this operation
                return { status: 'fulfilled', id: restoreDocId }
              } catch (error: any) {
                // Return a failed result for this operation
                return { status: 'rejected', reason: error.message }
              }
            }),
          )

          // Check if any promise failed
          const hasError = results.some(result => result.status === 'rejected')

          if (hasError) {
            // If any promise failed, return an error response
            res
              .status(500)
              .json({ error: 'Error while restoring documents', results })
          } else {
            // If all promises succeeded, return a success response
            res.status(200).json({ status: true })
          }
        } catch (error) {
          // If an unexpected error occurred, return a generic error response
          res.status(500).json({ error: 'Error while restoring documents' })
        }
      },
    },
  ],
}

export default Trash
