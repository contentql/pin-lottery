import { useState } from 'react'

const SingleFaq = ({ singleFaq }: { singleFaq: any }) => {
  const { id, question, answer } = singleFaq

  const [isCollapsed, setIsCollapsed] = useState(true)

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div className='card'>
      <div className='card-header' id={`heading${id}`}>
        <button
          className='btn btn-link btn-block text-left'
          type='button'
          onClick={handleToggleCollapse}
          aria-expanded={!isCollapsed}
          aria-controls={`collapse${id}`}>
          {question}
        </button>
      </div>
      <div
        id={`collapse${id}`}
        className={`collapse ${isCollapsed ? '' : 'show'}`}
        aria-labelledby={`heading${id}`}
        data-bs-parent='#accordionExample'>
        <div className='card-body'>
          <p>{answer}</p>
        </div>
      </div>
    </div>
  )
}

export default SingleFaq
