'use sever'
import React from 'react'

import Footer from '@/components/footer/Footer'
import HeaderPage from '@/components/header/Header'
import ScrollToTop from '@/components/scrollToTop/ScrollToTop'
import { getPayloadClient } from '@/get-payload'
import { Header } from '@/payload-types'

const LayoutView = async({ children }: { children: React.ReactNode}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/globals/header`,
    { next: { revalidate: 60, tags: ['header'] } },
  );
  const headerData = (await res.json()) ;
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
