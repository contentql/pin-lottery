'use client'

import React, { useEffect, useState } from 'react'

const TotalTicketsPurchased = ({ title }: any) => {
  const test = React.useState()
  const [totalDocs, setTotalDocs] = useState(0)

  useEffect(() => {
    const fetchTotalDocs = async () => {
      try {
        const response = await fetch('/api/tickets')
        const { totalDocs } = await response.json()

        setTotalDocs(totalDocs)
      } catch (error) {
        console.log(error)
      }
    }

    fetchTotalDocs()
  }, [])

  return (
    <li>
      <div className='card card-users card--has-onclick'>
        <p className='card__title'>Tickets Purchased</p>
        <div className='card__actions'>
          <p className='card__title'>{totalDocs}</p>
        </div>
      </div>
    </li>
  )
}

export default TotalTicketsPurchased
