import { Metadata } from 'next'

import { getMeUser } from '@/utils/get-me-user'
import LayoutView from '@/views/LayoutView'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'This is dashboard layout',
}

const DashboardProtectedLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  await getMeUser({ nullUserRedirect: '/login' })

  return <LayoutView>{children}</LayoutView>
}

export default DashboardProtectedLayout
