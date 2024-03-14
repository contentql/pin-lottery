'use client'

import { createContext, useState } from 'react'
import { toast } from 'react-toastify'

import { ticketsMetadata } from '@/utils/tickets-metadata'

const AppContext = createContext({})

/* @TODO: These is for lottery two data */

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  /* @TODO: These is for lottery two */
  const minTickets = ticketsMetadata?.minTickets
  const maxTickets = ticketsMetadata?.maxTickets

  const initialTickets = Array.from({ length: minTickets }, (_, index) => ({
    id: index + 1,
    numbers: [],
  }))

  const [tickets, setTickets] = useState([...initialTickets])
  const [quantity, setQuantity] = useState(minTickets)

  /* @TODO: These is for lottery two */
  const incrementHandleAndAddTicket = () => {
    const totalTickets = tickets.length

    if (quantity >= maxTickets && totalTickets >= maxTickets) {
      toast.info(`Maximum ${maxTickets} tickets allowed.`, {
        toastId: 'max-tickets-toast',
      })

      return
    }

    incrementHandle()
    addTicket()
  }

  const decrementHandleAndRemoveTicket = (id?: any) => {
    const totalTickets = tickets.length

    if (quantity <= minTickets && totalTickets <= minTickets) {
      toast.info(`Minimum of ${minTickets} tickets required.`, {
        toastId: 'min-tickets-toast',
      })

      return
    }

    decrementHandle()
    id
      ? removeTicket(id)
      : setTickets(prev => prev.slice(0, tickets.length - 1))
  }

  const incrementHandle = () => {
    if (quantity >= maxTickets) {
      toast.info(`Maximum ${maxTickets} tickets allowed.`, {
        toastId: 'max-tickets-toast',
      })
      return
    }

    setQuantity(prev => prev + 1)
  }

  const decrementHandle = () => {
    if (quantity <= minTickets) {
      toast.info(`Minimum of ${minTickets} tickets required.`, {
        toastId: 'min-tickets-toast',
      })
      return
    }

    setQuantity(prev => prev - 1)
  }

  const addTicket = () => {
    const totalTickets = tickets.length

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
        // numbers: Math.floor(1000000 + Math.random() * 9000000).toString(),
        numbers: [],
      },
    ])
  }

  const addTickets = (numTickets: number) => {
    setQuantity(numTickets)

    const newTickets = Array.from({ length: numTickets }, (_, index) => ({
      id: index + 1,
      numbers: [],
    }))

    setTickets(newTickets)
  }

  const mergeTickets = (numTicketsToAdd: number) => {
    const totalTickets = tickets.length

    if (totalTickets + numTicketsToAdd > maxTickets) {
      toast.info(`Maximum ${maxTickets} tickets allowed.`, {
        toastId: 'max-tickets-toast',
      })
      numTicketsToAdd = maxTickets - totalTickets
    }

    const newTickets = Array.from({ length: numTicketsToAdd }, (_, index) => ({
      id: totalTickets + index + 1,
      numbers: [],
    }))

    setQuantity(prev => prev + numTicketsToAdd)
    setTickets(prevTickets => [...prevTickets, ...newTickets])
  }

  const removeTicket = (id: any) => {
    const totalTickets = tickets.length

    if (totalTickets <= minTickets) {
      toast.info(`Minimum of ${minTickets} tickets required.`, {
        toastId: 'min-tickets-toast',
      })
      return
    }

    const data = tickets
      .filter(ticket => ticket.id !== id)
      .map((ticket, idx) => ({ ...ticket, id: idx + 1 }))
    setTickets(data)
  }

  const removeAllTickets = () => {
    toast.info(`Minimum of ${minTickets} tickets required.`, {
      toastId: 'min-tickets-toast',
    })

    setQuantity(1)
    setTickets(prev => prev.slice(0, 1))
  }

  const pickNumber = (e: any, id: any) => {
    const data = tickets.map(obj =>
      obj.id === id
        ? {
            ...obj,
            numbers: [...obj.numbers, e.target.innerText],
          }
        : obj,
    )

    setTickets(data as any)
  }

  const luckyNumber = (e: any, id: any) => {
    const data = tickets.map(obj =>
      obj.id === id
        ? {
            ...obj,
            numbers: [...obj.numbers, e.target.innerText],
          }
        : obj,
    )

    setTickets(data as any)
  }

  const checkActive = (id: any, ele: any, start: any, end: any) => {
    const findActiveItem = tickets.find(item => item.id === id)

    return findActiveItem?.numbers
      .slice(start, end)
      ?.some(element => element === ele.toString())
  }

  const addQuickPick = (id: any) => {
    let randomValue: any[] = []

    for (let i = 0; i < 5; i++) {
      const random = (Math.floor(Math.random() * (50 - 1)) + 1).toString()
      randomValue = [...randomValue, random]
    }

    const data = tickets.map(obj =>
      obj.id === id
        ? {
            ...obj,
            numbers: randomValue,
          }
        : obj,
    )

    setTickets(data as any)
  }

  const clearNumbers = (id: any) => {
    const data = tickets.map(obj =>
      obj.id === id
        ? {
            ...obj,
            numbers: [],
          }
        : obj,
    )

    setTickets(data)
  }

  const clearAllNumbers = () => {
    const data = tickets.map(obj => ({
      ...obj,
      numbers: [],
    }))

    setTickets(data)
  }

  return (
    <AppContext.Provider
      value={{
        /* lottery two */
        incrementHandleAndAddTicket,
        decrementHandleAndRemoveTicket,
        incrementHandle,
        decrementHandle,
        addTicket,
        addTickets,
        mergeTickets,
        removeTicket,
        removeAllTickets,
        pickNumber,
        luckyNumber,
        checkActive,
        setTickets,
        addQuickPick,
        clearNumbers,
        clearAllNumbers,
        setQuantity,
        quantity,
        tickets,
      }}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }
