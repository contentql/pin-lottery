'use client'

import { createContext, useState } from 'react'

const AppContext = createContext({})

/* @TODO: These is for lottery one data */
const lotteryData = [
  {
    id: 1,
    ticket: [],
  },
  {
    id: 2,
    ticket: [],
  },
  {
    id: 3,
    ticket: [],
  },
]

/* @TODO: These is for lottery two data */
const lotteryDataTwo = [
  {
    id: 1,
    ticket: [],
  },
  {
    id: 2,
    ticket: [],
  },
]

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  /* @TODO: These is for lottery one */
  const [lotteris, setLotteris] = useState(lotteryData)
  const [quantity, setQuantity] = useState(3)

  /* @TODO: These is for lottery two */
  const [lotterisTwo, setLotterisTwo] = useState(lotteryDataTwo)
  const [quantityTwo, setQuantityTwo] = useState(2)

  /* @TODO: These is for lottery one */
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

  /* @TODO: These is for lottery two */
  const addTicketsTwo = () => {
    setLotterisTwo(prev => [
      ...prev,
      {
        id: lotterisTwo.length + 1,
        // ticket: Math.floor(1000000 + Math.random() * 9000000).toString(),
        ticket: [],
      },
    ])
  }

  const removeTicketTwo = (id: any) => {
    const data = lotterisTwo.filter(item => item.id !== id)
    setLotterisTwo(data)
  }

  const pickNumbrTwo = (e: any, id: any) => {
    const data = lotterisTwo.map(obj =>
      obj.id === id
        ? {
            ...obj,
            ticket: [...obj.ticket, e.target.innerText],
          }
        : obj,
    )

    setLotterisTwo(data as any)
  }

  const luckyNumbrTwo = (e: any, id: any) => {
    const data = lotterisTwo.map(obj =>
      obj.id === id
        ? {
            ...obj,
            ticket: [...obj.ticket, e.target.innerText],
          }
        : obj,
    )

    setLotterisTwo(data as any)
  }

  const checkActiveTwo = (id: any, ele: any, start: any, end: any) => {
    const findActiveItem = lotterisTwo.find(item => item.id === id)

    return findActiveItem?.ticket
      .slice(start, end)
      ?.some(element => element === ele.toString())
  }

  const addQuickPickTwo = (id: any) => {
    let randomValue: any[] = []

    for (let i = 0; i < 5; i++) {
      const random = (Math.floor(Math.random() * (50 - 1)) + 1).toString()
      randomValue = [...randomValue, random]
    }

    const data = lotterisTwo.map(obj =>
      obj.id === id
        ? {
            ...obj,
            ticket: randomValue,
          }
        : obj,
    )

    setLotterisTwo(data as any)
  }

  const clearTicketTwo = (id: any) => {
    const data = lotterisTwo.map(obj =>
      obj.id === id
        ? {
            ...obj,
            ticket: [],
          }
        : obj,
    )

    setLotterisTwo(data)
  }

  const clearAllTicketTwo = () => {
    const data = lotterisTwo.map(obj => ({
      ...obj,
      ticket: [],
    }))

    setLotterisTwo(data)
  }

  const incrementHandleTwo = () => {
    addTicketsTwo()

    if (quantityTwo >= 16) {
      setQuantityTwo(16)
    } else {
      setQuantityTwo(prev => prev + 1)
    }
  }

  const decrementHandleTwo = () => {
    const removeItem = lotterisTwo.slice(0, lotterisTwo.length - 1)
    setLotterisTwo(removeItem)

    if (quantityTwo <= 0) {
      setQuantityTwo(0)
    } else {
      setQuantityTwo(prev => prev - 1)
    }
  }

  return (
    <AppContext.Provider
      value={{
        incrementHandle,
        decrementHandle,
        addTickets,
        removeTicket,
        pickNumbr,
        luckyNumbr,
        checkActive,
        setLotteris,
        lotteris,
        quantity,

        /* lottery two */
        incrementHandleTwo,
        decrementHandleTwo,
        addTicketsTwo,
        removeTicketTwo,
        pickNumbrTwo,
        luckyNumbrTwo,
        checkActiveTwo,
        setLotterisTwo,
        addQuickPickTwo,
        clearTicketTwo,
        clearAllTicketTwo,
        setQuantityTwo,
        quantityTwo,
        lotterisTwo,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }
