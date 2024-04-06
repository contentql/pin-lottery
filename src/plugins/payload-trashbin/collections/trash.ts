import type { CollectionConfig } from 'payload/types'
import qs from 'qs'

import { RestoreButton } from '../components/RestoreButton'
import DefaultListView from '../views/DefaultListView'

// This is a object converter that converts any  expanded relation including nested to plain relation (where the value of the relation is just the id)
function convertObject(obj: any) {
  Object.keys(obj).forEach(key => {
    if (Object.prototype.hasOwnProperty.call(obj[key], 'relationTo')) {
      obj[key].value = obj[key].value.id
    }
  })

  for (let key in obj) {
    if (typeof obj[key] === 'object') {
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
    components: { views: { List: DefaultListView } },
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
      admin: {
        components: {
          afterInput: [RestoreButton],
        },
      },
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

        console.log({ queryString })

        const arrayOfIds = (qs.parse(queryString) as any).where?.id?.in

        console.log({ arrayOfIds })

        await Promise.all(
          arrayOfIds.map(async (restoreDocId: string) => {
            // eslint-disable-next-line dot-notation
            const { value: newValue, collectionName } =
              await payload.db.collections['trash'].findById(restoreDocId)

            const middleData = { ...newValue, _id: newValue.id }
            const { id, ...restData } = middleData

            await payload.create({
              collection: collectionName,
              data: { ...convertObject(restData) },
            })

            // @ts-ignore (just in case user was not generating types after adding plugin)
            await payload.delete({ collection: 'trash', id: restoreDocId })
          }),
        )

        res.status(200).json({ status: true })
      },
    },
  ],
}

export default Trash
