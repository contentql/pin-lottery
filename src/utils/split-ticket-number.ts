import { Ticket } from '@/payload-types'

export const splitTicketNumber = (
  ticketNumber: Ticket['ticket_number'],
): string[] => {
  if (!ticketNumber) return []

  if (ticketNumber.length <= 2) {
    return [ticketNumber]
  }

  return [ticketNumber.slice(0, 2), ...splitTicketNumber(ticketNumber.slice(2))]
}
