import { useEffect, useMemo, useState } from 'react'

import { User } from '@/payload-types'

interface CheckUserDataFieldsResult {
  totalUserFields: number
  completedUserFields: number
  isProfileCompleted: boolean
}

const ProfileCompletionStatus = (
  checkFields: (keyof User)[],
  userData: User | undefined | null,
): CheckUserDataFieldsResult => {
  const memoizedCheckFields = useMemo(() => checkFields, [checkFields])
  const [completedUserFields, setCompletedUserFields] = useState<number>(0)
  const [isProfileCompleted, setIsProfileCompleted] = useState<boolean>(false)

  useEffect(() => {
    if (!userData) {
      setCompletedUserFields(0)
      setIsProfileCompleted(false)
      return
    }

    const completedCount = memoizedCheckFields.filter(field => {
      if (userData[field] === undefined || userData[field] === null)
        return false

      switch (typeof userData[field]) {
        case 'string':
          return String(userData[field])?.trim() !== ''
        case 'object':
          return Object.keys(userData[field]!).length > 0
        case 'number':
          return true
        case 'boolean':
          return true
        default:
          return true
      }
    }).length

    setCompletedUserFields(completedCount)
    setIsProfileCompleted(completedCount === memoizedCheckFields.length)
  }, [memoizedCheckFields, userData])

  return {
    totalUserFields: memoizedCheckFields.length,
    completedUserFields,
    isProfileCompleted,
  }
}

export default ProfileCompletionStatus
