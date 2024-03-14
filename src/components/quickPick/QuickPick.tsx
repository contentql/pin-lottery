import { AppContext } from '@/context/context'
import { ticketsMetadata } from '@/utils/tickets-metadata'
import { useContext } from 'react'

const QuickPick = () => {
  const { addTickets }: any = useContext(AppContext)

  const currency = ticketsMetadata?.currency
  const quickPicks = ticketsMetadata?.quickPicks

  return (
    <div className='col-lg-12 pt-120'>
      <div className='pick-lottery-package'>
        <h2 className='title'>Choose a Quick Pick</h2>
        <div className='lottery-package-list'>
          {quickPicks?.map(quickPick => (
            <a
              key={quickPick?.id}
              href='#0'
              onClick={() => addTickets(quickPick.tickets)}>
              {quickPick?.tickets} Quick Picks For {currency}
              {quickPick?.price}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default QuickPick
