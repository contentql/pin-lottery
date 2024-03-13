import { AppContext } from '@/context/context'
import { useContext } from 'react'

const QuickPick = () => {
  const { addTickets }: any = useContext(AppContext)

  return (
    <div className='col-lg-12 pt-120'>
      <div className='pick-lottery-package'>
        <h2 className='title'>Choose a Quick Pick</h2>
        <div className='lottery-package-list'>
          <a href='#0' onClick={() => addTickets(3)}>
            3 Quick Picks For $14.97
          </a>
          <a href='#0' onClick={() => addTickets(5)}>
            5 Quick Picks For $24.95
          </a>
          <a href='#0' onClick={() => addTickets(10)}>
            10 Quick Picks For $49.90
          </a>
          <a href='#0' onClick={() => addTickets(20)}>
            20 Quick Picks For $99.80
          </a>
        </div>
      </div>
    </div>
  )
}

export default QuickPick
