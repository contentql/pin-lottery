import { Metadata } from 'next'

import UserTransactionView from '@/views/UserTransactionView'

export const metadata: Metadata = {
  title: 'User Transaction',
  description: 'This is a user transaction page',
}

const UserTransaction = async () => {
  return <UserTransactionView />
}

export default UserTransaction
