import { CollectionAfterOperationHook } from 'payload/types'

export const updateContestAfterDelete: CollectionAfterOperationHook = async ({
  result,
  req,
  operation,
}) => {
  if (operation === 'delete' || operation === 'deleteByID') {
    const { payload } = req

    try {
      // Read total tickets and update contest
      const { totalDocs: ticketsPurchased } = await payload.find({
        collection: 'tickets',
        depth: 1,
        where: {
          'contest_id.value': {
            equals: result?.contest_id?.value?.id,
          },
        },
      })

      const { id, product_price, ticket_price } = result?.contest_id?.value

      const reachedThreshold = ticket_price * ticketsPurchased >= product_price
      const date =
        result?.contest_id?.value.threshold_reached_date ?? new Date()

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
      console.error('Error updating contest after delete:', error)
      throw new Error('Failed to update contest data after delete operation.')
    }
  }

  return result
}
