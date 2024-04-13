import { useAuth } from 'payload/components/utilities'
import React from 'react'

import InfoCard from './InfoCard'

const BeforeDashboard = () => {
  const { user } = useAuth()

  // @ts-ignore
  if (user.roles.includes('admin'))
    return (
      <div>
        <h2>Overview of Application</h2>
        <p style={{ color: 'darkorange' }}>
          This feature is still under process, more cards to come!
        </p>
        <InfoCard title='Total Tickets' />
      </div>
    )

  return null
}

export default BeforeDashboard
