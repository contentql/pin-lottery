'use client'

import React, { useEffect, useState } from 'react'

const RemainingWalletAmount = ({ title }: any) => {
  const infoCard = React.useState()
  const [walletAmount, setWalletAmount] = useState(0)

  useEffect(() => {
    const fetchTotalDocs = async () => {
      try {
        const response = await fetch('/api/users?limit=1000')
        const docs = await response.json()
        docs?.docs?.map((user: any) => {
          setWalletAmount(prev => prev + Number(user.amount))
        })
      } catch (error) {
        console.log(error)
      }
    }

    fetchTotalDocs()
  }, [])

  return (
    <li>
      <div className='card card-users card--has-onclick'>
        <p className='card__title'>Remaining Wallet Amount</p>
        <div className='card__actions'>
          <p className='card__title'>{walletAmount}</p>
        </div>
      </div>
    </li>
  )
}

export default RemainingWalletAmount
