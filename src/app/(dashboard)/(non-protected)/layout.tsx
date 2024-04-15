import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'This is dashboard layout',
}

const DashboardNonProtectedLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <>{children}</>
}

export default DashboardNonProtectedLayout
