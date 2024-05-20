'use sever'
import React from 'react'

import Footer from '@/components/footer/Footer'
import HeaderPage from '@/components/header/Header'
import ScrollToTop from '@/components/scrollToTop/ScrollToTop'
import { getPayloadClient } from '@/get-payload'
import { Header } from '@/payload-types'

const LayoutView = async({ children }: { children: React.ReactNode}) => {
  let headerData = null
  const payload = await getPayloadClient()
  try {
    const header = await payload.findGlobal({
      slug: 'header',
      depth: 6,
    })
    headerData = header
  } catch (error: any) {
    console.error('Error fetching about:', error)
  }
  return (
    <>
      {/* SignUp Modal */}
      {/* <SignUp /> */}

      {/* Login Modal */}
      {/* <Login /> */}

      {/* Header section */}
      <HeaderPage header={headerData as Header}/>

      {children}

      {/* Footer section */}
      <Footer />

      {/* scroll-to-top start */}
      <ScrollToTop />
    </>
  )
}
export async function generateStaticParams(): Promise<any> {
  const payload = await getPayloadClient()
  try {
    const headerData = await payload.findGlobal({
      slug: 'header',
      depth: 6,
    })
    return headerData as any
  } catch (error: any) {
    console.error('Error fetching about:', error)
  }
}
export default LayoutView
