import { Metadata } from 'next'

import { getPayloadClient } from '@/get-payload'
import { Header } from '@/payload-types'
import LayoutView from '@/views/LayoutView'

export const metadata: Metadata = {
  title: 'Marketing',
  description: 'This is marketing layout',
}

const MarketingNonProtectedLayout = async({
  children,
}: {
  children: React.ReactNode
}) => {
  let headerData = null
  const payload = await getPayloadClient()
  try {
    const header = await payload.findGlobal({
      slug: 'header',
      depth: 3,
    })
    headerData = header
  } catch (error: any) {
    console.error('Error fetching about:', error)
  }
  return <LayoutView header={headerData as Header}>{children}</LayoutView>
}

export default MarketingNonProtectedLayout

export async function generateStaticParams(): Promise<any> {
  const payload = await getPayloadClient()
  try {
    const header = await payload.findGlobal({
      slug: 'header',
      depth: 3,
    })
    return header as Header
  } catch (error: any) {
    console.error('Error fetching about:', error)
  }
}