import { useContext, useEffect } from 'react'

import { AppContext } from '@/context/context'

const useMaintainMinimumTickets = (contestNo: string | undefined) => {
  const { maintainMinimumTickets } = useContext(AppContext)

  useEffect(() => {
    if (contestNo) {
      maintainMinimumTickets({ contest_no: contestNo })
    }
  }, [contestNo, maintainMinimumTickets])
}

export default useMaintainMinimumTickets
