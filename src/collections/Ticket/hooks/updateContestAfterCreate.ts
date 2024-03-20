import { CollectionAfterChangeHook } from 'payload/types'
import { Contest } from '../../../payload-types'

export const updateContestAfterCreate: CollectionAfterChangeHook = async ({
  operation,
  doc,
  req,
}) => {
  const { payload } = req
  // read total tickets and updated in contest
  // check threshold and update it

  if (operation === 'create') {
    const { totalDocs: tickets_purchased, docs: tickets } = await payload.find({
      collection: 'tickets',
      depth: 1,
      where: {
        'contest_id.value': {
          equals: req.body.contest_id.value,
        },
      },
    })

    const ticket = tickets.find(ticket => ticket.id == doc.id)

    const product_price = (ticket?.contest_id?.value as Contest)?.product_price

    const {
      contest_id: { value: id },
      ticket_price,
    } = doc

    const reached_threshold = ticket_price * tickets_purchased >= product_price

    const latestData = {
      ...doc,
      tickets_purchased,
      reached_threshold,
    }

    await payload.update({
      collection: 'contest',
      id,
      data: latestData,
    })
  }
}
