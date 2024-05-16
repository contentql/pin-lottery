'use client'

import React from 'react'

import Footer from '@/components/footer/Footer'
import HeaderPage from '@/components/header/Header'
import ScrollToTop from '@/components/scrollToTop/ScrollToTop'
import { Header } from '@/payload-types'

const LayoutView = ({ children,header }: { children: React.ReactNode ,header:Header}) => {
  return (
    <>
      {/* SignUp Modal */}
      {/* <SignUp /> */}

      {/* Login Modal */}
      {/* <Login /> */}

      {/* Header section */}
      <HeaderPage header={header}/>

      {children}

      {/* Footer section */}
      <Footer />

      {/* scroll-to-top start */}
      <ScrollToTop />
    </>
  )
}

export default LayoutView
