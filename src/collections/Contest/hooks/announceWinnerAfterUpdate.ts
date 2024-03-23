import { CollectionAfterChangeHook } from 'payload/types'
import { randomTicketPicker } from '../../../utils/random-ticket-picker'

export const announceWinnerAfterUpdate: CollectionAfterChangeHook = async ({
  operation,
  previousDoc,
  doc,
  req,
}) => {
  if (operation === 'update') {
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

        const { docs: contestTickets } = await payload.find({
          collection: 'tickets',
          depth: 0,
          where: {
            'contest_id.value': {
              equals: contestId,
            },
          },
        })

        if (!contestTickets || !contestTickets.length) {
          console.log('No tickets found for the contest')
          return
        }

        const randomTicket = randomTicketPicker(contestTickets)

        if (!randomTicket) {
          console.log('No ticket found for the contest')
          return
        }

        const { id: ticketId } = randomTicket

        try {
          const winner = await payload.create({
            collection: 'winner',
            data: {
              ticket: { relationTo: 'tickets', value: ticketId },
              contest: { relationTo: 'contest', value: contestId },
            },
          })

          const latestData = {
            contest_timer_status: true,
            contest_status: true,
            winner_ticket: {
              relationTo: 'winner' as 'winner',
              value: winner?.id.toString(),
            },
          }

          try {
            await payload.update({
              collection: 'contest',
              id: contestId,
              data: { ...latestData },
            })
          } catch (error) {
            console.error('Error updating contest:', error)
            throw new Error('Failed to update contest data.')
          }
        } catch (error) {
          console.error('Error creating winner:', error)
          throw new Error('Failed to create winner entry.')
        }
      } catch (error) {
        console.error('Error fetching contest tickets:', error)
        throw new Error('Failed to fetch contest tickets.')
      }
    }
  }
}
