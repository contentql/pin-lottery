import { CollectionAfterOperationHook } from 'payload/types'

export const updateContestAfterDelete: CollectionAfterOperationHook = async ({
  result,
  req,
  operation,
  args,
}) => {
  if (operation === 'delete' || operation === 'deleteByID') {
    const { payload } = req

    try {
      await Promise.all(
        result?.docs?.map(async (doc: any) => {
          const { totalDocs: ticketsPurchased } = await payload.find({
            collection: 'tickets',
            depth: 1,
            where: {
              'contest_id.value': {
                equals: doc?.contest_id.value.id,
              },
            },
          })

          const { id, product_price, ticket_price } = doc.contest_id.value

          const reachedThreshold =
            ticket_price * ticketsPurchased >= product_price
          const date = doc.contest_id.value.threshold_reached_date ?? new Date()

          const latestData = {
            tickets_purchased: ticketsPurchased,
            reached_threshold: reachedThreshold,
            threshold_reached_date: reachedThreshold
              ? date.toString()
              : undefined,
          }

          return payload.update({
            collection: 'contest',
            id,
            data: latestData,
          })
        }),
      )
    } catch (error) {
      console.error('Error updating contest after delete:', error)
      throw new Error('Failed to update contest data after delete operation.')
    }
  }

  return result
}
