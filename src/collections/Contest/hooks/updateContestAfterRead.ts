import { CollectionBeforeReadHook } from 'payload/types'

export const updateContestAfterRead: CollectionBeforeReadHook = async ({
  req,
  doc,
  context,
}) => {
  const { payload } = req

  const { totalDocs: tickets_purchased } = await payload.find({
    collection: 'tickets',
    depth: 0,
    where: {
      'contest_id.value': {
        equals: doc.id,
      },
    },
  })

  if (!context?.updateDoc && doc.tickets_purchased !== tickets_purchased) {
    const { ticket_price, product_price } = doc
    const reachedThreshold = ticket_price * tickets_purchased >= product_price

    const latestData = {
      ...doc,
      tickets_purchased,
      reached_threshold: reachedThreshold,
    }

    await payload.update({
      collection: 'contest',
      id: doc.id,
      data: latestData,
      context: {
        updateDoc: true,
      },
    })

    return latestData
  } else {
    return doc
  }
}
