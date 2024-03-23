import { Ticket } from '../payload-types'

export const randomTicketPicker = (tickets: Ticket[]): Ticket | undefined => {
  if (!tickets || tickets.length <= 0) {
    return undefined
  }

  const randomIndex: number = Math.floor(Math.random() * tickets.length)
  const randomTicket: Ticket = tickets[randomIndex]

  return randomTicket
}
