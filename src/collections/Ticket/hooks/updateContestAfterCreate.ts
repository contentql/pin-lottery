import { CollectionAfterChangeHook } from 'payload/types'
import { Contest } from '../../../payload-types'

export const updateContestAfterCreate: CollectionAfterChangeHook = async ({
  operation,
  doc,
  req,
}) => {
  const { payload } = req

  if (operation === 'create') {
    try {
      const { totalDocs: ticketsPurchased, docs: relevantTickets } =
        await payload.find({
          collection: 'tickets',
          depth: 1,
          where: {
            'contest_id.value': {
              equals: doc?.contest_id.value.id || doc?.contest_id.value,
            },
          },
        })

      const purchasedTicket = relevantTickets.find(
        ticket => ticket.id === doc.id,
      )

      const { id, product_price, ticket_price } = purchasedTicket?.contest_id
        .value as Contest

      const reachedThreshold = ticket_price * ticketsPurchased >= product_price
      const date = doc?.contest_id.value.threshold_reached_date ?? new Date()

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
      } catch (updateError) {
        console.error(
          'Error updating contest after creating a ticket  after create:',
          updateError,
        )
        throw new Error(
          'Failed to update contest data after creating a ticket  after create.',
        )
      }
    } catch (error) {
      console.error('Error finding relevant tickets after create:', error)
      throw new Error(
        'Failed to find relevant tickets while updating contest data  after create.',
      )
    }
  }
}
