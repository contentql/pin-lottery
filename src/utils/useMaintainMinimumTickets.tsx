import { AppContext } from '@/context/context'
import { useContext, useEffect } from 'react'

const useMaintainMinimumTickets = (contestNo: string | undefined) => {
  const { maintainMinimumTickets } = useContext(AppContext)

  useEffect(() => {
    if (contestNo) {
      maintainMinimumTickets({ contest_no: contestNo })
    }
  }, [contestNo, maintainMinimumTickets])
}

export default useMaintainMinimumTickets
