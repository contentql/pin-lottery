import { useContext } from 'react'

import { AppContext } from '@/context/context'
import { Contest } from '@/payload-types'
import { ticketsMetadata } from '@/utils/tickets-metadata'

const QuickPick = ({ contestDetails }: { contestDetails: Contest }) => {
  const { addNewTickets } = useContext(AppContext)

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
              onClick={() =>
                addNewTickets({
                  contest_no: contestDetails?.contest_no,
                  numOfTickets: quickPick?.tickets,
                })
              }
            >
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
