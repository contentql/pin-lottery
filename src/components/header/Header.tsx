import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import tag from '/public/images/icon/btn/tag.png'

import cartData from '@/data/cartData'
import { useAuth } from '@/providers/Auth'

const Header = () => {
  const [open, setOpen] = useState('')
  const [windowHeight, setWindowHeight] = useState(0)
  const [show, setShow] = useState(false)

  const { status } = useAuth()
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
      }`}
    >
      <div className='header__bottom'>
        <div className='container'>
          <nav className='navbar navbar-expand-xl p-0 align-items-center'>
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
            <button
              className='navbar-toggler ms-auto'
              type='button'
              onClick={() => setShow(!show)}
              //data-bs-toggle="collapse"
              // data-bs-target="#navbarContent"
              // aria-controls="navbarContent"
              //aria-expanded="false"
              //aria-label="Toggle navigation"
            >
              <span className='menu-toggle'></span>
            </button>
            <div
              className={`collapse navbar-collapse ${show && 'show'}`}
              // id="navbarContent"
            >
              <ul className='navbar-nav main-menu ms-auto'>
                <li>
                  <Link href='/contest' onClick={() => setShow(false)}>
                    Contest
                  </Link>
                </li>
                <li>
                  <Link href='/winner' onClick={() => setShow(false)}>
                    Winners
                  </Link>
                </li>
                <li>
                  <Link href='/contact' onClick={() => setShow(false)}>
                    contact
                  </Link>
                </li>
                <li>
                  <Link href='/how-work' onClick={() => setShow(false)}>
                    how to use
                  </Link>
                </li>
              </ul>
              <div className='nav-right'>
                <Link href='/contest' className='cmn-btn style--three btn--sm'>
                  <Image src={tag} alt='icon' className='me-1' /> Buy Tickets
                </Link>

                <div className='right'>
                  {status === 'loggedIn' && (
                    <div className='product__cart'>
                      <Link href='/cart' className='amount__btn'>
                        <i className='las la-shopping-basket'></i>
                        <span className='cart__num'>{cartData.length}</span>
                      </Link>
                    </div>
                  )}
                  {status === 'loggedIn' ? (
                    <Link
                      href='/user'
                      className='user__btn d-flex align-items-center justify-content-center'
                    >
                      <i className='las la-user'></i>
                    </Link>
                  ) : (
                    <Link href='/login' className='login-btn btn--sm'>
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
