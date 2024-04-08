import { CollectionAfterDeleteHook } from 'payload/types'
import { Contest } from '../../../payload-types'

export const updateContestAfterDelete: CollectionAfterDeleteHook = async ({
  req, // full express request
  id, // id of document to delete
  doc, // deleted document
}) => {
  const { payload } = req

  try {
    const { totalDocs: ticketsPurchased } = await payload.find({
      collection: 'tickets',
      depth: 1,
      where: {
        'contest_id.value': {
          equals: (doc?.contest_id.value as Contest).id,
        },
      },
    })

    const { id, product_price, ticket_price, threshold_reached_date } = doc
      ?.contest_id.value as Contest

    const reachedThreshold = ticket_price * ticketsPurchased >= product_price
    const date = threshold_reached_date ?? new Date()

    const latestData = {
      tickets_purchased: ticketsPurchased,
      reached_threshold: reachedThreshold,
      threshold_reached_date: reachedThreshold ? date.toString() : undefined,
    }

    try {
      await payload.update({
        collection: 'contest',
        id,
        data: latestData,
      })
    } catch (error) {
      console.error('Error updating contest after deleting a ticket: ', error)
      // throw new Error('Failed to update contest data after deleting a ticket.')
    }
  } catch (error) {
    console.error('Error finding relevant tickets after delete: ', error)
    // throw new Error(
    //   'Failed to find relevant tickets while updating contest data  after delete.',
    // )
  }
}
