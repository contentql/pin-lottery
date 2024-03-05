import { Metadata } from 'next'

import UserLotteryView from '@/views/UserLotteryView'

export const metadata: Metadata = {
  title: 'User Lottery',
  description: 'This is a user lottery page',
}

const UserLottery = async () => {
  return <UserLotteryView />
}

export default UserLottery
