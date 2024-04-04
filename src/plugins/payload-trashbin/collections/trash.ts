import type { CollectionConfig } from 'payload/types'

import { RestoreButton } from '../components/RestoreButton'

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
  access: {
    create: () => true,
    update: () => false,
  },
  fields: [
    {
      name: 'value',
      type: 'json',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'collectionName',
      type: 'text',
      admin: {
        components: {
          afterInput: [RestoreButton],
        },
      },
    },
  ],
  endpoints: [
    {
      path: '/restore/:id',
      method: 'get',
      handler: async (req, res) => {
        const { payload } = req

        const restoreDocId = req.params.id

        // eslint-disable-next-line dot-notation
        const { value: newValue, collectionName } =
          await payload.db.collections['trash'].findById(restoreDocId)

        const middleData = { ...newValue, _id: newValue.id }
        const { id, ...restData } = middleData

        // // This is to ensure all createAfter hooks of the respective collection get triggers
        // const newlyRestoredDataWithWrongId = await payload.create({
        //   collection: collectionName,
        //   data: convertObject(newValue),
        // })

        // // This is to ensure we remove the duplicated data, which we created just to trigger the afterCreate Hook
        // await payload.db.collections[collectionName].deleteOne({
        //   _id: newlyRestoredDataWithWrongId.id,
        // })

        // This is to have the previous document id of the collection to ensure proper relations
        // await payload.db.collections[collectionName].create(
        //   convertObject(restData),
        // )

        await payload.create({
          collection: collectionName,
          data: { ...convertObject(restData) },
        })

        // @ts-ignore (just in case user was not generating types after adding plugin)
        await payload.delete({ collection: 'trash', id: restoreDocId })

        res.status(200).json({ status: true })
      },
    },
  ],
}

export default Trash
