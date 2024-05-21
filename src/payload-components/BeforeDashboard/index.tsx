import { useAuth } from 'payload/components/utilities'
import React from 'react'
import RemainingWalletAmount from '../RemainingWalletAmount'
import TotalTicketsPurchased from '../TotalTicketsPurchased'
import Transactions from '../Transactions'

const BeforeDashboard = () => {
  const test = React.useState()
  const { user } = useAuth()

  // @ts-ignore
  if (user.roles.includes('admin'))
    return (
      <div>
        <h2>Overview of Application</h2>
        <div className='dashboard__group'>
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
