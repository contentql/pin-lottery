'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { BsChevronLeft } from 'react-icons/bs'

const AuthLayoutView = () => {
  const [open, setOpen] = useState('')
  const [windowHeight, setWindowHeight] = useState(0)
    const [show, setShow] = useState(false)
    
  const handleOpen = (e: any) => {
    if (open !== e.target.text) {
      setOpen(e.target.text)
    } else {
      setOpen('')
    }
  }

  const navBarTop = () => {
    if (window !== undefined) {
      let height = window.scrollY
      setWindowHeight(height)
    }
  }

  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0)
    }
    window.addEventListener('scroll', navBarTop)
    return () => {
      window.removeEventListener('scroll', navBarTop)
    }
  }, [])

  return (
    <header
      id='gotoTop'
      className={`header ${
        windowHeight > 50 && 'menu-fixed animated fadeInDown'
      }`}>
      <div className='header__bottom'>
        <div className='container'>
          <nav className='navbar navbar-expand-xl p-0 align-items-center navbar-center'>
            <div>
              <Link href='/' className='site-logo site-title'>
                <Image
                  src='/images/client/3.png'
                  priority={true}
                  alt='logo'
                  width={200}
                  height={20}
                />
                <span className='logo-icon'>
                  <i className='flaticon-fire'></i>
                </span>
              </Link>
            </div>
            <div>
              <Link href='/' className='back-button'>
                <span>
                 <BsChevronLeft className='icon' fontSize={20} />
                </span>
                <span>Back to home</span>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default AuthLayoutView
