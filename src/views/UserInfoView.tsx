'use client'

import LeftSideMenu from '@/components/common/LeftSideMenu'
import Info from '@/components/user-info/Info'
import { currentUser } from '@/queries/auth/currentUser'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export interface ProgressData {
  id: number
  title: string
  editModeName: string
  completed: boolean
}

export interface IsEditMode {
  personalDetails: boolean
  email: boolean
  password: boolean
}

const UserInfoView = () => {
  const [progressData, setProgressData] = useState<ProgressData[]>([
    {
      id: 1,
      title: 'Personal Details',
      editModeName: 'personalDetails',
      completed: false,
    },
  ])

  const [isEditMode, setIsEditMode] = useState<IsEditMode>({
    personalDetails: false,
    email: false,
    password: false,
  })

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
            <LeftSideMenu
              progressData={progressData}
              setIsEditMode={setIsEditMode}
            />

            {/* Personal details */}
            <Info
              userData={userData}
              isEditMode={isEditMode}
              setIsEditMode={setIsEditMode}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default UserInfoView
