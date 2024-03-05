'use client'

import React from 'react'

import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import ScrollToTop from '@/components/scrollToTop/ScrollToTop'

const LayoutView = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* SignUp Modal */}
      {/* <SignUp /> */}

      {/* Login Modal */}
      {/* <Login /> */}

      {/* Header section */}
      <Header />

      {children}

      {/* Footer section */}
      <Footer />

      {/* scroll-to-top start */}
      <ScrollToTop />
    </>
  )
}

export default LayoutView
