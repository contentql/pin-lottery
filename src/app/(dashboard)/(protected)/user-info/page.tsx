import { Metadata } from 'next'

import UserInfoView from '@/views/UserInfoView'

export const metadata: Metadata = {
  title: 'User Info',
  description: 'This is a user info page',
}

const UserInfo = async () => {
  return <UserInfoView />
}

export default UserInfo
