'use client'

import { Dispatch, ReactNode, SetStateAction, createContext } from 'react'
import { toast } from 'react-toastify'
import { useLocalStorage } from 'usehooks-ts'

import { ticketsMetadata } from '@/utils/tickets-metadata'

export interface ContextTicket {
  id: number
  contest_no: string
  ticket_number: string
}

interface AppContextValue {
  tickets: ContextTicket[]
  setTickets: Dispatch<SetStateAction<ContextTicket[]>>
  totalTicketsCount: (args: { contest_no: string }) => number
  getTickets: (args: { contest_no: string }) => ContextTicket[]
  addTicket: (args: { contest_no: string }) => void
  addNewTickets: (args: { contest_no: string; numOfTickets: number }) => void
  addTicketsToExistingTickets: (args: {
    contest_no: string
    numTicketsToAdd: number
  }) => void
  removeTicket: (args: { contest_no: string }) => void
  removeAllTickets: (args: { contest_no: string }) => void
  removeAllTicketsWithToast: (args: { contest_no: string }) => void
}

const defaultContextValue: AppContextValue = {
  tickets: [],
  setTickets: () => {},
  totalTicketsCount: ({ contest_no }) => 0,
  getTickets: ({ contest_no }) => [],
  addTicket: ({ contest_no }) => {},
  addNewTickets: ({ contest_no, numOfTickets }) => {},
  addTicketsToExistingTickets: ({ contest_no, numTicketsToAdd }) => {},
  removeTicket: ({ contest_no }) => {},
  removeAllTickets: ({ contest_no }) => {},
  removeAllTicketsWithToast: ({ contest_no }) => {},
}

const AppContext = createContext<AppContextValue>(defaultContextValue)

const AppProvider = ({ children }: { children: ReactNode }) => {
  const minTickets = ticketsMetadata?.minTickets ?? 0
  const maxTickets = ticketsMetadata?.maxTickets ?? Infinity

  const [tickets, setTickets] = useLocalStorage<ContextTicket[]>('tickets', [])

  const getTickets = ({ contest_no }: { contest_no: string }) => {
    return tickets.filter(ticket => ticket.contest_no === contest_no)
  }

  const totalTicketsCount = ({ contest_no }: { contest_no: string }) => {
    return tickets.filter(ticket => ticket.contest_no === contest_no).length
  }

  const addTicket = ({ contest_no }: { contest_no: string }) => {
    const totalTickets = totalTicketsCount({ contest_no })

    if (totalTickets >= maxTickets) {
      toast.info(`Maximum ${maxTickets} tickets allowed.`, {
        toastId: 'max-tickets-toast',
      })
      return
    }

    setTickets(prev => [
      ...prev,
      {
        id: tickets.length + 1,
        contest_no,
        ticket_number: '',
      },
    ])
  }

  const addNewTickets = ({
    contest_no,
    numOfTickets,
  }: {
    contest_no: string
    numOfTickets: number
  }) => {
    const newTickets = Array.from({ length: numOfTickets }, (_, index) => ({
      id: index + 1,
      contest_no,
      ticket_number: '',
    }))

    setTickets(prev => [...prev, ...newTickets])
  }

  const addTicketsToExistingTickets = ({
    contest_no,
    numTicketsToAdd,
  }: {
    contest_no: string
    numTicketsToAdd: number
  }) => {
    const totalTickets = totalTicketsCount({ contest_no })

    if (totalTickets + numTicketsToAdd > maxTickets) {
      toast.info(`Maximum ${maxTickets} tickets allowed.`, {
        toastId: 'max-tickets-toast',
      })
      numTicketsToAdd = maxTickets - totalTickets
    }

    const newTickets = Array.from({ length: numTicketsToAdd }, (_, index) => ({
      id: totalTickets + index + 1,
      contest_no,
      ticket_number: '',
    }))

    setTickets(prevTickets => [...prevTickets, ...newTickets])
  }

  const removeTicket = ({ contest_no }: { contest_no: string }) => {
    const indexToRemove = tickets.findIndex(
      ticket => ticket.contest_no === contest_no,
    )

    if (indexToRemove !== -1) {
      const updatedTickets = [
        ...tickets.slice(0, indexToRemove),
        ...tickets.slice(indexToRemove + 1),
      ]
      setTickets(updatedTickets)
    }
  }

  const removeAllTickets = ({ contest_no }: { contest_no: string }) => {
    const data = tickets.filter(ticket => ticket.contest_no !== contest_no)
    setTickets(data)
  }

  const removeAllTicketsWithToast = ({
    contest_no,
  }: {
    contest_no: string
  }) => {
    toast.info(`Minimum of ${minTickets} tickets required.`, {
      toastId: 'min-tickets-toast',
    })

    const data = tickets.filter(ticket => ticket.contest_no !== contest_no)
    setTickets(data)
  }

  return (
    <AppContext.Provider
      value={{
        tickets,
        setTickets,
        totalTicketsCount,
        getTickets,
        addTicket,
        addNewTickets,
        addTicketsToExistingTickets,
        removeTicket,
        removeAllTickets,
        removeAllTicketsWithToast,
      }}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }
