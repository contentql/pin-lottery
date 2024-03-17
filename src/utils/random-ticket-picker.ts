import { toast } from 'react-toastify';

export const RandomTicketPicker = (tickets: any) => {
    if (tickets.length <= 0) {
        toast.error(`No tickets available for `)
    }
    const randomIndex = Math.floor(Math.random() * tickets?.length)
    const randomNumber = tickets[randomIndex]
    return randomNumber;
}