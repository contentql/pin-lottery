import type { CollectionConfig } from 'payload/types'
import qs from 'qs'

import { DefaultCollectionEdit } from '../views/Default'
import DefaultListView from '../views/DefaultListView'

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
        List: DefaultListView,
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

        await Promise.all(
          arrayOfIds.map(async (restoreDocId: string) => {
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
            } catch (error) {
              console.log(
                `Error while creating a entry in ${collectionName} to restore: `,
                error,
              )
            }

            // @ts-ignore (just in case user was not generating types after adding plugin)
            try {
              await payload.delete({ collection: 'trash', id: restoreDocId })
            } catch (error) {
              console.log(
                `Error while deleting ${collectionName} from trash to restore: `,
                error,
              )
            }
          }),
        )

        res.status(200).json({ status: true })
      },
    },
  ],
}

export default Trash
