import { Metadata } from 'next'

import LeftSideMenu from '@/components/common/LeftSideMenu'
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

  return (
    <LayoutView>
      <div className='inner-hero-section style--five'></div>

      <div className='mt-minus-150 pb-120'>
        <div className='container'>
          <div className='row'>
            {/* TODO: suer info */}
            <LeftSideMenu />
            {children}
          </div>
        </div>
      </div>
    </LayoutView>
  )
}

export default DashboardProtectedLayout
