'use client'

import React, { useState, useEffect } from 'react'
import payload from 'payload'

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
    <div
      style={{
        backgroundColor: 'lightblue',
        color: 'black',
        width: '200px',
        height: '150px',
        borderRadius: '8px',
        padding: '10px',
      }}>
      <p>
        {title}: {totalDocs}
      </p>
    </div>
  )
}

export default TestCard
