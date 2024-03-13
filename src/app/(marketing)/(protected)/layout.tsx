import { Metadata } from 'next'

import { getMeUser } from '@/utils/get-me-user'
import LayoutView from '@/views/LayoutView'

export const metadata: Metadata = {
  title: 'Marketing',
  description: 'This is marketing layout',
}

const MarketingLayout = async ({ children }: { children: React.ReactNode }) => {
  await getMeUser({ nullUserRedirect: '/login' })

  return <LayoutView>{children}</LayoutView>
}

export default MarketingLayout
