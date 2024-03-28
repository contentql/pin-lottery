'use client'
import React, { useState, useEffect } from 'react'

const TestCard = ({ title }: any) => {
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
    <div className='testcard testcard--has-onclick'>
      <p className='testcard__title'>
        {title}: {totalDocs}
      </p>
    </div>
  )
}

export default TestCard
