import { Metadata } from 'next'

import UserView from '@/views/UserView'

export const metadata: Metadata = {
  title: 'User',
  description: 'This is a user page',
}

const User = async () => {
  return <UserView />
}

export default User
