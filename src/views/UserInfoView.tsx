'use client'

import LeftSideMenu from '@/components/common/LeftSideMenu'
import UserDetailsSkeleton from '@/components/skeletons/UserDetailsSkeleton'
import Info from '@/components/user-info/Info'
import { currentUser } from '@/queries/auth/currentUser'
import { useQuery } from '@tanstack/react-query'

const UserInfoView = () => {
  const { data: userData, isPending: isUserDataPending } = useQuery({
    queryKey: ['/api/users/me', 'get'],
    queryFn: async () => currentUser(),
    select: data => data.user,
  })

  return (
    <>
      <div className='inner-hero-section style--five'></div>

      <div className='mt-minus-150 pb-120'>
        <div className='container'>
          <div className='row'>
            {/* TODO: suer info */}
            <LeftSideMenu />

            {/* Personal details */}
            {isUserDataPending ? (
              <UserDetailsSkeleton />
            ) : (
              <Info userData={userData} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default UserInfoView
