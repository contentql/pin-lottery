'use client';

import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import Login from '@/components/modal/Login';
import SignUp from '@/components/modal/SignUp';
import ScrollToTop from '@/components/scrollToTop/ScrollToTop';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* SignUp Modal */}
      <SignUp />

      {/* Login Modal */}
      <Login />

      {/* Header section */}
      <Header />

      {children}

      {/* Footer section */}
      <Footer />

      {/* scroll-to-top start */}
      <ScrollToTop />
    </>
  );
};

export default Layout;
