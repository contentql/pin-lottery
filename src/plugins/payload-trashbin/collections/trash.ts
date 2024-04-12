import type { CollectionConfig } from 'payload/types'
import qs from 'qs'

import { DefaultCollectionEdit } from '../views/Edit/Default'
import DefaultListView from '../views/List/DefaultListView'

// This is a object converter that converts any  expanded relation including nested to plain relation (where the value of the relation is just the id)
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

        const queryString = req.params.id

        const arrayOfIds = (qs.parse(queryString) as any).where?.id?.in

        const convertArrayOfIds =
          typeof arrayOfIds === 'object' && !Array.isArray(arrayOfIds)
            ? Object.values(arrayOfIds || {})
            : [...arrayOfIds]

        try {
          await Promise.all(
            convertArrayOfIds?.map(async (restoreDocId: string) => {
              // eslint-disable-next-line dot-notation
              const { value: newValue, collectionName } =
                await payload.db.collections['trash'].findById(restoreDocId)

              const middleData = { ...newValue, _id: newValue.id }
              const { id, ...restData } = middleData

              try {
                await payload.create({
                  collection: collectionName,
                  data: { ...convertObject(restData) },
                })

                // Delete the document from the trash only if creation succeeds
                await payload.delete({
                  collection: 'trash',
                  id: restoreDocId,
                })
              } catch (error: any) {
                console.log(`Error while restoring ${collectionName}: `, error)
                if (error.data.at(0).message) {
                  res.status(500).json({
                    error: error.data.at(0).message,
                  })
                } else {
                  res.status(500).json({
                    error: `An error occurred while restoring ${collectionName}: ${error}`,
                  })
                }
              }
            }),
          )

          res.status(200).json({ status: true })
        } catch (error) {
          console.log('Error while restoring: ', error)
        }
      },
    },
  ],
}

export default Trash
