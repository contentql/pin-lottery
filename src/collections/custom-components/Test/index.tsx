import React from 'react'
import TestCard from './TestCard'
import { useAuth } from 'payload/components/utilities'

const Test = () => {
  const { user } = useAuth()

  // @ts-ignore
  if (user.roles.includes('admin'))
    return (
      <div>
        <h2>Overview of Application</h2>
        <TestCard title='Total Tickets' />
      </div>
    )

  return null
}

export default Test
