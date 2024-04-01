import type { CollectionConfig } from 'payload/types'

import { RestoreButton } from '../components/RestoreButton'

export const Trash: CollectionConfig = {
  slug: 'trash',
  access: {
    create: () => false,
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

        await payload.db.collections[collectionName].create(restData)

        // @ts-ignore (just in case user was not generating types after adding plugin)
        await payload.delete({ collection: 'trash', id: restoreDocId })

        res.status(200).json({ success: true })
      },
    },
  ],
}

export default Trash
