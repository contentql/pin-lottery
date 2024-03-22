import { CollectionAfterChangeHook } from 'payload/types'
import { randomTicketPicker } from '../../../utils/random-ticket-picker'

export const announceWinnerAfterUpdate: CollectionAfterChangeHook = async ({
  operation,
  previousDoc,
  doc,
  req,
}) => {
  if (operation === 'update') {
    if (!previousDoc?.contest_timer_status && doc?.contest_timer_status) {
      const { payload } = req

      const { id: contestId } = doc

      const { docs: contestTickets } = await payload.find({
        collection: 'tickets',
        depth: 0,
        where: {
          'contest_id.value': {
            equals: contestId,
          },
        },
      })

      const randomTicket = randomTicketPicker(contestTickets)

      if (!randomTicket) {
        console.log('No ticket found for the contest')
        return
      }

      const { id: ticketId } = randomTicket

      const winner = await payload.create({
        collection: 'winner',
        data: {
          ticket: { relationTo: 'tickets', value: ticketId },
          contest: { relationTo: 'contest', value: contestId },
        },
      })

      return {
        ...doc,
        contest_timer_status: true,
        contest_status: true,
        winner_ticket: { relationTo: 'winner', value: winner?.id },
      }
    }
  }
}
