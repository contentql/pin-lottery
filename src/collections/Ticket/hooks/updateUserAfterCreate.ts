import { CollectionAfterChangeHook } from 'payload/types'

export const updateUserAfterCreate: CollectionAfterChangeHook = async ({
  doc, // full document data
  req, // full express request
  previousDoc, // document data before updating the collection
  operation, // name of the operation ie. 'create', 'update'
}) => {
  const { payload, user, context } = req

  const { chargeAmount } = context

  if (operation === 'create') {
    if (!chargeAmount) return

    const reducedAmount = user.amount - doc.ticket_price

    if (user.amount && user.amount >= doc.ticket_price) {
      try {
        await payload.update({
          collection: 'users',
          data: {
            amount: reducedAmount,
          },
          where: {
            id: {
              equals: user.id,
            },
          },
        })
      } catch (error) {
        console.log('Error while updating user amount: ', error)
      }
    } else {
      console.log('User amount is insufficient.')

      try {
        await payload.delete({
          collection: 'tickets',
          id: doc.id,
        })
      } catch (error) {
        console.log(
          'Error while deleting ticket because of insufficient user amount: ',
          error,
        )
      }
    }
  }
}
