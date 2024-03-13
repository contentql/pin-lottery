'use client'

import { createContext, useState } from 'react'

const AppContext = createContext({})

/* @TODO: These is for lottery two data */
const lotteryData = [
  {
    id: 1,
    ticket: [],
  },
]

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  /* @TODO: These is for lottery two */
  const [lotteris, setLotteris] = useState([...lotteryData])
  const [quantity, setQuantity] = useState(1)

  /* @TODO: These is for lottery two */
  const addTickets = () => {
    setLotteris(prev => [
      ...prev,
      {
        id: lotteris.length + 1,
        // ticket: Math.floor(1000000 + Math.random() * 9000000).toString(),
        ticket: [],
      },
    ])
  }

  const removeTicket = (id: any) => {
    const data = lotteris.filter(item => item.id !== id)
    setLotteris(data)
  }

  const pickNumbr = (e: any, id: any) => {
    const data = lotteris.map(obj =>
      obj.id === id
        ? {
            ...obj,
            ticket: [...obj.ticket, e.target.innerText],
          }
        : obj,
    )

    setLotteris(data as any)
  }

  const luckyNumbr = (e: any, id: any) => {
    const data = lotteris.map(obj =>
      obj.id === id
        ? {
            ...obj,
            ticket: [...obj.ticket, e.target.innerText],
          }
        : obj,
    )

    setLotteris(data as any)
  }

  const checkActive = (id: any, ele: any, start: any, end: any) => {
    const findActiveItem = lotteris.find(item => item.id === id)

    return findActiveItem?.ticket
      .slice(start, end)
      ?.some(element => element === ele.toString())
  }

  const addQuickPick = (id: any) => {
    let randomValue: any[] = []

    for (let i = 0; i < 5; i++) {
      const random = (Math.floor(Math.random() * (50 - 1)) + 1).toString()
      randomValue = [...randomValue, random]
    }

    const data = lotteris.map(obj =>
      obj.id === id
        ? {
            ...obj,
            ticket: randomValue,
          }
        : obj,
    )

    setLotteris(data as any)
  }

  const clearTicket = (id: any) => {
    const data = lotteris.map(obj =>
      obj.id === id
        ? {
            ...obj,
            ticket: [],
          }
        : obj,
    )

    setLotteris(data)
  }

  const clearAllTicket = () => {
    const data = lotteris.map(obj => ({
      ...obj,
      ticket: [],
    }))

    setLotteris(data)
  }

  const incrementHandle = () => {
    addTickets()

    if (quantity >= 16) {
      setQuantity(16)
    } else {
      setQuantity(prev => prev + 1)
    }
  }

  const decrementHandle = () => {
    const removeItem = lotteris.slice(0, lotteris.length - 1)
    setLotteris(removeItem)

    if (quantity <= 0) {
      setQuantity(0)
    } else {
      setQuantity(prev => prev - 1)
    }
  }

  return (
    <AppContext.Provider
      value={{
        /* lottery two */
        incrementHandle,
        decrementHandle,
        addTickets,
        removeTicket,
        pickNumbr,
        luckyNumbr,
        checkActive,
        setLotteris,
        addQuickPick,
        clearTicket,
        clearAllTicket,
        setQuantity,
        quantity,
        lotteris,
      }}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }
