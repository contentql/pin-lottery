'use client'

import TicketsSkeleton from '../skeletons/TicketsSkeleton'
import { useState } from 'react'

const TicketTabs = ({
  tabs,
  isTicketsPending,
}: {
  tabs: any
  isTicketsPending: boolean
}) => {
  const [activeTab, setActiveTab] = useState(0)

  const handleClick = (index: any) => {
    setActiveTab(index)
  }

  return (
    <div className='tabs-container-custom'>
      <div className='tabs-custom-tickets'>
        {tabs.map((tab: any, index: any) => (
          <div
            key={index}
            className={`button-wrapper ${index === activeTab ? 'active' : ''}`}
            onClick={() => handleClick(index)}
          >
            {tab.title}
          </div>
        ))}
      </div>
      {isTicketsPending ? (
        <TicketsSkeleton />
      ) : (
        <div className='tab-content-custom-tickets'>
          {tabs[activeTab].content}
        </div>
      )}
    </div>
  )
}

export default TicketTabs
