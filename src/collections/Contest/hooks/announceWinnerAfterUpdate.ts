import { randomTicketPicker } from '../../../utils/random-ticket-picker'
import { CollectionAfterChangeHook } from 'payload/types'

export const announceWinnerAfterUpdate: CollectionAfterChangeHook = async ({
  operation,
  previousDoc,
  doc,
  req,
}) => {
  // Check if the operation is an update
  if (operation === 'update') {
    // Check if the threshold is reached,
    // contest timer is started,
    // contest status is not set,
    // and there's no winner ticket
    if (
      doc?.reached_threshold &&
      !!doc?.threshold_reached_date &&
      !previousDoc?.contest_timer_status &&
      doc?.contest_timer_status &&
      !doc?.contest_status &&
      !doc?.winner_ticket
    ) {
      try {
        const { payload } = req

        const { id: contestId } = doc

        // Fetch all tickets related to the contest
        const { docs: contestTickets } = await payload.find({
          req,
          collection: 'tickets',
          depth: 0,
          where: {
            'contest_id.value': {
              equals: contestId,
            },
          },
        })

        // If no tickets are found, throw error
        if (!contestTickets || !contestTickets.length) {
          throw new Error('No tickets found for the contest')
        }

        // Pick a random ticket
        const randomTicket = randomTicketPicker(contestTickets)

        // If no ticket is found, throw error
        if (!randomTicket) {
          throw new Error('No ticket found for the contest')
        }

        const { id: ticketId } = randomTicket

        // Create a winner entry
        const winner = await payload.create({
          req,
          collection: 'winner',
          data: {
            ticket: { relationTo: 'tickets', value: ticketId },
            contest: { relationTo: 'contest', value: contestId },
          },
        })

        // Prepare the latest contest data including winner info
        const latestData = {
          contest_timer_status: true,
          contest_status: true,
          winner_ticket: {
            relationTo: 'winner' as 'winner',
            value: winner?.id.toString(),
          },
        }

        // Update the contest data with the latest information
        await payload.update({
          req,
          collection: 'contest',
          id: contestId,
          data: { ...latestData },
        })
      } catch (error) {
        console.error('Error in announceWinnerAfterUpdate:', error)
      }
    }
  }
}
