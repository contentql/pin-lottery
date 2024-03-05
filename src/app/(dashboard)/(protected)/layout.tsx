import { Metadata } from 'next'

import { getMeUser } from '@/utils/getMeUser'
import LayoutView from '@/views/LayoutView'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'This is dashboard layout',
}

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  await getMeUser({ nullUserRedirect: '/login' })

  return <LayoutView>{children}</LayoutView>
}

export default DashboardLayout
