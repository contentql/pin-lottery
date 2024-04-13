'use client'

import { useQuery } from '@tanstack/react-query'

import UserDetailsSkeleton from '@/components/skeletons/UserDetailsSkeleton'
import Info from '@/components/user-info/Info'
import { currentUser } from '@/queries/auth/currentUser'

const UserInfoView = () => {
  const { data: userData, isPending: isUserDataPending } = useQuery({
    queryKey: ['/api/users/me', 'get'],
    queryFn: async () => currentUser(),
    select: data => data.user,
  })

  return (
    <>
      {/* Personal details */}
      {isUserDataPending ? (
        <UserDetailsSkeleton />
      ) : (
        <Info userData={userData} />
      )}
    </>
  )
}

export default UserInfoView
