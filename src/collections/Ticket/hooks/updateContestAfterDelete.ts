import { Contest } from '../../../payload-types'
import { CollectionAfterDeleteHook } from 'payload/types'

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
          equals: doc?.contest_id.value.id || doc?.contest_id.value,
        },
      },
    })

    const {
      id: contestId,
      product_price,
      ticket_price,
      threshold_reached_date,
    } = doc?.contest_id.value as Contest

    if (!contestId) {
      throw new Error('Contest ID not found for the ticket')
    }

    const reachedThreshold = ticket_price * ticketsPurchased >= product_price
    const date = threshold_reached_date ?? new Date()

    const latestData = {
      tickets_purchased: ticketsPurchased,
      reached_threshold: reachedThreshold,
      threshold_reached_date: reachedThreshold ? date.toString() : undefined,
    }

    await payload.update({
      collection: 'contest',
      id: contestId,
      data: latestData,
    })
  } catch (error) {
    console.error('Error in updateContestAfterCreate:', error)
  }
}
