import { CollectionAfterChangeHook } from 'payload/types'

export const deleteWinnerAfterUpdate: CollectionAfterChangeHook = async ({
  operation,
  previousDoc,
  doc,
  req,
}) => {
  if (operation === 'update') {
    if (previousDoc?.contest_status && !doc?.contest_status) {
      const { payload } = req

      const { winner_ticket } = previousDoc

      // Check if there was a winner ticket
      if (!winner_ticket) return doc // No winner ticket, so simply return
      console.log('doc: ', previousDoc)
      // Assuming there should be a winner ticket to delete
      try {
        // Delete the winner document
        await payload.delete({
          collection: 'winner',
          id: winner_ticket?.value.id || winner_ticket?.value,
        })

        console.log('deleted: ', winner_ticket?.id)
      } catch (error: any) {
        console.error('Error deleting winner document: ', error.message)
        throw new Error('Failed to delete winner document: ' + error.message)
      }
    }
  }
}
