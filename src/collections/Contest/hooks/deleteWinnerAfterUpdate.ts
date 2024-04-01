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
      if (!winner_ticket) {
        const latestData = {
          contest_timer_status: false,
          contest_status: false,
          winner_ticket: null,
        }

        try {
          await payload.update({
            collection: 'contest',
            id: doc?.id,
            data: { ...latestData },
          })
        } catch (error: any) {
          console.error('Error updating contest:', error.message)
          throw new Error('Failed to update contest: ', error.message)
        }

        return
      }

      // Assuming there should be a winner ticket to delete
      try {
        // Delete the winner document
        await payload.delete({
          collection: 'winner',
          id: winner_ticket?.value.id || winner_ticket?.value,
        })
      } catch (error: any) {
        console.error('Error deleting winner document: ', error.message)
        throw new Error('Failed to delete winner document: ', error.message)
      }
    }
  }
}
