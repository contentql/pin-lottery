import { Metadata } from 'next'

import LayoutView from '@/views/LayoutView'

export const metadata: Metadata = {
  title: 'Marketing',
  description: 'This is marketing layout',
}

const MarketingNonProtectedLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <LayoutView>{children}</LayoutView>
}

export default MarketingNonProtectedLayout
