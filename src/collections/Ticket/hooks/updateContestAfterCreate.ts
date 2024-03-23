import { CollectionAfterChangeHook } from 'payload/types'

export const updateContestAfterCreate: CollectionAfterChangeHook = async ({
  operation,
  doc,
  req,
}) => {
  const { payload } = req
  // read total tickets and updated in contest
  // check threshold and update it

  if (operation === 'create') {
    try {
      const { totalDocs: ticketsPurchased } = await payload.find({
        collection: 'tickets',
        depth: 1,
        where: {
          'contest_id.value': {
            equals: doc?.contest_id.value.id,
          },
        },
      })

      const { id, product_price, ticket_price } = doc?.contest_id.value

      const reachedThreshold = ticket_price * ticketsPurchased >= product_price
      const date = doc?.contest_id.value.threshold_reached_date ?? new Date()

      const latestData = {
        tickets_purchased: ticketsPurchased,
        reached_threshold: reachedThreshold,
        threshold_reached_date: reachedThreshold ? date.toString() : undefined,
      }

      await payload.update({
        collection: 'contest',
        id,
        data: latestData,
      })
    } catch (error) {
      console.error('Error updating contest:', error)
      throw new Error('Failed to update contest data.')
    }
  }
}
