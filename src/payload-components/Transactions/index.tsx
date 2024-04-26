'use client'

import React, { useEffect, useState } from 'react'

const Transactions = ({ title }: any) => {
  const infoCard = React.useState()
  const [ticketsAmount, setTicketsAmount] = useState(0)
  const [depositedAmount, setDepositedAmount] = useState(0)
  const [withDraw, setWithDraw] = useState(0)

  useEffect(() => {
    const fetchTotalDocs = async () => {
      try {
        const response = await fetch('/api/transaction?limit=100')
        const docs = await response.json()

        docs?.docs?.map((doc: any) => {
          if (doc.type_of_transaction === 'tickets_purchased') {
            setTicketsAmount(prev => prev + doc.amount)
          }
          if (doc.type_of_transaction === 'deposit') {
            setDepositedAmount(prev => prev + doc.amount)
          }
          if (doc.type_of_transaction === 'withdraw') {
            setWithDraw(prev => prev + doc.amount)
          }
        })
      } catch (error) {
        console.log(error)
      }
    }

    fetchTotalDocs()
  }, [])

  return (
    <>
      <li>
        <div className='card card-users card--has-onclick'>
          <p className='card__title'>Total Deposited Amount</p>
          <div className='card__actions'>
            <p className='card__title'>{depositedAmount}</p>
          </div>
        </div>
      </li>
      <li>
        <div className='card card-users card--has-onclick'>
          <p className='card__title'>Tickets purchased Amount</p>
          <div className='card__actions'>
            <p className='card__title'>{ticketsAmount}</p>
          </div>
        </div>
      </li>
      <li>
        <div className='card card-users card--has-onclick'>
          <p className='card__title'>Withdraw Amount</p>
          <div className='card__actions'>
            <p className='card__title'>{withDraw}</p>
          </div>
        </div>
      </li>
    </>
  )
}

export default Transactions
