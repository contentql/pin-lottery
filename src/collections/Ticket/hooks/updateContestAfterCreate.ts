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
    const { totalDocs: tickets_purchased } = await payload.find({
      collection: 'tickets',
      depth: 1,
      where: {
        'contest_id.value': {
          equals: doc?.contest_id.value.id,
        },
      },
    })
    const { id, product_price, ticket_price } = doc?.contest_id.value

    const reached_threshold = ticket_price * tickets_purchased >= product_price
    const date = doc?.contest_id.value.threshold_reached_date ?? new Date()

    const latestData = {
      tickets_purchased,
      reached_threshold,
      threshold_reached_date: reached_threshold ? date.toString() : undefined,
    }

    try {
      await payload.update({
        collection: 'contest',
        id,
        data: latestData,
      })
    } catch (error) {
      console.log('Updating Contest: ', error)
    }
  }
}
