import { CollectionAfterChangeHook } from 'payload/types'

export const deleteCartAfterUpdate: CollectionAfterChangeHook = async ({
  operation,
  previousDoc,
  doc,
  req,
}) => {
  if (operation === 'update') {
    if (!previousDoc?.contest_status && doc?.contest_status) {
      const { payload } = req
      try {
        await payload.delete({
          collection: 'cart',
          where: {
            'contest_id.value': {
              equals: doc.id,
            },
          },
        })
      } catch (error: any) {
        console.error('Error while deleting cart: ', error)
        throw new Error('Failed to delete cart.')
      }
    }
  }
}
