import { Metadata } from 'next'

import LayoutView from '@/views/LayoutView'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'This is dashboard layout',
}

const DashboardNonProtectedLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <LayoutView>{children}</LayoutView>
}

export default DashboardNonProtectedLayout
