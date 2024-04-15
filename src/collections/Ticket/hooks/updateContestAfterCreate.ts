import { Contest } from '../../../payload-types'
import { CollectionAfterChangeHook } from 'payload/types'

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

      const {
        id: contestId,
        product_price,
        ticket_price,
        show_in_hero,
        threshold_reached_date,
      } = (purchasedTicket?.contest_id.value as Contest) ?? {}

      if (!contestId) {
        throw new Error('Contest ID not found for the ticket')
      }

      const reachedThreshold = ticket_price * ticketsPurchased >= product_price
      const date = threshold_reached_date ?? new Date()

      const latestData = {
        tickets_purchased: ticketsPurchased,
        reached_threshold: reachedThreshold,
        threshold_reached_date: reachedThreshold ? date.toString() : undefined,
        show_in_hero: reachedThreshold ? true : show_in_hero,
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
}
