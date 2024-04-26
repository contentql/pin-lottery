import RemainingWalletAmount from '../RemainingWalletAmount'
import TotalTicketsPurchased from '../TotalTicketsPurchased'
import Transactions from '../Transactions'
import { useAuth } from 'payload/components/utilities'
import React from 'react'

const BeforeDashboard = () => {
  const test = React.useState()
  const { user } = useAuth()

  // @ts-ignore
  if (user.roles.includes('admin'))
    return (
      <div>
        <h2>Overview of Application</h2>
        <p style={{ color: 'darkorange' }}>
          This feature is still under process, more cards to come!
        </p>
        <div className='dashboard__group'>
          <h2 className='dashboard__label'>Custom Components</h2>
          <ul className='dashboard__card-list'>
            <TotalTicketsPurchased />
            <Transactions />
            <RemainingWalletAmount />
          </ul>
        </div>
      </div>
    )

  return null
}

export default BeforeDashboard
