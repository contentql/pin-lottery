'use client'
import React, { useState, useEffect } from 'react'

const InfoCard = ({ title }: any) => {
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
    <div className='info-card info-card--has-onclick'>
      <p className='info-card__title'>
        {title}: {totalDocs}
      </p>
    </div>
  )
}

export default InfoCard
