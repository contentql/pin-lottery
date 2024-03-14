'use client'
import { useState } from 'react'
const Tabs = ({ tabs }:{tabs:any}) => {
  const [activeTab, setActiveTab] = useState(0)

  const handleClick = (index:any) => {
    setActiveTab(index)
  }

  return (
    <div className='tabs-container-custom'>
      <div className='tabs-custom'>
        {tabs.map((tab: any, index: any) => (
          <div
            key={index}
            className={`tab-custom ${index === activeTab ? 'active' : ''}`}
            onClick={() => handleClick(index)}>
            {tab.title}
          </div>
        ))}
      </div>
      <div className='tab-content-custom'>{tabs[activeTab].content}</div>
    </div>
  )
}

export default Tabs
