'use client'

import { createContext, useState } from 'react'

const AppContext = createContext({})

/* @TODO: These is for lottery two data */
const ticketsData = [
  {
    id: 1,
    numbers: [],
  },
]

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  /* @TODO: These is for lottery two */
  const [tickets, setTickets] = useState([...ticketsData])
  const [quantity, setQuantity] = useState(1)

  /* @TODO: These is for lottery two */
  const incrementHandleAndAddTicket = () => {
    incrementHandle()
    addTicket()
  }

  const decrementHandleAndRemoveTicket = (id?: any) => {
    decrementHandle()

    id ? removeTicket(id) : setTickets(tickets.slice(0, tickets.length - 1))
  }

  const incrementHandle = () => {
    if (quantity >= 16) {
      setQuantity(16)
    } else {
      setQuantity(prev => prev + 1)
    }
  }

  const decrementHandle = () => {
    if (quantity <= 1) {
      setQuantity(1)
    } else {
      setQuantity(prev => prev - 1)
    }
  }

  const addTicket = () => {
    setTickets(prev => [
      ...prev,
      {
        id: tickets.length + 1,
        // numbers: Math.floor(1000000 + Math.random() * 9000000).toString(),
        numbers: [],
      },
    ])
  }

  const removeTicket = (id: any) => {
    const data = tickets
      .filter(ticket => ticket.id !== id)
      .map((ticket, idx) => ({ ...ticket, id: idx + 1 }))
    setTickets(data)
  }

  const addTickets = (numTickets: number) => {
    setQuantity(numTickets)

    const newTickets = Array.from({ length: numTickets }, (_, index) => ({
      id: index + 1,
      numbers: [],
    }))

    setTickets(newTickets)
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

  const clearTicket = (id: any) => {
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

  const clearAllTickets = () => {
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
        removeTicket,
        addTickets,
        pickNumber,
        luckyNumber,
        checkActive,
        setTickets,
        addQuickPick,
        clearTicket,
        clearAllTickets,
        setQuantity,
        quantity,
        tickets,
      }}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }
